<template>
  <div
    ref="node"
    :class="nodeClass"
    :draggable="draggable"
    :data-tag="dataTag"
    :data-parent="parent.id"
    :data-show-children="node.showChildren"
    :id="node.id"
    @click="handlePropagation"
  >
    <InputDiv
      v-if="nodeStatus.curEdit === node.id"
      :nodeId="node.id"
      :children="node.text"
    />
    <div ref="dropArea" class="dropArea" :data-tag="refer.DROP_AREA" />
    <p v-text="node.text" />
    <button
      :class="toggleButtonClass"
      v-if="layer > 0 && node.children.length > 0"
      v-text="node.showChildren ? '-' : '+'"
      @click="handleToggleChildren"
    />
    <Toolbar
      v-show="nodeStatus.curSelect === node.id && nodeStatus.selectByClick"
      :layer="layer"
      :node="node"
      :parent="parent"
    />
  </div>
</template>

<script>
import { css, cx } from "emotion";
import * as refer from "../../statics/refer.js";
import { mapGetters } from "vuex";
import InputDiv from "./InputDiv";
import Toolbar from "./Toolbar";
import { mapActions } from "vuex";
import throttle from "lodash/throttle";
import { handlePropagation } from "../../methods/assistFunction.js";

export default {
  components: {
    InputDiv,
    Toolbar
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

  data() {
    return {
      refer: refer,
      id: null
    };
  },

  computed: {
    ...mapGetters("node", {
      nodeStatus: "getNodeStatus"
    }),

    nodeClass() {
      const styleSelectedBorder = `box-shadow: 0 0 0 3px #ffffff, 0 0 0 6px var(${
        this.refer.THEME_EX
      });`;
      const seletedStyle = css`
        z-index: 1;
        ${styleSelectedBorder}
      `;
      const specificStyle = [
        // div&用于提高 CSS 权重
        css`
          div& {
            padding: 15px 20px;
            color: #ffffff;
            font-size: 120%;
            font-weight: 700;
            background-color: var(${refer.THEME_DARK});
            border: 2px solid var(${refer.THEME_EX});
          }
        `,
        css`
          div& {
            background-color: var(${refer.THEME_LIGHT});
          }
        `,
        css`
          div& {
            padding: 10px 15px;
          }
        `,
        css`
          div& {
            padding: 0 15px;
            border: none;
            p {
              font-size: 90%;
            }
          }
        `
      ];
      const commonStyle = css`
        position: relative;
        min-width: 10px;
        max-width: 200px;
        margin: 20px 40px;
        padding: 15px;
        background-color: #ffffff;
        border: 1px solid var(${refer.THEME_MAIN});
        border-radius: 15px;
        cursor: pointer;

        p {
          min-height: 18px; /* 当 p 中没有内容时撑起元素 */
          margin: 0;
          line-height: 1.5em;
          overflow-wrap: break-word;
        }

        &:hover {
          ${styleSelectedBorder}
        }

        &.ondrag {
          background-color: var(${refer.THEME_EX});
          p {
            color: #ffffff;
          }
        }
      `;
      return cx(commonStyle, specificStyle[this.layer < 3 ? this.layer : 3], {
        [seletedStyle]: this.nodeStatus.curSelect === this.node.id
      });
    },

    toggleButtonClass() {
      const toggleButton = css`
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
        margin: auto 0;
        padding: 0;
        text-align: center;
        background-color: #ffffff;
        border: 1px solid #cccccc;
        border-radius: 50%;
        outline: none;
      `;
      const buttonLeft = css`
        left: -15px;
      `;

      const buttonRight = css`
        right: -15px;
      `;
      return cx(toggleButton, this.onLeft ? buttonLeft : buttonRight);
    },

    draggable() {
      return this.layer > 0 && this.nodeStatus.curEdit !== this.node.id;
    },

    dataTag() {
      return this.onLeft ? refer.LEFT_NODE : refer.RIGHT_NODE;
    }
  },

  created() {
    this.$nextTick(() => {
      this.$refs.dropArea.addEventListener(
        "click",
        this.handleSelectNode,
        false
      );
      this.$refs.dropArea.addEventListener(
        "dblclick",
        this.handleEditNode,
        false
      );
      this.nodeRefs.add(this.$refs.node);
    });
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "node/setSelect") {
        if (mutation.payload.curSelect === this.node.id) {
          this.$refs.node &&
            this.$refs.node.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center"
            });
          this.getNodeInfo({
            node: this.node,
            parent: this.parent,
            onLeft: this.onLeft
          });
        }
      }
    });
  },

  beforeDestroy() {
    this.$refs.dropArea.removeEventListener("click", this.handleSelectNode);
    this.$refs.dropArea.removeEventListener("dblclick", this.handleEditNode);
    this.nodeRefs.delete(this.$refs.node);
  },

  methods: {
    ...mapActions({
      selectNode: "selectNode",
      clearNodeStatus: "clearNodeStatus",
      toggleChildren: "toggleChildren",
      editNode: "editNode"
    }),
    ...mapActions("node", {
      getNodeInfo: "getNodeInfo"
    }),

    handleSelectNode(e) {
      this.selectNode({ nodeId: this.node.id, selectByClick: true });
    },

    handleEditNode(e) {
      this.editNode({ nodeId: this.node.id });
    },

    handleToggleChildren() {
      this.toggleChildren({
        nodeId: this.node.id,
        bool: !this.node.showChildren
      });
      this.clearNodeStatus({
        curSelect: "",
        selectByClick: false,
        curEdit: "",
        curNodeInfo: {}
      });
    },

    handlePropagation: handlePropagation
  }
};
</script>

<style lang="scss">
.dropArea {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
