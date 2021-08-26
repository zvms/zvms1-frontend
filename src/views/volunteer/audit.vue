<template>
  <v-container>
    <v-card>
      <v-card-title>
        未审核感想列表
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
          fixed-header
          :headers="headers"
          :items="thoughts"
          :search="search"
          :loading="$store.state.isLoading"
          @click:row="rowClick"
          loading-text="加载中..."
          no-data-text="没有数据哦"
          no-results-text="没有结果"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog1" max-width="80%">
      <v-card>
        <v-simple-table style="margin:20px;">
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
                  v-model="stu_new"
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
          <v-btn color="red darken-1" text @click="signupVolunteer(volid)">确定</v-btn>
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
    search: "",
    headers: [
      { text: "义工编号", value: "volId", align: "start", sortable: true },
      { text: "学号", value: "stuId" },
    ],
    thoughts: undefined
  }),
  mounted: function () {
    this.pageload();
  },
  methods: {
    async pageload() {
      this.$store.commit("loading", true);
      await axios
        .get("/volunteer/unaudited",{

        })
        .then((response) => {
            console.log(response.data);
            if (response.data.type == "SUCCESS") {
              dialogs.toasts.success(response.data.message);
              this.thoughts = response.data.result;
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
      this.$store.commit("loading", false);
    },
    granted: function () {
      return this.$store.state.info.permission < permissions.teacher;
    },
    volSignUp: function (volid) {
      console.log("SignUp: " + volid);
      this.dialog1 = true;

      this.stulst = undefined;
      zutils.fetchStudentList(this.$store.state.info.class, (stus) => {
        stus ? (this.stulst = stus) : (this.stulst = undefined);
      });
      this.volid = volid;
    },
    signupVolunteer: function(volid){
      console.log("/volunteer/signup/"+volid,{
        "stulst": this.stulstSelected
      });
      axios
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
        this.dialog1 = false;
    },
	participants: function (volid){
    this.dialog_participant = true;
    this.volid = volid;
    axios
      .get("/volunteer/signerList/"+volid, {

      })
      .then((response) => {
        console.log(response.data);
        if (response.data.type == "SUCCESS") {
          dialogs.toasts.success(response.data.message);
          this.participantsLst = response.data.result;
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
    
    addToList: function (){
      console.log("Ent");
      console.log(this.stu_new);
      console.log(this.stulstSelected);
      let flg = false;
      if (this.stu_new == "" || this.stu_new == undefined) flg = true;
      for (let i in this.stulstSelected){
        if (this.stulstSelected[i] == this.stu_new){
          flg = true;
          break;
        }
      }
      if (!flg)
        this.stulstSelected.push(this.stu_new);
      else
        dialogs.toasts.error("请不要重复报名");
      this.stu_new = "";
    },
    delFromList: function(i){
      this.stulstSelected.splice(i, 1);
    },

    rowClick: function(item){
      this.stu = item.stuId;
      this.submitThoughtDialog = true;
    },
    submit: function(){
      axios
        .post("/volunteer/thought/"+this.volid, {
          "thought":[{"stuId":this.stu,"content":this.thought}]
        })
        .then((response) => {
          if (response.data.type == "SUCCESS") {
            dialogs.toasts.success(response.data.message);
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
    }
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>