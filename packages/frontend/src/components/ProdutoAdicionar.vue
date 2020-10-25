<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome" />
    <label for="preco">Preco (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco" />
    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" ref="fotos" multiple />
    <label for="descricao">Descrição</label>
    <textarea
      id="descricao"
      name="descricao"
      type="text"
      v-model="produto.descricao"
    ></textarea>
    <input
      type="button"
      class="btn"
      value="Adicionar Produto"
      @click.prevent="adicionarProduto"
    />
    <erro-notificacao :erros="erros"></erro-notificacao>
  </form>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "ProdutoAdicionar",
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false",
      },
      erros: []
    };
  },
  methods: {
    formatarProduto() {
      const form = new FormData();

      const files = this.$refs.fotos.files;
      for (let i = 0; i < files.length; i++) {
        form.append(`files.fotos`, files[i], files[i].name);
      }

      this.produto.usuario_id = this.$store.state.usuario.username;
      form.append("data", JSON.stringify(this.produto));
      return form;
    },
    async adicionarProduto(event) {
      const produto = this.formatarProduto();

      const button = event.currentTarget;
      button.value = 'Adicionando...';
      button.setAttribute('disabled', "");

      try {
        await api.post("/produtos", produto);
        await this.$store.dispatch("getUsuarioProdutos");
        button.value = 'Adicionar Produto';
        this.produto = {
          nome: "",
          preco: "",
          descricao: "",
          fotos: null,
          vendido: "false",
        }
        button.removeAttribute('disabled');
      } catch (erro) {
        if (erro.response && erro.response.data && erro.response.data.message[0]) {
          this.erros = this.erros.concat(erro.response.data.message[0].messages);
        } else {
          this.erros = this.erros.concat([erro])
        }
      }
    },
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
