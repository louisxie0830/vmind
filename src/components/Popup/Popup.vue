<template>
  <div :class="wrapper" v-if="currentTabComponent">
    <div :class="contentWrapper">
      <i :class="iconClass" @click="handleClosePopup()" />
      <component
        :is="currentTabComponent"
        :handleClosePopup="handleClosePopup"
      />
    </div>
    <div :class="overlay" @click="handleClosePopup()" />
  </div>
</template>

<script>
import { css } from "emotion";
import New from "../Popup/subComponents/New";
export default {
  components: {
    New
  },
  props: {
    handleClosePopup: {
      type: Function,
      required: true
    },
    componentType: {
      type: String,
      default: ""
    }
  },
  computed: {
    wrapper() {
      return css`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      `;
    },
    contentWrapper() {
      return css`
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 30%;
        left: 0;
        right: 0;
        width: 400px;
        margin: auto;
        padding: 40px 40px 20px;
        font-size: 1rem;
        background-color: #ffffff;
        border-radius: 20px;
        z-index: 1;
      `;
    },
    iconClass() {
      const closeButton = css`
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
        font-weight: 700;

        &:active {
          transform: scale(0.95);
        }
      `;
      return "zwicon-close-circle " + closeButton;
    },
    overlay() {
      return css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000000;
        opacity: 0.2;
      `;
    },
    currentTabComponent() {
      return (
        this.componentType &&
        this.componentType !== "None" &&
        this.componentType
      );
    }
  }
};
</script>
