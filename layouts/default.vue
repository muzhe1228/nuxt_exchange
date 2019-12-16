<template>
  <div class="layout">
    <Layout>
      <Header />
      <Content>
        <nuxt />
      </Content>
      <Footer />
    </Layout>
  </div>
</template>
<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  }
};
</script>  

<style scoped lang="stylus">
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
</style>
