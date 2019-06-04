<template>
  <a :class="shortcutClass"><slot /></a>
</template>

<script>
import { css } from "emotion";
export default {
  computed: {
    shortcutClass() {
      return css`
        text-decoration: underline;
        cursor: pointer;
      `;
    }
  }
};
</script>
