<template>
  <section>
    <h1>👍 Compre ou Venda 👎</h1>
    <produtos-buscar></produtos-buscar>
    <produtos-lista></produtos-lista>
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";

export default {
  name: "Home",
  components: {
    ProdutosBuscar,
    ProdutosLista,
  },
  created() {
    document.title = "Ranek";
  }
};
</script>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  text-align: center;
  font-sise: 2rem;
}
</style>
