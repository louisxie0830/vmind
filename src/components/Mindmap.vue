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
      getMindmap: "getMindmap"
    }),

    ...mapGetters("node", {
      getNodeStatus: "getNodeStatus"
    }),

    ...mapGetters("history", {
      getHistory: "getHistory"
    }),

    rootNode() {
      return this.getMindmap;
    }
  },

  created() {
    this.$nextTick(() => {
      this.containerRef = this.$parent.$refs;
    });
    this.useMindmap();
  },

  methods: {
    ...mapActions("mindMap", {
      useMindmap: "useMindmap"
    })
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
