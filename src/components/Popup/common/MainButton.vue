<template>
  <button :class="mainButtonClass" v-text="content" />
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
    mainButtonClass() {
      return css`
        button& {
          color: #ffffff;
          background-color: var(${refer.THEME_DARK});
          border: 1px solid var(${refer.THEME_MAIN});
        }
      `;
    }
  }
};
</script>
