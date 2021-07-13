<template>
  <v-container>
    <v-card>
      <v-card-title> 创建义工 </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="form.name"
            :rules="rules"
            label="义工名称"
            prepend-icon="mdi-pen"
          />
          <v-select
            prepend-icon="mdi-switch"
            v-model="form.class"
            label="限定班级"
            :rules="rules"
            :items="classes"
            item-text="name"
            item-value="id"
          ></v-select>
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
                :rules="rules"
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
                :rules="rules"
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
            v-model="form.stuMax"
            :rules="rules"
            label="义工人数"
            prepend-icon="mdi-account"
          />
          <v-text-field
            v-model="form.description"
            :rules="rules"
            label="义工描述"
            prepend-icon="mdi-text"
          />
          <v-text-field
            v-model="form.inside"
            :rules="rules"
            label="校内时长"
            prepend-icon="mdi-view-list"
          />
          <v-text-field
            v-model="form.outside"
            :rules="rules"
            label="校外时长"
            prepend-icon="mdi-view-list"
          />
          <v-text-field
            v-model="form.large"
            :rules="rules"
            label="大型时长"
            prepend-icon="mdi-view-list"
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
import { NOTEMPTY } from "../..//utils/validation.js";

export default {
  data: () => ({
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
    rules: [NOTEMPTY()],
  }),
  components: {},
  mounted: function () {
    this.pageload();
  },
  methods: {
    async pageload() {
      await zutils.fetchClassList((classes) => {
        classes
          ? (this.classes = classes)
          : dialogs.toasts.error("获取班级列表失败");
      });
      this.$store.commit("loading", false);
    },
    createVolunteer: function () {
      if (this.$refs.form.validate()) {
        console.log("创建义工");
        console.log(this.form);
        this.$store.commit("loading", true);
        axios
          .post("/volunteer/create", {
            name: this.form.name,
            date: this.form.date,
            time: this.form.time,
            stuMax: this.form.stuMax,
            description: this.form.description,
            inside: this.form.inside,
            outside: this.form.outside,
            large: this.form.large,
            class: this.form.class,
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
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>