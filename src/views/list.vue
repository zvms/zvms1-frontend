<template>
  <v-container>
    <v-card color="primary" dark>
      <v-card-title>
        反馈列表
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
    <v-card v-for="i in feedbacks" v-bind:key="i.id">
      <v-card-title>{{ i.title }}</v-card-title>
      <v-card-text>
        {{ i.content }}
      </v-card-text>
      <br/>
      <v-card-text>
        发起者：{{ i.holder }} | 请愿数：{{i.want}} | 状态：{{ i.progress }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="granted()" color="primary" @click="modifyProgress(i.id)">
          <v-icon left>mdi-clipboard-text</v-icon>
          修改状态
        </v-btn>
        <v-btn color="primary" @click="want(i.id)">
          <v-icon left>mdi-account-plus</v-icon>
          请愿
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <v-card-title>修改状态</v-card-title>
        <v-text-field
          v-model="progress"
          type="text"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updateModify()">确定</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dialogs from "../utils/dialogs.js";
import axios from "axios";

export default {
  data: () => ({
    feedbacks: [],
    dialog: false,
    curId: undefined,
    progress: undefined
  }),
  mounted: function(){
    this.pageload();
  },
  methods: {
    pageload: async function(){
        this.$store.commit("loading",true);
        await axios.post("/list/",{
        }).then((res) => {
            this.feedbacks = res.list;
        }).catch((err) => {
            dialogs.toast.error(err);
        });
        this.$store.commit("loading",false);
    },
    granted: function(){
      return this.$store.token!=undefined;
    },
    modifyProgress: function(id){
        this.curId = id;
        this.dialog = true;
    },
    updateModify: async function(){
        this.$store.commit("loading",true);
        this.dialog=false;
        await axios.post("/update/",{
            "id": this.curId,
            "progress": this.progress
        }).then((res) => {
            if(res.type=="SUCCESS") dialogs.toast.success("修改状态成功！");
            else if(res.type=="ERROR") dialogs.toast.error(res.message);
            else dialogs.toast.error("未知错误！");
        }).catch((err) => {
            dialogs.toast.error(err);
        });
        this.$store.commit("loading",false);
        location.reload();
    },
    want: async function(id){
        for(let i in this.$store.wants) if(i==id){
            dialogs.toast.error("请不要重复请愿！");
            return;
        }
        this.$store.commit("loading",true);
        await axios.post("/want/",{
            "id": this.curId
        }).then((res) => {
            if(res.type=="SUCCESS"){
                dialogs.toast.success("请愿成功！");
                this.$store.commit("want",id);
            }else if(res.type=="ERROR") dialogs.toast.error(res.message);
            else dialogs.toast.error("未知错误！");
        }).catch((err) => {
            dialogs.toast.error(err);
        });
        this.$store.commit("loading",false);
        location.reload();
    }
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>