<template>
  <div>
    <label for="tags-pills">
      <!-- Enter new tags separated by space at least 5 word -->
      {{ this.value }}
    </label>
    <b-form-tags
      input-id="tags-remove-on-delete"
      :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
      v-model="value"
      tag-variant="primary"
      tag-pills
      separator=" "
      placeholder="Add word"
      remove-on-delete
      no-add-on-enter
    ></b-form-tags>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

export default {
  data() {
    return {
      value: [],
    };
  },
  methods: {},
};
</script>


<style scoped lang="scss">
::v-deep {
  @import "bootstrap/scss/bootstrap.scss";
}
</style>