<template>
  <div id="app">
    <ThemeProvider>
      <Nav />
      <Main />
    </ThemeProvider>
  </div>
</template>
<script>
import ThemeProvider from "./components/ThemeProvider";
import Nav from "./components/Nav";
import Main from "./components/Main";

import { mapGetters } from "vuex";

export default {
  components: {
    ThemeProvider,
    Nav,
    Main
  },
  computed: {
    ...mapGetters(["getGlobal"]),
    ...mapGetters("node", {
      getNodeStatus: "getNodeStatus"
    }),
    ...mapGetters("history", {
      getHistory: "getHistory"
    })
  },
  created() {
    console.log("this.getGlobal: ", this.getGlobal);
    console.log("this.getNodeStatus: ", this.getNodeStatus);
    console.log("this.getHistory: ", this.getHistory);
  }
};
</script>
