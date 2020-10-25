import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      username: "",
      id: "",
      name: "",
      email: "",
      password: "",
      zipcode: "",
      address: "",
      number: "",
      district: "",
      city: "",
      state: "",
    },
    usuario_produtos: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
    },
  },
  actions: {
    getUsuarioProdutos(context) {
      return api
        .get(`/produtos?usuario_id=${context.state.usuario.username}`)
        .then((r) => context.commit("UPDATE_USUARIO_PRODUTOS", r.data));
    },
    getUsuario(context) {
      return api.get(`/users/me`).then((r) => {
        context.commit("UPDATE_USUARIO", r.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", {
        username: payload.email,
        id: payload.email,
      });
      return api.createUser(payload);
    },
    logarUsuario(context, payload) {
      return api
        .login({
          identifier: payload.email,
          password: payload.password,
        })
        .then((r) => {
          window.localStorage.token = `Bearer ${r.data.jwt}`;
        });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        username: "",
        id: "",
        name: "",
        email: "",
        password: "",
        zipcode: "",
        address: "",
        number: "",
        district: "",
        city: "",
        state: "",
      });
      context.commit("UPDATE_LOGIN", false);
      window.localStorage.removeItem("token");
    },
  },
  modules: {},
});
