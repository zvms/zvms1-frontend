<template>
  <v-card flat :loading="$store.state.isLoading">
    <v-layout column align-center>
    <v-card-title v-if="toggled == false && stu.status == 1"><span class="cert-header">义工完成证明</span></v-card-title>
    <v-card-title v-if="toggled == true || stu.status  != 1">{{ vol.name }}</v-card-title>
    </v-layout>
    <v-card-text v-if="toggled == true || stu.status  != 1">{{ vol.description }}</v-card-text>
      <v-container fluid>
        <div v-if="toggled == false && stu.status == 1" @click="flipcard()">
        <p class="cert"><span class="stress">{{ stuname }}</span>同学已于<span class="stress">{{ formalDate(vol.date) }} {{formalTime(vol.time) }}</span>完成名为<span class="stress">{{ vol.name }}</span>的义工活动，预计获得校内义工时长<span class="stress">{{ timeToHint(vol.inside) }}</span>，校外义工时长<span class="stress">{{ timeToHint(vol.outside) }}</span>，大型义工时长<span class="stress">{{ timeToHint(vol.large) }}。</span></p>
        <p class="cert">经由团支部评定及感想审核，决定给予<span class="stress">{{ stuname }}</span>同学校内义工时长<span class="stress">{{ timeToHint(stu.inside) }}</span>，校外义工时长<span class="stress">{{ timeToHint(stu.outside) }}</span>，大型义工时长<span class="stress">{{ timeToHint(stu.large) }}</span>。</p>
        <p class="cert">特此证明</p>
        <v-layout column align-end>
        <p class="cert">镇海中学 团委</p>
        <p class="cert">镇海中学 学生会实践部</p>
        <p class="cert">镇海中学 义管会</p>
        <p class="cert">{{ formalDate(vol.date) }}</p>
        <v-img src="../../public/stamp.png" height="150px" width="150px" />
        </v-layout>
        </div>
        <div v-if="toggled == true || stu.status != 1" @click="flipcard()">
        <v-row dense>
        <v-col :cols="6">
          <v-simple-table>
            <tbody>
              <tr>
                <td>义工日期</td>
                <td>{{ vol.date }}</td>
              </tr>
              <tr>
                <td>义工时间</td>
                <td>{{ vol.time }}</td>
              </tr>
              <tr>
                <td>预计校内时长</td>
                <td>{{ timeToHint(vol.inside) }}</td>
              </tr>
              <tr>
                <td>预计校外时长</td>
                <td>{{ timeToHint(vol.outside) }}</td>
              </tr>
              <tr>
                <td>预计大型时长</td>
                <td>{{ timeToHint(vol.large) }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col :cols="6">
          <v-simple-table>
            <tbody>
              <tr>
                <td>学生姓名</td>
                <td>{{ stuname }}</td>
              </tr>
              <tr>
                <td>完成状态</td>
                <td>
                  <v-chip :color="stColor(stu.status)" :text-color="stColorT(stu.status)">
                    {{ statusToStr(stu.status) }}
                  </v-chip>
                </td>
              </tr>
              <tr>
                <td>发放校内时长</td>
                <td>{{ timeToHint(stu.inside) }}</td>
              </tr>
              <tr>
                <td>发放校外时长</td>
                <td>{{ timeToHint(stu.outside) }}</td>
              </tr>
              <tr>
                <td>发放大型时长</td>
                <td>{{ timeToHint(stu.large) }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        </v-row>
        <pre v-for="i in stu.thought.split('\n')" v-bind:key="i">{{ i }}</pre>
        </div>
      </v-container>
  </v-card>
</template>

<style>
pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-break: normal;
    word-wrap: break-word;
    font-family: "微软雅黑";
    text-indent: 2em;
}
.stress {
    font-size: 25px;
    font-family: "楷体";
    font-weight: normal;
}
.cert-header {
    font-size: 30px;
    font-family: "宋体";
    font-weight: bold;
}
p.cert {
    text-indent: 2em;
    line-height: 2;
    font-size: 18px;
    font-family: "仿宋";
}
</style>

<script>
import dialogs from "../utils/dialogs";
import axios from "axios";

export default {
  name: "volcert",
  props: ["volid","stuid","stuname"],
  data: () => ({
    toggled: false,
    vol: {
      id: undefined,
      name: "加载中...",
      date: undefined,
      time: undefined,
      description: undefined,
      inside: undefined,
      outside: undefined,
      large: undefined,
    },
    stu: {
      id: undefined,
      status: undefined,
      thought: "",
      inside: undefined,
      outside: undefined,
      large: undefined,
    },
  }),
  created: function () {
    this.init();
  },
  methods: {
    timeToHint: function (a){
        let hr = parseInt(a / 60);
        let mi = parseInt(a % 60);
        if (hr != 0)
            if (mi != 0)
                return hr + "小时" + mi + "分钟";
            else
                return hr + "小时";
        else
            return mi + "分钟";
    },
    statusToStr: function (a){
        if (a==1) return "通过";
        if (a==2) return "打回，不可重新提交";
        if (a==3) return "打回，可以重新提交";
        return "等待审核";
    },
    stColor: function (a){
        if (a==1) return "green";
        if (a==2) return "red";
        if (a==3) return "orange";
        return "";
    },
    stColorT: function (a){
        if (a==1) return "white";
        if (a==2) return "white";
        if (a==3) return "white";
        return "black";
    },
    formalDate: function (date) {
        let y = date.slice(0,4);
        let m = date.slice(5,7);
        let d = date.slice(8,10);
        return parseInt(y)+"年"+parseInt(m)+"月"+parseInt(d)+"日";
    },
    formalTime: function (time){
        let hr = time.slice(0,2);
        let mn = time.slice(3,5);
        return parseInt(hr)+"时"+parseInt(mn)+"分";
    },
    flipcard: function (){
        this.toggled = !this.toggled;
    },
    init: function () {
      this.toggled = false;
      if (this.volid != 0 && this.volid != undefined
          && this.stuid != 0 && this.stuid != undefined) {
        this.$store.commit("loading", true);
        axios.post("/student/volcert/",{
            "volId": this.volid,
            "stuId": this.stuid
        }).then((response) => {
            if (response.data.type == "ERROR")
              dialogs.toasts.error(response.data.message);
            else if (response.data.type == "SUCCESS") {
              this.vol = response.data.vol;
              this.stu = response.data.stu;
            } else dialogs.toasts.error("未知错误");
          })
          .catch((error) => {
            dialogs.toasts.error(error);
          })
          .finally(() => {
            this.$store.commit("loading", false);
          });
      }
    },
  },
  watch: {
    volid: function () { this.init(); },
    stuid: function () { this.init(); },
    stuname: function () { this.init(); },
  },
};
</script>
