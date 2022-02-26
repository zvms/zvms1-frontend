<template>
  <v-card flat :loading="$store.state.isLoading">
    <v-card-title align="center">义工完成证明</v-card-title>
      <v-container fluid>
        <v-row dense>
        <v-col :cols="6">
          <v-simple-table>
            <tbody>
              <tr>
                <td>义工编号</td>
                <td>{{ vol.id }}</td>
              </tr>
              <tr>
                <td>义工名称</td>
                <td>{{ vol.name }}</td>
              </tr>
              <tr>
                <td>义工信息</td>
                <td>{{ vol.description }}</td>
              </tr>
              <tr>
                <td>义工日期</td>
                <td>{{ vol.date }}</td>
              </tr>
              <tr>
                <td>义工时间</td>
                <td>{{ vol.time }}</td>
              </tr>
              <tr>
                <td>校内时长</td>
                <td>{{ timeToHint(vol.inside) }}</td>
              </tr>
              <tr>
                <td>校外时长</td>
                <td>{{ timeToHint(vol.outside) }}</td>
              </tr>
              <tr>
                <td>大型时长</td>
                <td>{{ timeToHint(vol.large) }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col :cols="6">
          <v-simple-table>
            <tbody>
              <tr>
                <td>学生编号</td>
                <td>{{ stu.id }}</td>
              </tr>
              <tr>
                <td>学生感想</td>
                <td>{{ stu.thought }}</td>
              </tr>
              <tr>
                <td>实际获得校内时长</td>
                <td>{{ timeToHint(stu.inside) }}</td>
              </tr>
              <tr>
                <td>实际获得校外时长</td>
                <td>{{ timeToHint(stu.outside) }}</td>
              </tr>
              <tr>
                <td>实际获得大型时长</td>
                <td>{{ timeToHint(stu.large) }}</td>
              </tr>
              <tr>
                <td>完成状态</td>
                <td>
                  <v-chip :color="stColor(stu.status)" :text-color="stColorT(stu.status)">
                    {{ statusToStr(stu.status) }}
                  </v-chip>
                </td>
              </tr>
              <tr v-if="stu.status==1">
                <td></td>
                <td><v-img
                  src="../../public/stamp.png"
                  height="150px"
                  width="150px"
                /></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        </v-row>
      </v-container>
  </v-card>
</template>

<script>
import dialogs from "../utils/dialogs";
import axios from "axios";

export default {
  name: "volcert",
  props: ["volid","stuid"],
  data: () => ({
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
                return hr + " 小时 " + mi + " 分钟";
            else
                return hr + " 小时 ";
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
    init: function () {
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
};
</script>
