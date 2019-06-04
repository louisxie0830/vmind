<template>
  <p :class="annotationClass"><slot /></p>
</template>

<script>
import { css } from "emotion";
export default {
  computed: {
    annotationClass() {
      return css`
        color: #888888;
        font-size: 90%;
      `;
    }
  }
};
</script>
