<template>
  <div class="mindMap" ref="mindMap" :id="id">
    <RootNode
      :key="rootNode.id"
      :nodeRefs="nodeRefs"
      :layer="0"
      :node="rootNode"
    />
    <!-- <DragCanvas
      parent_ref="{self}"
      container_ref="{container_ref}"
      mindmap="{root_node}"
    />
    <LineCanvas
      parent_ref="{self}"
      mindmap="{root_node}"
      node_refs="{node_refs}"
    /> -->
  </div>
</template>

<script>
import RootNode from "./RootNode";
import DragCanvas from "./DragCanvas";
import LineCanvas from "./LineCanvas";

import * as refer from "../../statics/refer";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    RootNode,
    DragCanvas,
    LineCanvas
  },
  data() {
    return {
      containerRef: null,
      id: refer.MINDMAP_ID,
      nodeRefs: new Set()
    };
  },
  computed: {
    ...mapGetters("mindMap", {
      getMindMap: "getMindMap"
    }),

    ...mapGetters("node", {
      getNodeStatus: "getNodeStatus"
    }),

    ...mapGetters("history", {
      getHistory: "getHistory"
    }),

    rootNode() {
      return this.getMindMap;
    }
  },

  created() {
    this.$nextTick(() => {
      this.containerRef = this.$parent.$refs;
      window.addEventListener("keydown", this.handleKeydown);
      window.addEventListener("click", this.clearNodeStatus);
    });
  },

  methods: {
    ...mapActions({
      toggleChildren: "toggleChildren",
      addChild: "addChild",
      addSibling: "addSibling",
      moveNode: "moveNode",
      changeText: "changeText",
      deleteNode: "deleteNode",
      setMindMap: "setMindMap",
      expandAll: "expandAll",
      setEdit: "setEdit",
      setSelect: "setSelect",
      clearAll: "clearAll",
      clearNodeStatus: "clearNodeStatus",
      selectNode: "selectNode",
      editNode: "editNode"
    }),

    handleKeydown() {
      const handleKeyEventWithNode = event => {
        const key = event.key.toUpperCase();
        switch (key) {
          case "TAB":
            this.addChild({ nodeId: this.getNodeStatus.curSelect });
            break;

          case "ENTER":
            this.addSibling({
              nodeId: this.getNodeStatus.curSelect,
              parentId: this.getNodeStatus.curNodeInfo.parent.id
            });
            break;

          case "F2":
            this.editNode({ nodeId: this.getNodeStatus.curSelect });
            break;

          case "BACKSPACE":
          case "DELETE":
            this.deleteNode({
              nodeId: this.getNodeStatus.curSelect,
              parentId: this.getNodeStatus.curNodeInfo.parent.id
            });
            break;

          case " ":
            this.toggleChildren({
              nodeId: this.getNodeStatus.curSelect,
              bool: !this.getNodeStatus.curNodeInfo.showChildren
            });
            break;

          case "ARROWLEFT":
            if (this.getNodeStatus.curNodeInfo.parent === refer.ROOT_PARENT) {
              if (this.getNodeStatus.curNodeInfo.children.length > 3) {
                this.selectNode({
                  nodeId: this.getNodeStatus.curNodeInfo.children[
                    Math.trunc(
                      this.getNodeStatus.curNodeInfo.children.length / 2
                    )
                  ].id
                });
              }
            } else {
              if (!this.getNodeStatus.curNodeInfo.onLeft) {
                this.selectNode({
                  nodeId: this.getNodeStatus.curNodeInfo.parent.id
                });
              } else if (this.getNodeStatus.curNodeInfo.children.length > 0) {
                this.selectNode({
                  nodeId: this.getNodeStatus.curNodeInfo.children[0].id
                });
              }
            }
            break;

          case "ARROWRIGHT":
            if (this.getNodeStatus.curNodeInfo.onLeft) {
              this.selectNode({
                nodeId: this.getNodeStatus.curNodeInfo.parent.id
              });
            } else if (this.getNodeStatus.curNodeInfo.children.length > 0) {
              this.selectNode({
                nodeId: this.getNodeStatus.curNodeInfo.children[0].id
              });
            }
            break;

          case "ARROWUP": {
            const curIndex = this.getNodeStatus.curNodeInfo.parent.children.findIndex(
              ({ id }) => id === this.getNodeStatus.curNodeInfo.id
            );
            if (curIndex > 0) {
              this.selectNode({
                nodeId: this.getNodeStatus.curNodeInfo.parent.children[
                  curIndex - 1
                ].id
              });
            }
            break;
          }
          case "ARROWDOWN":
            const curIndex = this.getNodeStatus.curNodeInfo.parent.children.findIndex(
              ({ id }) => id === this.getNodeStatus.curNodeInfo.id
            );
            const lastIndex =
              this.getNodeStatus.curNodeinfo.parent.children.length - 1;
            if (curIndex < lastIndex) {
              this.selectNode({
                nodeId: this.getNodeStatus.curNodeInfo.parent.children[
                  curIndex + 1
                ].id
              });
            }
            break;

          default:
            break;
        }
      };
      return event => {
        if (!this.getNodeStatus.curEdit) {
          const isMac = navigator.platform.toUpperCase().startsWith("MAC");
          const combineKeyPressed = isMac ? event.metaKey : event.ctrlKey;
          if (combineKeyPressed && event.key.toUpperCase() === "Z") {
            if (event.shiftKey) {
              // historyHook.redoHistory();
            } else {
              // historyHook.undoHistory();
            }
          }
        }
        if (this.getNodeStatus.curSelect) {
          try {
            handleKeyEventWithNode(event);
          } catch (error) {
            throw error;
          }
        }
      };
    }
  }
};
</script>

<style lang="scss">
.mindMap {
  position: relative;
  width: fit-content;
  padding: 30vh 30vw;
}
</style>
