<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="text-white toolbarT">
        <q-toolbar class="row full-height justify-center">
          <q-btn flat>
            <q-icon name="laberu" />
            <q-toolbar-title class="titleName"
              ><strong>LABERU.AI</strong>
            </q-toolbar-title>
          </q-btn>
          <q-space />
          <div class="user">
            <div class="text-h6 text-center navUsername">
              {{ this.user.name }}
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
                    color="amber"
                    label="HISTORY"
                    push
                    @click="goHistoryPage()"
                    size="md"
                    v-close-popup
                  />
                </q-item>
                <q-item v-close-popup>
                  <q-btn
                    color="red"
                    label="Logout"
                    push
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
                      Image#01
                    </div>
                  </div>
                  <div class="col text-right">
                    <q-btn
                      color="primary"
                      label="SKIP"
                      class="btnSkip"
                      style="margin: 0 15px 0 0"
                      @click="onSkip()"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="q-pa-md" style="text-align: center">
                  <div style="font-weight: bold; font-size: 50px">
                    {{ dataImage.shortcode }}
                  </div>
                  <!-- <q-img
                    src="../images/image_1.jpg"
                    alt=""
                    class="imgMain"
                    width="100%"
                    height="auto"
                  /> -->
                </div>
                <div class="imgID"></div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card class="cardText" style="left: 15%">
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
                  <q-input
                    class="textDescribe"
                    v-model="taskSuccess.caption"
                    filled
                    type="textarea"
                    placeholder="โปรดใส่คำอธิบายรูปภาพ"
                  />
                </div>

                <div class="btnSave">
                  <q-btn class="btnColor" label="SAVE" @click="onSave()" />
                </div>
              </q-card-actions>
            </q-card>
            <!-- <q-card class="cardProfile" style="left: 15%">
              <q-card-section>
                <div class="text-h6 text-center"><b>Profile</b></div>
              </q-card-section>
              <q-card-actions vertical>
                <div class="row" style="padding-bottom:20px">
                  <div class="col-4">
                    <div class="row">
                      <q-icon name="fas fa-images" class="ProfileIMG" />
                      <div class="detail">x 155</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <q-icon name="fas fa-wallet" class="ProfileIMG" />
                      <div class="detail">8080 Baht</div>
                    </div>
                  </div>
                </div>
              </q-card-actions>
            </q-card> -->
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QSpinnerFacebook } from "quasar";
import { mapGetters } from "vuex";
import backgroundDisplay from "../components/login_animation";
import Axios from "axios";

