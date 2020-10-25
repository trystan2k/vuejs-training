<template>
  <div class="produto" v-if="produto">
    <router-link
      class="produto-img"
      :to="{ name: 'produto', params: { id: produto.slug } }"
    >
      <img
        v-if="produto.fotos && produto.fotos.length > 0"
        :src="produto.fotos[0].url"
        :alt="produto.fotos[0].name"
      />
    </router-link>
    <div class="info">
      <p class="preco">{{ produto.preco | numeroPreco }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProdutoItem",
  props: ["produto"],
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}

.produto-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}

.info {
  align-self: end;
}
</style>
