<template>
  <v-container>
    <v-card color="primary" dark>
      <v-card-title>
        义工列表
        <v-spacer></v-spacer>
        <v-switch
          color="secondary"
          label="仅显示本班"
          @click="switchDisplay()"
          v-model="onlyDisplayCurrentClass"
          dense
        ></v-switch>
      </v-card-title>
    </v-card>
    <v-card v-for="vol in volworks" v-bind:key="vol.id">
      <v-card-title>{{ vol.name }}</v-card-title>
      <v-card-text>
        {{ vol.description }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="volDetail(vol.id)">
          <v-icon left>mdi-clipboard-text</v-icon>
          详情
        </v-btn>
        <v-btn color="primary" @click="volSignUp(vol.id)">
          <v-icon left>mdi-account-plus</v-icon>
          报名
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <volinfo :volid="volid" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import dialogs from "../../utils/dialogs.js";
import permissions from "../../utils/permissions";
import volinfo from "../../components/volinfo";

export default {
  data: () => ({
    volworks: [],
    dialog: false,
    volid: 0,
    onlyDisplayCurrentClass: true,
  }),
  components: {
    volinfo,
  },
  mounted: function () {
    this.pageload();
  },
  methods: {
    pageload() {
      this.switchDisplay();
    },
    granted: function () {
      return this.$store.state.info.permission < permissions.teacher;
    },
    volSignUp: function (volid) {
      //TODO 报名义工
      console.log("SignUp: " + volid);
    },
    volDetail: function (volid) {
      console.log("Detail:" + volid);
      this.volid = volid;
      this.dialog = true;
    },
    switchDisplay: function () {
      if (this.onlyDisplayCurrentClass) this.fetchCurrentClassVol();
      else this.fetchAllVol();
    },
    fetchCurrentClassVol: function () {
      console.log("fetchCurrentClassVol");
      this.$store.commit("loading", true);
      axios
        .get("/class/volunteer/" + this.$store.state.info.class)
        .then((response) => {
          if (response.data.type == "ERROR")
            dialogs.toasts.error(response.data.message);
          else if (response.data.type == "SUCCESS") {
            this.volworks = response.data.volunteer;
          } else dialogs.toasts.error("未知错误");
        })
        .catch((error) => {
          dialogs.toasts.error(error);
        })
        .finally(() => {
          this.$store.commit("loading", false);
        });
    },
    fetchAllVol: function () {
      this.$store.commit("loading", true);
      axios
        .get("/volunteer/list")
        .then((response) => {
          if (response.data.type == "ERROR")
            dialogs.toasts.error(response.data.message);
          else if (response.data.type == "SUCCESS") {
            this.volworks = response.data.volunteer;
          } else dialogs.toasts.error("未知错误");
        })
        .catch((error) => {
          dialogs.toasts.error(error);
        })
        .finally(() => {
          this.$store.commit("loading", false);
        });
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>