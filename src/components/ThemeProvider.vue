<template>
  <div :class="className">
    <slot />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { css } from "emotion";

import * as refer from "../../statics/refer";
export default {
  computed: {
    ...mapGetters(["getTitle", "getThemeIndex", "getThemeList"]),
    className() {
      return css`
        ${refer.THEME_MAIN}: ${this.theme.main};
        ${refer.THEME_LIGHT}: ${this.theme.light};
        ${refer.THEME_ASSIST}: ${this.theme.assist};
        ${refer.THEME_DARK}: ${this.theme.dark};
        ${refer.THEME_EX}: ${this.theme.ex};
      `;
    },
    theme() {
      return this.getThemeList[this.getThemeIndex];
    }
  }
};
</script>
