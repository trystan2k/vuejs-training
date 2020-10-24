<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">
      <label for="nome">Nome</label>
      <input id="nome" name="name" type="text" v-model="name" />
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email" />
      <label for="senha">Senha</label>
      <input id="senha" name="password" type="password" v-model="password" />
    </div>
    <label for="cep">Cep</label>
    <input
      id="cep"
      name="zipcode"
      type="text"
      v-model="zipcode"
      @keyup="preencherCep"
    />
    <label for="rua">Rua</label>
    <input id="rua" name="address" type="text" v-model="address" />
    <label for="numero">Numero</label>
    <input id="numero" name="number" type="text" v-model="number" />
    <label for="bairro">Bairro</label>
    <input id="bairro" name="distrcit" type="text" v-model="district" />
    <label for="cidade">Cidade</label>
    <input id="cidade" name="city" type="text" v-model="city" />
    <label for="estado">Estado</label>
    <input id="estado" name="state" type="text" v-model="state" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";

export default {
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "address",
        "zipcode",
        "number",
        "district",
        "city",
        "state",
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO",
    }),
    mostrarDadosLogin() {
      return !this.$store.state.login || this.$route.name === "usuario-editar";
    },
  },
  methods: {
    preencherCep() {
      const zipcode = this.zipcode.replace(/\D/g, "");
      if (zipcode.length === 8) {
        getCep(zipcode).then((r) => {
          this.address = r.data.logradouro;
          this.district = r.data.bairro;
          this.state = r.data.uf;
          this.city = r.data.localidade;
        });
      }
    },
  },
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
