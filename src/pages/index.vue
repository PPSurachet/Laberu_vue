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
          <div class="user">
            <div class="text-h6 text-center navUsername">
              {{ this.user_email }}
            </div>
          </div>
          <q-btn
            flat
            round
            dense
            icon="account_circle"
            class="text-blue-grey-7"
            size="20px"
          >
            <q-menu touch-position>
              <q-list style="min-width: 100px">
                <q-item v-close-popup>
                  <q-btn
                    class="profileBtn"
                    label="Profile"
                    @click="$router.push('/profile')"
                    size="md"
                    v-close-popup
                  />
                </q-item>
                <q-item v-close-popup>
                  <q-btn
                    color="red"
                    label="Logout"
                    @click="logout()"
                    size="md"
                    v-close-popup
                  />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </div>
    </q-header>
    <backgroundDisplay></backgroundDisplay>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="row justify-around">
          <div class="col-md-6">
            <q-card class="cardIMG" style="left: 20%">
              <q-card-section>
                <div class="row">
                  <div class="col">
                    <div class="imgNumber text-left" style="text-right">
                      Image#{{ this.user.count }}
                    </div>
                  </div>
                  <div class="col text-right">
                    <q-btn
                      color="primary"
                      label="SKIP"
                      @click="onSkip()"
                      class="btnSkip"
                      style="margin: 0 15px 0 0"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="q-pa-md">
                  <img
                    :src="this.image.url"
                    alt=""
                    class="imgMain"
                    width="100%"
                    height="auto"
                  />
                </div>
                <div class="imgID">
                  Image ID : {{ this.taskImage.shortcode }}
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card class="cardText" style="left: 15%">
              <q-card-actions vertical>
                <div style="max-width: 90% align-item-center" row="100">
                  <div style="margin-top: 0">
                    <q-list class="rounded-borders" style="max-width: 100%">
                      <q-expansion-item
                        label="Guide"
                        icon="link"
                        style="font-weight: bold; font-size: 16px"
                      >
                        <q-card style="padding: 0px 20px 10px 20px">
                          <q-card-section>
                            {{ this.dataImage.description_english }}
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </div>
                </div>
              </q-card-actions>
            </q-card>

            <q-card class="cardText" style="left: 15%; top: 3%">
              <q-card-section>
                <div class="text-h6 text-center">
                  <b>Describe the Image</b>
                </div>
              </q-card-section>
              <q-card-actions vertical>
                <div
                  class="q-pa-md"
                  style="max-width: 90% align-item-center"
                  row="100"
                >
                  <vue-tags-input 
                    v-model="taskSuccess.description"
                    :tags="tags"
                    @tags-changed="(newTags) => (tags = newTags)"
                  />
                  <div class="btnSave">
                    <q-btn class="btnColor" label="Save" @click="onSave()" />
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QSpinnerFacebook, QSpinnerHourglass } from "quasar";
import { mapGetters } from "vuex";
import backgroundDisplay from "../components/login_animation";
import Axios from "axios";
import Vue from "vue";
import IdleVue from "idle-vue";

import VueTagsInput from "@johmun/vue-tags-input";

const eventsHub = new Vue();

const options = {
  eventEmitter: eventsHub,
  idleTime: 1800000,
};

Vue.use(IdleVue, options);

