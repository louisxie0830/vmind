<template>
  <nav class="nav">
    <section class="section">
      <ToolButton
        :icon="'add-item-alt'"
        :children="'新建'"
        @click.prevent="handleNewFile"
      />
      <ToolButton
        :icon="'folder-open'"
        :children="'打開'"
        @click.prevent="handleOpenFile"
      />
      <ToolButton
        :icon="'file-download'"
        :children="'下載'"
        @click.prevent="handleDownload"
      />
      <ToolButton
        :icon="'duplicate'"
        :children="'匯出'"
        @click.prevent="handleExport"
      />
      <ToolButton
        :icon="'palette'"
        :children="'主題'"
        @click.prevent="handleTheme"
      />
    </section>
    <section class="section">
      <ToolButton
        :icon="'undo'"
        :children="'上一步'"
        :disabled="disableStepUp"
        @click.prevent="handleUndo"
      />
      <ToolButton
        :icon="'redo'"
        :children="'下一步'"
        :disabled="disableNext"
        @click.prevent="handleRedo"
      />
      <ToolButton
        :icon="'scale'"
        :children="'全部展開'"
        @click.prevent="handleExpand"
      />
    </section>
  </nav>
</template>

<script>
import ToolButton from "./ToolButton";
export default {
  components: { ToolButton },
  data() {
    return {
      popup: false
    };
  },
  computed: {
    disableStepUp() {
      return false;
    },
    disableNext() {
      return false;
    }
  },
  methods: {
    handleNewFile() {},
    handleOpenFile() {},
    handleDownload() {},
    handleExport() {},
    handleTheme() {},
    handleUndo() {},
    handleRedo() {},
    handleExpand() {}
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding: 0 50px;
  font-size: 25px;
  background-color: #ffffff;
  box-shadow: 0 0px 2px #aaaaaa;
  z-index: 10;
}
.section {
  display: flex;
}
</style>
