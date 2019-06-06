<template>
  <div
    class="inputDiv"
    ref="inputDiv"
    contentEditable="true"
    suppressContentEditableWarning="true"
    @click="handlePropagation"
    @keydown="handleKeydown"
    @blur="handleBlur"
    v-text="children"
  />
</template>

<script>
import { mapActions } from "vuex";
import { handlePropagation } from "../../methods/assistFunction";

export default {
  props: {
    nodeId: {
      type: String,
      default: ""
    },

    children: {
      type: String,
      default: ""
    }
  },

  created() {
    this.$nextTick(() => {
      this.$refs.inputDiv.focus();
      const selection = document.getSelection();
      selection.selectAllChildren(this.$refs.inputDiv);
    });
  },

  methods: {
    ...mapActions({
      changeText: "changeText",
      selectNode: "selectNode"
    }),

    handleKeydown(event) {
      if (event.key.toUpperCase() === "ESCAPE") {
        this.$refs.inputDiv.textContent = this.children;
      }
      if (event.key.toUpperCase() === "ENTER") {
        this.changeText({
          nodeId: this.nodeId,
          text: this.$refs.inputDiv.textContent
        });
        this.$refs.inputDiv.blur();
      }
    },

    handleBlur(e) {
      // this.selectNode({ nodeId: this.nodeId });
    },
    handlePropagation: handlePropagation
  }
};
</script>

<style lang="scss" scoped>
.inputDiv {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: fit-content;
  min-width: 1em;
  max-width: 10em;
  height: fit-content;
  margin: auto;
  padding: 10px;
  color: #333333;
  background-color: #ffffff;
  box-shadow: 0 0 20px #aaaaaa;
  border-radius: 5px;
  outline: none;
  z-index: 3;
  user-select: text;
}
</style>