export default {
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
    }),
  },
  components: {
    VueTagsInput,
    backgroundDisplay,
  },
  data() {
    return {
      tags: [],
      config: {
        url: "https://laberu-uag2fgef3q-as.a.run.app",
        // url: "http://localhost:8080",
        project_name: null,
        baseImageUrl: null,
        labelingCount: null,
        labelType: null,
        customerID: null,
      },
      user: {
        _id: null,
        name: null,
        count: null,
      },
      image: {
        url: null,
      },
      dataImage: {
        _id: null,
        shortcode: null,
        description_english: null,
      },
      taskImage: {
        _id: null,
        shortcode: null,
        status: null,
        process: null,
      },
      taskSuccess: {
        _id: null,
        shortcode: null,
        description: "",
        time_start: null,
        time_stop: null,
        user_id: null,
        task_id: null,
      },
    };
  },
  async onIdle() {
    await this.updateStatusTask(false, 0);
    this.logout();
  },
  // async mounted() {
  //   await this.configProject();
  //   await this.setUserData();
  //   await this.initState();
  // },
  methods: {
    async initState() {
      this.showLoading();
      if ((this.user_id != null) & (this.user_id != "")) {
        if (await this.checkDone()) {
          if (await this.getImageByUser()) {
            await this.getUserTaskSuccess();
            await this.updateStatusTask(true, Date.now());
            await this.setImageData();
            this.onTimeout();
          } else {
            this.onTimeout();
            this.showMessage();
          }
        } else {
          this.onTimeout();
          this.showMessage();
        }
      } else {
        this.onTimeout();
        this.$router.push("/");
      }
    },
    async configProject() {
      const configProject = await Axios.get(`${this.config.url}/project`);

      this.config.project_name = configProject.data[0].project_name;
      this.config.baseImageUrl = configProject.data[0].baseImageUrl;
      this.config.labelingCount = configProject.data[0].labelingCount;
      this.config.labelType = configProject.data[0].labelType;
      this.customerID = configProject.data[0].customerID;
    },
    async setUserData() {
      this.user.name = this.user_login;
      this.user._id = this.user_id;
    },
    async checkDone() {
      try {
        const responseImage = await Axios.get(
          `${this.config.url}/image-data/getCountImage`
        );
        const responseTaskImage = await Axios.get(
          `${this.config.url}/task-image/getCountTaskSuccess`
        );
        if (responseTaskImage.data < responseImage.data) {
          await this.resetStatusTask();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getImageByUser() {
      try {
        const response = await Axios.get(
          `${this.config.url}/task-image/findImage/${this.user._id}`
        );

        if (response.data[0] != null) {
          this.image.url = `${this.config.baseImageUrl}${response.data[0].shortcode}.jpg`;
          this.taskImage._id = response.data[0]._id;
          this.taskImage.shortcode = response.data[0].shortcode;
          this.taskImage.status = response.data[0].status;
          this.taskImage.process = response.data[0].process;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setImageData() {
      try {
        const response = await Axios.get(
          `${this.config.url}/image-data/${this.taskImage.shortcode}`
        );
        this.dataImage._id = response.data[0]._id;
        this.dataImage.shortcode = response.data[0].shortcode;
        this.dataImage.description_english =
          response.data[0].description_english;
        this.taskSuccess.time_start = Date.now();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatusTask(inputStatus, timeStamp) {
      try {
        await Axios.put(
          `${this.config.url}/task-image/update_status/${this.taskImage._id}`,
          {
            time_start: timeStamp,
            status: inputStatus,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getUserTaskSuccess() {
      const response = await Axios.get(
        `${this.config.url}/task-success/findByUser/${this.user._id}/true`
      );
      this.user.count = response.data;
    },
    async onSkip() {
      await this.initState();
    },
    async onSave() {
      const newTags = [];
      this.tags.forEach((data) => newTags.push(data.text));
      const desciptionTags = newTags.join(" ");
      if (this.taskSuccess.description != null) {
        try {
          await Axios.post(`${this.config.url}/task-success/create`, {
            shortcode: this.taskImage.shortcode,
            description: desciptionTags,
            time_start: this.taskSuccess.time_start,
            time_stop: Date.now(),
            accept: true,
            user_id: this.user._id,
            task_id: this.taskImage._id,
          });
          await this.updateStatusTask(false, 0);
          await this.checkConfig();
          this.taskSuccess.description = "";
          this.tags = [];
          this.initState();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณากรอกข้อมูลในพื้นที่ที่กำหนด",
        });
      }
    },
    async checkConfig() {
      const countSuccess = await Axios.get(
        `${this.config.url}/task-success/findCountByShortcode/${this.taskImage.shortcode}`
      );
      if (countSuccess.data == Number(this.config.labelingCount)) {
        try {
          await Axios.put(
            `${this.config.url}/task-image/update_process/${this.taskImage._id}`,
            {
              time_start: 0,
              status: true,
              process: true,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    async goProfilePage() {
      await this.updateStatusTask(false);
      this.$router.push("/Profile");
    },
    async resetStatusTask() {
      try {
        await Axios.put(`${this.config.url}/task-image/reset_status_all`, {
          time_start: 0,
          status: false,
          process: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {});
    },
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        spinnerColor: "white",
        spinnerSize: 180,
        backgroundColor: "indigo-11",
      });
    },
    showMessage() {
      this.$q
        .dialog({
          title: "Alert",
          message: "งานเสร๊จหมดแล้วจ้า ไม่มีงานให้ทำแล้ววววววว",
        })
        .onOk(() => {
          this.$router.push("/");
        })
        .onCancel(() => {
          this.$router.push("/");
        })
        .onDismiss(() => {
          this.$router.push("/");
        });
    },
    onTimeout() {
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 600);
    },
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
};
</script>

<style scoped src="../css/index.css">
vue-tags-input{
  background-color: rgb(0, 230, 57);
    color: rgb(255, 255, 255);
    
}
</style>


