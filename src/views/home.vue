<template>
  <v-container>
    <v-card>
      <v-card-title>初始化</v-card-title>
      <v-card-text>正在加载...</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import dialogs from '../utils/dialogs'

export default {
  name: "home",
  mounted: function () {
    this.pageload();
  },
  methods: {
    pageload: function(){
      this.init()
    },

    init() {
      this.$store.commit("loading", true);
      axios
        .get("/config/theme.json")
        .then((response) => {
          this.$vuetify.theme.themes = response.data;
        })
        .catch((error) => {
          dialogs.toasts.error(error);
        })
        .finally(() => {
          this.$store.commit("loading", false);
          axios.defaults.baseURL = "/api";
          this.$router.push("/login");
        });
    },
  },
};
</script>
