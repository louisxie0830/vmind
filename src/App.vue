<template>
  <div id="app">
    <ThemeProvider>
      <Nav />
    </ThemeProvider>
  </div>
</template>
<script>
import ThemeProvider from "./components/ThemeProvider";
import Nav from "./components/Nav";
export default {
  components: {
    ThemeProvider,
    Nav
  }
};
</script>
