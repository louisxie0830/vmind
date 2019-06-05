<template>
  <div class="rootNode">
    <div>
      <SubNode
        v-show="node.showChildren"
        v-for="item in leftSubNode"
        :key="item.id"
        :layer="layer + 1"
        :node="item"
        :nodeRefs="nodeRefs"
        :parent="node"
        :onLeft="true"
      />
    </div>
    <div ref="nodeEle">
      <Node :layer="0" :node="node" :nodeRefs="nodeRefs" :parent="rootParent" />
    </div>
    <div>
      <SubNode
        v-show="node.showChildren"
        v-for="item in rightSubNode"
        :key="item.id"
        :layer="layer + 1"
        :node="item"
        :nodeRefs="nodeRefs"
        :parent="node"
        :onLeft="false"
      />
    </div>
  </div>
</template>
<script>
import { ROOT_PARENT } from "../../statics/refer";
import Node from "./Node";

export default {
  components: {
    Node
  },

  props: {
    nodeRefs: {
      default: () => {}
    },

    node: {
      type: Object,
      default: () => {}
    },

    layer: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      rootParent: ROOT_PARENT,
      half: null,
      total: null
    };
  },

  computed: {
    leftSubNode() {
      return this.node.children && this.node.children.slice(this.half);
    },

    rightSubNode() {
      return this.node.children && this.node.children.slice(0, this.half);
    }
  },

  created() {
    this.total = this.node.children.length;
    this.half = this.total > 3 ? Math.trunc(this.total / 2) : this.total;
    this.$nextTick(() => {
      this.$refs.nodeEle.scrollIntoView({ block: "center", inline: "center" });
    });
  }
};
</script>

<style lang="scss">
.rootNode {
  display: flex;
  align-items: center;
  width: max-content;
}
</style>
