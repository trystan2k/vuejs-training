<template>
  <section>
    <usuario-form>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Usuário
      </button>
    </usuario-form>
    <erro-notificacao :erros="erros"></erro-notificacao>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      erros: [],
    };
  },
  methods: {
    atualizarUsuario() {
      this.erros = [];
      api
        .put(`/users/me`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch((erro) => {
          this.erros = this.erros.concat(
            erro.response.data.message[0].messages
          );
        });
    },
  },
};
</script>

<style></style>
