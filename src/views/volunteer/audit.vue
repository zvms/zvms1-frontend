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
		<v-card-title>详细信息</v-card-title>
        <v-simple-table style="margin:20px;">
          <tbody>
			<tr>
			  <td>义工编号</td>
			  <td>{{volid}}</td>
			</tr>
			<tr>
			  <td>义工日期</td>
			  <td>{{volDate}}</td>
			</tr>
			<tr>
			  <td>义工时间</td>
			  <td>{{volTime}}</td>
			</tr>
			<tr>
			  <td>义工详细信息</td>
			  <td>{{volDesc}}</td>
			</tr>
			<tr>
			  <td>校内时长</td>
			  <td>{{volTI}}</td>
			</tr>
			<tr>
			  <td>校外时长</td>
			  <td>{{volTO}}</td>
			</tr>
			<tr>
			  <td>大型时长</td>
			  <td>{{volTL}}</td>
			</tr>
			<tr>
			  <td>学号</td>
			  <td>{{stuid}}</td>
			</tr>
			<tr>
			  <td>感想</td>
			  <td>{{thought}}</td>
			</tr>
			<tr>
			  <td>发放的校内时长</td>
			  <td><v-text-field
			    v-model="inside"
                label="不填为默认值"
                prepend-icon="mdi-view-list"
              /></td>
			</tr>
			<tr>
			  <td>发放的校外时长</td>
			  <td><v-text-field
			    v-model="outside"
                label="不填为默认值"
                prepend-icon="mdi-view-list"
              /></td>
			</tr>
			<tr>
			  <td>发放的大型时长</td>
			  <td><v-text-field
			    v-model="large"
                label="不填为默认值"
                prepend-icon="mdi-view-list"
              /></td>
			</tr>
          </tbody>
        </v-simple-table>
        <v-card-actions>
          <v-spacer></v-spacer>
		  <v-btn
            color="primary"
            block
            :disabled="$store.state.isLoading"
            @click="audit(1)"
          >通过
		  </v-btn>
		  <v-btn
            color="primary"
            block
            :disabled="$store.state.isLoading"
            @click="audit(2)"
          >拒绝
		  </v-btn>
		  <v-btn
            color="primary"
            block
            :disabled="$store.state.isLoading"
            @click="audit(3)"
          >打回
		  </v-btn>
		  <v-btn
            color="primary"
            block
            :disabled="$store.state.isLoading"
            @click="dialog1 = false"
          >取消
		  </v-btn>
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
    thoughts: undefined,
	dialog1: false,
	stuid: undefined,
	volid: undefined,
	thought: undefined,
	volTime: undefined,
	volDate: undefined,
	volDesc: undefined,
	volTI: undefined,
	volTO: undefined,
	volTL: undefined,
	inside: undefined,
	outside: undefined,
	large: undefined
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
	rowClick: function (item) {
	  this.dialog1 = true;
	  this.volid = item.volId;
	  this.stuid = item.stuId;
	  this.thought = item.thought;
	  
	  this.$store.commit("loading", true);
      await axios
        .get("/volunteer/fetch/"+this.volid,{

        })
        .then((response) => {
            console.log(response.data);
            if (response.data.type == "SUCCESS") {
              dialogs.toasts.success(response.data.message);
              this.volDate = response.data.date;
              this.volTime = response.data.time;
              this.volDesc = response.data.description;
			  this.volTI = response.data.inside;
			  this.volTO = response.data.outside;
			  this.volTL = response.data.large;
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
	audit: function (status) {
	  
	}
	/*
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
	*/
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>