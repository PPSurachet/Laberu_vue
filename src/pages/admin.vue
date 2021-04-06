<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="text-white toolbarT">
        <q-toolbar class="row full-height justify-center">
          <q-btn flat>
            <q-icon name="img:../icons/icon.png" size="3rem" />
            <q-toolbar-title class="titleName" style="padding: 0px">
              <strong>LABERU.AI</strong>
            </q-toolbar-title>
          </q-btn>
          <q-space />
        </q-toolbar>
      </div>
    </q-header>
    <backgroundDisplay></backgroundDisplay>

    <div class="q-pa-md" style="padding: 8rem 12rem 0rem 12rem">
      <div class="q-gutter-y-md" style="max-width: auto">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab class="text-orange" name="users" label="User" />
            <q-tab
              class="text-teal text-h3"
              name="images"
              label="Coming Soon"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            class="bg-white text-black"
            transition-prev="scale"
            transition-next="scale"
          >
            <q-tab-panel name="users">
              <Usertabs></Usertabs>
            </q-tab-panel>

            <q-tab-panel name="images">
              <div class="text-h6 text-center">Coming Soon</div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>
<script>
import Axios from "app/node_modules/axios";
import backgroundDisplay from "../components/admin/adminBG";
import { mapGetters } from "vuex";
import Usertabs from "../components/admin/user_tabs.vue";
export default {
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
    }),
  },
  components: {
    backgroundDisplay,
    Usertabs,
  },
  data() {
    return {
      tab: "users",
    };
  },
  async mounted() {
    // await this.checkStatusAdmin();
  },
};
</script>

<style scoped src="../css/admin.css">
</style>