<template>
  <div
    class="inputDiv"
    ref="inputDiv"
    contentEditable="true"
    suppressContentEditableWarning="true"
    @keydown="handleKeydown"
    @blur="handleBlur"
    v-text="children"
  />
</template>

<script>
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

  methods: {
    handleKeydown() {},

    handleBlur() {}
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
