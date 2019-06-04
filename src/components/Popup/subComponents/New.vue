<template>
  <div>
    <Highlight :content="'新建檔案，之前的檔案將會被移除'" />
    <Annotation>要保存數據請將檔案<Shortcut>下載</Shortcut></Annotation>
    <ButtonSet>
      <MainButton :content="'新建'" />
      <button @click="handleClosePopup()">取消</button>
    </ButtonSet>
  </div>
</template>

<script>
import Highlight from "../common/Highlight";
import Annotation from "../common/Annotation";
import Shortcut from "../common/Shortcut";
import ButtonSet from "../common/ButtonSet";
import MainButton from "../common/MainButton";
export default {
  components: {
    Highlight,
    Annotation,
    Shortcut,
    ButtonSet,
    MainButton
  },
  props: {
    handleClosePopup: {
      type: Function,
      required: true
    }
  }
};
</script>
