<template>
  <div class="mindMap" ref="mindMap" :id="id">
    <RootNode
      :key="rootNode.id"
      :nodeRefs="nodeRefs"
      :layer="0"
      :node="rootNode"
    />
    <DragCanvas
      v-if="parentRef && containerRef"
      :parentRef.sync="parentRef"
      :containerRef.sync="containerRef"
      :mindmap="getMindMap"
    />
    <LineCanvas
      v-if="parentRef && containerRef"
      :parentRef.sync="parentRef"
      :mindmap="getMindMap"
      :nodeRefs="nodeRefs"
    />
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
      parentRef: null,
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
      this.parentRef = this.$refs.mindMap;
      this.containerRef = this.$parent.$refs;
    });
  },

  updated() {
    window.addEventListener(
      "keydown",
      this.handleKeydown(this.getNodeStatus),
      false
    );
    window.addEventListener("click", this.handelClearClick, false);
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
      clearAll: "clearAll",
      clearNodeStatus: "clearNodeStatus",
      selectNode: "selectNode",
      editNode: "editNode"
    }),

    handleKeydown(nodeStatus) {
      const handleKeyEventWithNode = event => {
        const key = event.key.toUpperCase();
        switch (key) {
          case "TAB":
            this.addChild({ nodeId: nodeStatus.curSelect });
            break;

          case "ENTER":
            event.preventDefault();
            this.addSibling({
              nodeId: nodeStatus.curSelect,
              parentId: nodeStatus.curNodeInfo.parent.id
            });
            break;

          case "F2":
            this.editNode({ nodeId: nodeStatus.curSelect });
            break;

          case "BACKSPACE":
          case "DELETE":
            event.preventDefault();
            this.deleteNode({
              nodeId: nodeStatus.curSelect,
              parentId: nodeStatus.curNodeInfo.parent.id
            });
            break;

          case " ":
            this.toggleChildren({
              nodeId: nodeStatus.curSelect,
              bool: !nodeStatus.curNodeInfo.showChildren
            });
            break;

          case "ARROWLEFT":
            if (nodeStatus.curNodeInfo.parent === refer.ROOT_PARENT) {
              if (nodeStatus.curNodeInfo.children.length > 3) {
                this.selectNode({
                  nodeId:
                    nodeStatus.curNodeInfo.children[
                      Math.trunc(nodeStatus.curNodeInfo.children.length / 2)
                    ].id
                });
              }
            } else {
              if (!nodeStatus.curNodeInfo.onLeft) {
                this.selectNode({
                  nodeId: nodeStatus.curNodeInfo.parent.id
                });
              } else if (nodeStatus.curNodeInfo.children.length > 0) {
                this.selectNode({
                  nodeId: nodeStatus.curNodeInfo.children[0].id
                });
              }
            }
            break;

          case "ARROWRIGHT":
            if (nodeStatus.curNodeInfo.onLeft) {
              this.selectNode({
                nodeId: nodeStatus.curNodeInfo.parent.id
              });
            } else if (nodeStatus.curNodeInfo.children.length > 0) {
              this.selectNode({
                nodeId: nodeStatus.curNodeInfo.children[0].id
              });
            }
            break;

          case "ARROWUP": {
            const curIndex = nodeStatus.curNodeInfo.parent.children.findIndex(
              ({ id }) => id === nodeStatus.curNodeInfo.id
            );
            if (curIndex > 0) {
              this.selectNode({
                nodeId: nodeStatus.curNodeInfo.parent.children[curIndex - 1].id
              });
            }
            break;
          }
          case "ARROWDOWN":
            {
              const curIndex = nodeStatus.curNodeInfo.parent.children.findIndex(
                ({ id }) => id === nodeStatus.curNodeInfo.id
              );
              const lastIndex =
                nodeStatus.curNodeinfo.parent.children.length - 1;
              if (curIndex < lastIndex) {
                this.selectNode({
                  nodeId:
                    nodeStatus.curNodeInfo.parent.children[curIndex + 1].id
                });
              }
            }
            break;

          default:
            break;
        }
      };
      return event => {
        this.$nextTick(() => {
          if (nodeStatus.curEdit === "") {
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
          if (nodeStatus.curSelect !== "") {
            try {
              handleKeyEventWithNode(event);
            } catch (error) {
              throw error;
            }
          }
        });
      };
    },

    handelClearClick(e) {
      this.clearNodeStatus({
        curSelect: "",
        selectByClick: false,
        curEdit: "",
        curNodeInfo: {}
      });
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