export default {
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
    }),
  },
  components: {
    backgroundDisplay,
  },
  data() {
    return {
      config: {
        people: 2,
      },
      user: {
        _id: null,
        name: null,
      },
      dataImage: {
        _id: null,
        shortcode: null,
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
        caption: null,
        time_start: null,
        time_stop: null,
        user_id: null,
        task_id: null,
      },
    };
  },
  async mounted() {
    await this.setUserData();
    await this.initState();
  },
  methods: {
    async initState() {
      this.showLoading();
      if ((this.user_id != null) & (this.user_id != "")) {
        if (await this.checkDone()) {
          if (await this.getImageByUser()) {
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
    async setUserData() {
      this.user.name = await this.user_login;
      this.user._id = await this.user_id;
    },
    async checkDone() {
      try {
        const responseImage = await Axios.get(
          "http://localhost:8080/image-data/getCountImage"
        );
        const responseTaskImage = await Axios.get(
          "http://localhost:8080/task-image/getCountTaskSuccess"
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
          `http://localhost:8080/task-image/findImage/${this.user._id}`
        );

        if (response.data[0] != null) {
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
          `http://localhost:8080/image-data/${this.taskImage.shortcode}`
        );
        this.dataImage._id = response.data[0]._id;
        this.dataImage.shortcode = response.data[0].shortcode;
        this.taskSuccess.time_start = Date.now();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatusTask(inputStatus, timeStamp) {
      try {
        await Axios.put(
          `http://localhost:8080/task-image/update_status/${this.taskImage._id}`,
          {
            time_start: timeStamp,
            status: inputStatus,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async onSkip() {
      await this.initState();
    },
    async onSave() {
      try {
        await Axios.post(`http://localhost:8080/task-success/create`, {
          shortcode: this.taskImage.shortcode,
          caption: this.taskSuccess.caption,
          time_start: this.taskSuccess.time_start,
          time_stop: Date.now(),
          user_id: this.user._id,
          task_id: this.taskImage._id,
        });

        await this.updateStatusTask(false, 0);
        await this.checkConfig();
        this.taskSuccess.caption = null;
        this.initState();
      } catch (error) {
        console.log(error);
      }
    },
    async checkConfig() {
      const countSuccess = await Axios.get(
        `http://localhost:8080/task-success/findCountByShortcode/${this.taskImage.shortcode}`
      );
      if (countSuccess.data == this.config.people) {
        try {
          await Axios.put(
            `http://localhost:8080/task-image/update_process/${this.taskImage._id}`,
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
    async goHistoryPage() {
      await this.updateStatusTask(false);
      this.$router.push("/History");
    },
    async resetStatusTask() {
      try {
        await Axios.put("http://localhost:8080/task-image/reset_status_all", {
          time_start: 0,
          status: false,
          process: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "yellow",
        spinnerSize: 180,
        backgroundColor: "blue-8",
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
      }, 500);
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

<style>
.navUsername {
  color: black;
}
.imgNumber {
  padding: 5px 0 0 15px;
  font-weight: bold;
  font-size: 18px;
}
.imgID {
  padding: 0 15px 0 0;
  text-align: right;
  font-size: 10px;
}

.detail {
  padding: 5px 0 0 20px;
  font-weight: bold;
  font-size: 18px;
}
.ProfileIMG {
  color: black;
  padding: 0 0 0 50px;

  font-size: 40px;
}
.iconIMG {
  font-size: 50px;
  padding: 0 0 0 50px;
}
.cardIMG {
  width: 700px;
  border-radius: 10px;
}
.cardText {
  width: 500px;
  border-radius: 10px;
}
.cardProfile {
  margin: 30px 0 0 0;
  width: 500px;
  height: 200px;
  border-radius: 10px;
}

.imgMain {
  width: 100%;
  border-radius: 5px;
}

.imgID {
  margin: -10px 0 0 0;
  font-size: 10px;
}

.q-pa-md {
  padding: 16px 16px;
  margin: -20px 0 0 0;
}

.btnSkip {
  border-radius: 5px;
  font-size: 12px;
  width: 20%;
  height: 90%;
}
.btnColor {
  width: 90%;
  background-color: #6bce2e;
  color: white;
}

.textDescribe {
  resize: none !important;
}
.q-textarea .q-field__native {
  resize: none;
  padding-top: 17px;
  min-height: 52px;
}

.btnSave {
  padding: 10px 10px 10px 10px;
  text-align: center;
}

.toolbarT {
  height: 80px;
  background: #f8f8f8;
}

.titleName {
  color: #666877;
}

.my-card {
  width: 400px;
  border-radius: 10px;
}

.context {
  width: 100%;
  position: absolute;
  top: 10rem;
}

.area {
  background: #e6e8ea;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(94, 51, 51, 0.24);
  animation: animate 25s linear infinitStatee;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.iconic {
  /* Group 65 */

  position: absolute;
  width: 30px;
  height: 30px;

  box-shadow: inset 0px 0px 62px rgba(0, 0, 0, 0.25);

  /* Ellipse 74 */

  position: absolute;
  width: 30px;
  height: 30px;

  background: #6d6b8a;

  /* Group 64 */

  position: absolute;
  width: 16.62px;
  height: 19.56px;

  /* Rectangle 128 */

  position: absolute;
  width: 1.8px;
  height: 15.21px;

  background: #d15eff;
  border-radius: 3px;

  /* Rectangle 130 */

  position: absolute;
  width: 1.8px;
  height: 10.37px;

  background: #d15eff;
  border-radius: 3px;

  /* Rectangle 132 */

  position: absolute;
  width: 1.8px;
  height: 6.57px;

  background: #d15eff;
  border-radius: 3px;

  /* Rectangle 129 */

  position: absolute;
  width: 1.8px;
  height: 5.65px;

  background: #d15eff;
  border-radius: 3px;
  transform: rotate(-90deg);

  /* Rectangle 131 */

  position: absolute;
  width: 2.18px;
  height: 16.62px;

  background: #d15eff;
  border-radius: 3px;
  transform: rotate(-90deg);

  /* Rectangle 133 */

  position: absolute;
  width: 1.8px;
  height: 16.62px;

  background: #d15eff;
  border-radius: 3px;
  transform: rotate(-90deg);
}
</style>
