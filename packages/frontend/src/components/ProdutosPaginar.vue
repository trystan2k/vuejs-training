<template>
  <ul v-if="paginasTotal > 1">
    <router-link :to="{ query: query(1) }"> Primeira </router-link>
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
    </li>
    <router-link :to="{ query: query(paginasTotal) }">Última</router-link>
  </ul>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina,
      };
    },
  },
  computed: {
    paginas() {
      const atual = Number(this.$route.query._page);
      const intervalo = 9;
      const offset = Math.ceil(intervalo / 2);
      const total = this.paginasTotal;
      const paginasArray = [];

      for (let i = 1; i <= total; i++) {
        paginasArray.push(i);
      }

      paginasArray.splice(0, atual - offset);
      paginasArray.splice(intervalo, total);

      return paginasArray;
    },
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
  },
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}
li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
