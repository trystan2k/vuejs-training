<template>
  <section>
    <h2>Adicionar Produto</h2>
    <erro-notificacao :erros="erros"></erro-notificacao>
    <produto-adicionar></produto-adicionar>
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" nome="list" tag="ul">
      <li v-for="produto in usuario_produtos" :key="produto.id">
        <produto-item :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.slug)">
            Deletar
          </button>
        </produto-item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";
export default {
  name: "UsuarioProdutos",
  components: {
    ProdutoAdicionar,
    ProdutoItem,
  },
  data() {
    return {
      erros: []
    }
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      this.erros = [];
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api
          .delete(`/produtos/${id}`)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch((erro) => {
            if (erro.response && erro.response.data && erro.response.data.message[0]) {
              this.erros = this.erros.concat(erro.response.data.message[0].messages);
            } else {
              this.erros = this.erros.concat([erro])
            }
          });
      }
    },
  },
  watch: {
    login() {
      this.getUsuarioProdutos();
    },
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos();
    }
    document.title = 'Usuário';
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
