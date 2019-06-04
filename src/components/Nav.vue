<template>
  <nav class="nav">
    <section class="section">
      <ToolButton
        :icon="'add-item-alt'"
        :children="'新建'"
        :onClick="handleNewFile"
      />
      <ToolButton
        :icon="'folder-open'"
        :children="'打開'"
        :onClick="handleOpenFile"
      />
      <ToolButton
        :icon="'file-download'"
        :children="'下載'"
        :onClick="handleDownload"
      />
      <ToolButton
        :icon="'duplicate'"
        :children="'匯出'"
        :onClick="handleExport"
      />
      <ToolButton :icon="'palette'" :children="'主題'" :onClick="handleTheme" />
    </section>
    <section class="section">
      <ToolButton
        :icon="'undo'"
        :children="'上一步'"
        :disabled="disableStepUp"
        :onClick="handleUndo"
      />
      <ToolButton
        :icon="'redo'"
        :children="'下一步'"
        :disabled="disableNext"
        :onClick="handleRedo"
      />
      <ToolButton
        :icon="'scale'"
        :children="'全部展開'"
        :onClick="handleExpand"
      />
    </section>
    <Popup
      :component-type="popup"
      :handleClosePopup="handleClosePopup"
      :handleDownload="handleDownload"
    />
  </nav>
</template>

<script>
import ToolButton from "./ToolButton";
import Popup from "./Popup/Popup.vue";
import * as popupType from "./Popup/common/popupType";

export default {
  components: { ToolButton, Popup },
  data() {
    return {
      popup: popupType.NONE
    };
  },
  computed: {
    disableStepUp() {
      return false;
    },
    disableNext() {
      return false;
    },
    showPopUp() {
      return this.popup !== popupType.NONE;
    }
  },
  methods: {
    handleClosePopup() {
      this.popup = popupType.NONE;
    },
    handleNewFile() {
      this.popup = popupType.NEW;
    },
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
