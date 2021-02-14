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
      this.$vuetify.theme.themes = {
        "light":{"primary":"F48FB1"},
        "dark":{"primary":"#424242"}
      };
      axios.defaults.baseURL = "101.200.126.111:5000";
      this.$router.push("/login");
    },
  },
};
</script>
