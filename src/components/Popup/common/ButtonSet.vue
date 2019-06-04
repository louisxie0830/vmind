<template>
  <div :class="buttonSet">
    <slot />
  </div>
</template>

<script>
import { css } from "emotion";
export default {
  computed: {
    buttonSet() {
      return css`
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;

        button {
          margin-left: 20px;
          padding: 10px 20px;
          background-color: #ffffff;
          border-radius: 10px;
          outline: none;
        }

        button:active {
          transform: scale(0.95);
        }
      `;
    }
  }
};
</script>
