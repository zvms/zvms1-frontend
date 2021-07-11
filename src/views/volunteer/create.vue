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
            prepend-icon="mdi-view-list"
          />

          <v-dialog
            ref="dialog"
            v-model="modal"
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
              <v-btn text color="primary" @click="modal = false">
                取消
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(form.date)">
                确认
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-text-field
            v-model="form.time"
            :rules="rules"
            label="义工时间"
            prepend-icon="mdi-view-list"
          />
          <v-text-field
            v-model="form.stuMax"
            :rules="rules"
            label="义工人数"
            prepend-icon="mdi-view-list"
          />
          <v-text-field
            v-model="form.description"
            :rules="rules"
            label="义工描述"
            prepend-icon="mdi-view-list"
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
          <v-text-field
            v-model="form.class"
            :rules="rules"
            label="限定班级"
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
  </v-container>
</template>

<script>
import { NOTEMPTY } from "../..//utils/validation.js";

export default {
  data: () => ({
    modal: false,
    form: {
      name: undefined,
      date: undefined,
      time: undefined,
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
  mounted: function () {},
  methods: {
      createVolunteer: function(){
          console.log("创建义工");
          console.log(this.form)
      }
  },
};
</script>

<style scoped>
.v-card {
  margin: 0.3rem;
}
</style>