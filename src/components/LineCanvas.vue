<template>
  <canvas class="lineCanvas" />
</template>

<script>
import * as refer from "../../statics/refer";
export default {
  props: ["parentRef", "mindmap", "nodeRefs"],

  data() {
    return {
      flag: null,
      theme: {
        assist: "#1980da",
        dark: "#e79021",
        ex: "#ce7529",
        light: "#f4cc87",
        main: "#eda938"
      }
    };
  },

  watch: {
    flag(val) {
      this.updateLine();
    }
  },

  created() {
    window.addEventListener("resize", this.handleWindowResize, true);
    this.$nextTick(() => {
      this.updateLine();
    });
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "mindMap/updateMinMapData") {
        this.updateLine();
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  },

  methods: {
    handleWindowResize() {
      this.flag = Date.now();
    },

    drawLineCanvas(ctx, theme, mindmap, map) {
      const drawBezier = (ctx, from_x, from_y, to_x, to_y) => {
        ctx.moveTo(from_x, from_y);
        ctx.bezierCurveTo(
          from_x,
          to_y,
          0.9 * to_x + 0.1 * from_x,
          to_y,
          to_x,
          to_y
        );
      };
      const drawLine = (ctx, node, map) => {
        const { id: parent_id, children } = node;
        if (children.length > 0) {
          const [parent_x_left, parent_x_right, parent_y] = map.get(parent_id);
          children.forEach(child => {
            const child_data = map.get(child.id);
            if (child_data) {
              const [
                child_x_left,
                child_x_right,
                child_y,
                child_tag
              ] = child_data;
              if (child_tag === refer.LEFT_NODE) {
                drawBezier(
                  ctx,
                  parent_x_left,
                  parent_y,
                  child_x_right,
                  child_y
                );
              } else {
                drawBezier(
                  ctx,
                  parent_x_right,
                  parent_y,
                  child_x_left,
                  child_y
                );
              }
              drawLine(ctx, child, map);
            }
          });
        }
      };
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = theme.main;
      drawLine(ctx, mindmap, map);
      ctx.stroke();
      ctx.closePath();
    },

    updateLine() {
      const dom = this.$el;
      setTimeout(() => {
        dom.width = this.parentRef.offsetWidth;
        dom.height = this.parentRef.offsetHeight;
        const map = new Map(
          Array.from(this.nodeRefs).map(ref => [
            ref.id,
            [
              ref.offsetLeft,
              ref.offsetLeft + ref.offsetWidth,
              ref.offsetTop + 0.5 * ref.offsetHeight,
              ref.dataset.tag
            ]
          ])
        );
        const ctx = dom.getContext("2d");
        this.drawLineCanvas(ctx, this.theme, this.mindmap, map);
      }, 10);
    }
  }
};
</script>

<style lang="scss">
.lineCanvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
