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
          v-show="!granted()"
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
    <v-dialog v-model="dialog1" max-width="80%">
      <v-card>
        <v-simple-table>
          <thead>
            <td>学号</td>
            <td>删除</td>
          </thead>
          <tbody>
            <tr
              v-for="(stuid, i) in stulstSelected"
              :key = "i"
            >
              <td>{{stuid}}</td>
              <td>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="primary"
                  @click="delFromList(i)"
                >
                  <v-icon dark>
                    mdi-minus
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>
                <v-select
                  prepend-icon="mdi-switch"
                  v-model="class_new"
                  label="选定学生"
                  :items="stulst"
                  item-text="name"
                  item-value="id"
                >
                </v-select>
              </td>
              <td>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  x-small
                  color="primary"
                  @click= "addToList"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="signupVolunteer(vol.id)">确定</v-btn>
          <v-btn color="red darken-1" text @click="dialog1 = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dialogs from "../../utils/dialogs.js";
import permissions from "../../utils/permissions";
import volinfo from "../../components/volinfo";
import zutils from "../../utils/zutils.js";
import axios from "axios";

export default {
  data: () => ({
    volworks: [],
    dialog: false,
    dialog1: false,
    volid: 0,
    onlyDisplayCurrentClass: true,
    stulst: [],
    stulstSelected: []
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
      this.dialog1 = true;

      this.stulst = undefined;
      await zutils.fetchStudentList(this.$store.state.info.class, (stus) => {
        stus ? (this.stulst = stus) : (this.stulst = undefined);
      });
      
    },
    signupVolunteer: function(volid){
      await axios
        .post("/volunteer/signup/"+volid,{
          "stulst": this.stulstSelected
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.type == "SUCCESS") {
              dialogs.toasts.success(response.data.message);
              for(let k in this.form)
                this.form[k] = undefined
            } else {
              dialogs.toasts.error(response.data.message);
            }
        })
        .catch((err) => {
          dialogs.toasts.error(err);
        })
        .finally(() => {
          this.$store.commit("loading", false);
        });
        dialog1 = false;
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
    async fetchCurrentClassVol() {
      this.$store.commit("loading", true);
      await zutils.fetchClassVolunter(
        this.$store.state.info.class,
        (volworks) => {
          volworks
            ? (this.volworks = volworks)
            : dialogs.toasts.error("获取义工列表失败");
        }
      );
      this.$store.commit("loading", false);
    },
    
    async fetchAllVol() {
      this.$store.commit("loading", true);
      await zutils.fetchAllVolunter((volworks) => {
        volworks
          ? (this.volworks = volworks)
          : dialogs.toasts.error("获取义工列表失败");
      });
      this.$store.commit("loading", false);
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>