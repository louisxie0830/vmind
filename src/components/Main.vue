<template>
  <main ref="main">
    <Mindmap />
  </main>
</template>

<script>
import Mindmap from "./Mindmap";
export default {
  components: {
    Mindmap
  }
};
</script>

<style lang="scss">
main {
  height: calc(100vh - 56px);
  margin: 56px 0 0;
  overflow: scroll;
}
</style>
