<template>
  <p :class="highlightClass" v-text="content" />
</template>

<script>
import { css } from "emotion";
import * as refer from "../../../../statics/refer";
export default {
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  computed: {
    highlightClass() {
      return css`
        margin-top: 0;
        color: var(${refer.THEME_ASSIST});
        font-weight: 700;
      `;
    }
  }
};
</script>
