<template>
  <button :class="buttonClass" disabled="disabled">
    <i :class="iconClass" />
    <span> {{ children }}</span>
  </button>
</template>

<script>
import { css, cx } from "emotion";
import * as refer from "../../statics/refer";

export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    children: {
      type: String,
      default: ""
    },
    onClick: {
      type: Function,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass() {
      const wrapper = css`
        margin: 0 0.12em;
        padding: 0 0.24em;
        /* margin 用于增加间隔，padding 用于增大可点击区域 */
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        i {
          display: block;
          margin-bottom: 0.12em;
          font-size: 100%;
        }
        span {
          display: block;
          font-size: 25%;
        }

        &:active {
          transform: scale(0.95);
        }

        &:hover {
          color: var(${refer.THEME_ASSIST});
        }
      `;
      const disabled_style = css`
        &,
        &:hover {
          color: #cccccc;
        }

        cursor: not-allowed;
      `;
      return cx(wrapper, { [disabled_style]: this.disabled });
    },
    iconClass() {
      return `zwicon-${this.icon}`;
    }
  }
};
</script>
