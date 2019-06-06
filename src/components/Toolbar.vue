<template>
  <div class="toolbar" @click="handlePropagation">
    <ToolButton
      :icon="'git-commit'"
      :onClick="handleAddChild"
      :children="'添加子節點'"
    />
    <ToolButton
      :icon="'git-fork'"
      :onClick="handleAddSibling"
      :disabled="layer < 1"
      :children="'添加兄弟節點'"
    />
    <ToolButton
      :icon="'delete'"
      :onClick="handleDeleteNode"
      :disabled="layer < 1"
      :children="'刪除'"
    />
    <ToolButton
      :icon="'edit-pencil'"
      :onClick="handleEditNode"
      :children="'編輯'"
    />
    <ToolButton
      :icon="'split-v'"
      :onClick="handleToggleChildren"
      :disabled="layer < 1 || node.children.length === 0"
      :children="'顯隱子節點'"
    />
  </div>
</template>

<script>
import ToolButton from "./ToolButton";
import { mapActions } from "vuex";
import { handlePropagation } from "../../methods/assistFunction";

export default {
  components: {
    ToolButton
  },

  props: ["layer", "node", "parent"],

  methods: {
    ...mapActions({
      addChild: "addChild",
      addSibling: "addSibling",
      deleteNode: "deleteNode",
      editNode: "editNode",
      toggleChildren: "toggleChildren"
    }),

    handleAddChild() {
      this.addChild({ nodeId: this.node.id });
    },

    handleAddSibling() {
      this.addSibling({ nodeId: this.node.id, parentId: this.parent.id });
    },

    handleDeleteNode() {
      this.deleteNode({ nodeId: this.node.id, parentId: this.parent.id });
    },

    handleEditNode() {
      this.editNode({ nodeId: this.node.id });
    },

    handleToggleChildren() {
      this.toggleChildren({
        nodeId: this.node.id,
        bool: this.node.showChildren
      });
    },

    handlePropagation: handlePropagation
  }
};
</script>

<style lang="scss">
.toolbar {
  display: flex;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 0;
  background-color: #ffffff;
  width: max-content;
  height: 50px;
  padding: 0 8px;
  font-size: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #aaaaaa;
}
</style>
