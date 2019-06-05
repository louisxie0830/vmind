<template>
  <div class="toolbar">
    <ToolButton :icon="'git-commit'" :children="'添加子節點'" />
    <ToolButton :icon="'git-commit'" :children="'添加子節點'" />
    <ToolButton :icon="'git-commit'" :children="'添加子節點'" />
    <ToolButton :icon="'git-commit'" :children="'添加子節點'" />
    <ToolButton :icon="'git-commit'" :children="'添加子節點'" />
  </div>
</template>

<script>
import ToolButton from "./ToolButton";

export default {
  components: {
    ToolButton
  },

  props: ["layer", "node", "parent"]
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
