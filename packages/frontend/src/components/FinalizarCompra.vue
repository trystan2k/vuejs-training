<template>
  <section>
    <h2>Endereço de Envio</h2>
    <erro-notificacao :erros="erros"></erro-notificacao>
    <usuario-form>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </usuario-form>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";
export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm,
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          zipcode: this.usuario.zipcode,
          address: this.usuario.address,
          number: this.usuario.number,
          district: this.usuario.district,
          city: this.usuario.city,
          state: this.usuario.state,
        },
      };
    },
  },
  data() {
    return {
      erros: [],
    };
  },
  methods: {
    criarTransacao() {
      return api.post("/transacoes", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.criarTransacao();
      } catch (erro) {
        if (erro.response && erro.response.data && erro.response.data.message[0]) {
          this.erros = this.erros.concat(erro.response.data.message[0].messages);
        } else {
          this.erros = this.error.concat([error])
        }
      }
    },
    finalizarCompra() {
      this.erros = [];
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
