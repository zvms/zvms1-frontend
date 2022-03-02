<template>
  <v-container>
    <v-card>
      <v-card-title> 创建义工 </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="form.name"
            label="义工名称"
            prepend-icon="mdi-pen"
          />
          <v-text-field
            v-model="form.stuMax"
            label="义工总人数"
            prepend-icon="mdi-account"
          />
          <!---->
          <v-simple-table>
            <thead>
              <td>班级</td>
              <td>最多报名人数</td>
              <td>删除</td>
            </thead>
            <tbody>
              <tr
                v-for="(cls, i) in classSelected"
                :key = "i"
              >
                <td>{{mp[cls.id]}}</td>
                <td>{{cls.stuMax}}</td>
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
                    label="限定班级"
                    :items="classes"
                    item-text="name"
                    item-value="id"
                  >
                  </v-select>
                </td>
                <td>
                  <v-text-field
                    v-model.number = "count_new"
                    label = "限制人数"
                    @keyup.native.enter="addToList"                    
                  >
                  </v-text-field>
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
          <!---->
          <v-dialog
            ref="dateDialog"
            v-model="modalDate"
            :return-value.sync="form.date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.date"
                label="义工日期"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="form.date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalDate = false">
                取消
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dateDialog.save(form.date)"
              >
                确认
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-dialog
            ref="timeDialog"
            v-model="modalTime"
            :return-value.sync="form.time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.time"
                label="义工时间"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modalTime" v-model="form.time" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalTime = false">
                取消
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.timeDialog.save(form.time)"
              >
                确定
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-text-field
            v-model="form.description"
            label="义工描述"
            prepend-icon="mdi-text"
          />
          <v-text-field
            v-model.number="form.inside"
            label="校内时长（分钟）"
            prepend-icon="mdi-view-list"
            @keyup.native.enter="createVolunteer"
          />
          <v-text-field
            v-model.number="form.outside"
            label="校外时长（分钟）"
            prepend-icon="mdi-view-list"
            @keyup.native.enter="createVolunteer"
          />
          <v-text-field
            v-model.number="form.large"
            label="大型时长（分钟）"
            prepend-icon="mdi-view-list"
            @keyup.native.enter="createVolunteer"
          />
        </v-form>
        <v-card-actions>
          <v-btn
            color="primary"
            block
            :disabled="$store.state.isLoading"
            @click="createVolunteer"
            >创建义工</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
    <br />
  </v-container>
</template>

<script>
import dialogs from "../../utils/dialogs";
import zutils from "../../utils/zutils";
import axios from "axios";
// import { NOTEMPTY } from "../..//utils/validation.js";

export default {
  data: () => ({
    classSelected: [],
    count_new: undefined,
    class_new: undefined,
    classes: undefined,
    modalDate: false,
    modalTime: false,
    form: {
      name: undefined,
      date: undefined,
      time: null,
      stuMax: undefined,
      description: undefined,
      inside: undefined,
      outside: undefined,
      large: undefined,
      class: undefined,
    },
    // rules: [NOTEMPTY()],
    mp: {}
  }),
  components: {},
  mounted: function () {
    this.pageload();
  },
  methods: {
    async pageload() {
      this.$store.commit("loading", true);
      await zutils.checkToken(this);
      await zutils.fetchClassList((classes) => {
        classes
          ? (this.classes = classes)
          : dialogs.toasts.error("获取班级列表失败");
      });
      for(let i = 0; i < this.classes.length; i ++)
        this.mp[this.classes[i].id] = this.classes[i].name;
      this.$store.commit("loading", false);
    },
    createVolunteer: function () {
      dialogs.confirm("",(value)=>{
        if(!value) return;
        if (this.$refs.form.validate()) {
          if ((this.form.name == undefined) || (this.form.name == "")){ dialogs.toasts.error("请输入义工名称"); return; }
          if ((this.form.description == undefined) || (this.form.description == "")){ dialogs.toasts.error("请输入义工描述"); return; }
          if ((this.form.stuMax != parseInt(this.form.stuMax)) || isNaN(parseInt(this.form.stuMax)) || parseInt(this.form.stuMax) <= 0){
              dialogs.toasts.error("请输入总人数"); return;
          }
          this.form.inside  = parseInt(this.form.inside);
          this.form.outside = parseInt(this.form.outside);
          this.form.large   = parseInt(this.form.large);
          if (this.form.inside  == undefined || isNaN(this.form.inside)  || this.form.inside  == "") this.form.inside  = 0;
          if (this.form.outside == undefined || isNaN(this.form.outside) || this.form.outside == "") this.form.outside = 0;
          if (this.form.large   == undefined || isNaN(this.form.large)   || this.form.large   == "") this.form.large   = 0;
          if ((this.form.inside == 0) && (this.form.outside == 0) && (this.form.large == 0)){
              dialogs.toasts.error("义工时间不能同时为0"); return;
          }
          
          this.$store.commit("loading", true);
          axios
            .post("/volunteer/create", {
              name: this.form.name,
              date: this.form.date,
              time: this.form.time,
              stuMax: parseInt(this.form.stuMax),
              description: this.form.description,
              inside: parseInt(this.form.inside),
              outside: parseInt(this.form.outside),
              large: parseInt(this.form.large),
              class: this.classSelected,
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.type == "SUCCESS") {
                dialogs.toasts.success(response.data.message);
                for(let k in this.form) this.form[k] = undefined;
                this.classSelected = [];
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
      });
    },
      addToList: function (){
        let flg = false;
        if (this.class_new == "") flg = true;
        if (isNaN(parseInt(this.count_new)) || parseInt(this.count_new)<=0) flg = true;
        for (let i in this.classSelected){
          console.log(i);
          if (this.classSelected[i]["id"] == this.class_new){
            flg = true;
            break;
          }
         }
        if (!flg)
          this.classSelected.push({"id": this.class_new, "stuMax": parseInt(this.count_new)});
        this.class_new = "";
        this.count_new = 0;
      },
      delFromList: function(i){
        this.classSelected.splice(i, 1);
      }
    },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>