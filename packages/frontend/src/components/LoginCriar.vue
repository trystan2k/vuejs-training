<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <erro-notificacao :erros="erros"></erro-notificacao>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar Conta
      </button>
      <usuario-form v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">
          Criar Usuario
        </button>
      </usuario-form>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      criar: false,
      erros: [],
    };
  },
  methods: {
    async criarUsuario() {
      this.erros = [];
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        this.$router.push({ name: "usuario" });
      } catch (erro) {
        if (erro.response && erro.response.data && erro.response.data.message[0]) {
          this.erros = this.erros.concat(erro.response.data.message[0].messages);
        } else {
          this.erros = this.error.concat([error])
        }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
