<template>
  <div :class="subNodeClass">
    <Node
      :layer="layer"
      :node="node"
      :nodeRefs="nodeRefs"
      :parent="parent"
      :onLeft="onLeft"
    />
    <div>
      <SubNode
        v-show="node && node.showChildren"
        v-for="item in node.children"
        :key="item.id"
        :layer="layer + 1"
        :node="item"
        :nodeRefs="nodeRefs"
        :parent="node"
        :onLeft="onLeft"
      />
    </div>
  </div>
</template>

<script>
import { css, cx } from "emotion";
import Node from "./Node";

export default {
  components: {
    Node
  },

  props: {
    layer: {
      type: Number,
      default: 0
    },

    node: {
      type: Object,
      default: () => {}
    },

    nodeRefs: {
      default: () => {}
    },

    parent: {
      type: Object,
      default: () => {}
    },

    onLeft: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    subNodeClass() {
      const wrapper = css`
        display: flex;
        align-items: center;
      `;
      const leftStyle = css`
        flex-direction: row-reverse;
      `;
      return cx(wrapper, { [leftStyle]: this.onLeft });
    }
  }
};
</script>
