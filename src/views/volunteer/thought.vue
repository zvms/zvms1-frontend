<template>
  <v-container>
    <v-card>
      <v-card-title>义工感想提交</v-card-title>
      <v-card-text>
		<v-form ref="form">
          <v-select
            prepend-icon="mdi-switch"
            v-model="stu"
            label="选定学生"
            :items="stulst"
            item-text="name"
            item-value="id"
          >
          </v-select>
		  <v-textarea
		    v-model="thought"
		  >
		  </v-textarea>
		</v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit">
          <v-icon left>mdi-account-plus</v-icon>
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import dialogs from "../../utils/dialogs.js";
import zutils from "../../utils/zutils.js";
import axios from "axios";

export default {
  data: () => ({
	stu: undefined,
	thought: undefined
  }),
  mounted: function () {
    this.pageload();
  },
  methods: {
    pageload: function() {
      this.switchDisplay();
    },
	submit: function() {
      axios.post()
	}
  },
};
</script>