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
        </q-toolbar>
      </div>
    </q-header>
    <background-display></background-display>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="fixed-center">
          <q-card class="regisCard">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="fname"
                    label="Name"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div style="margin: 0 10px"></div>
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="lname"
                    label="Surname"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    type="number"
                    label-color="primary"
                    outlined
                    v-model="age"
                    label="Age"
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Please type your age',
                      (val) =>
                        (val > 0 && val < 100) || 'Please type a real age',
                    ]"
                  >
                  </q-input>
                </div>
                <div style="margin: 0 10px"></div>
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="phone_number"
                    label="Phone number"
                    :rules="[
                      (val) =>
                        (val && val.length >= 10) || 'Please type something',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="phone" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>
              <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              />
              <div class="regisCol" align="center">
                <q-btn
                  class="q-mt-xs btnRegis"
                  type="submit"
                  outline
                  color="primary"
                  label="REGISTER"
                />
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { QSpinnerFacebook } from "quasar";
import Axios from "app/node_modules/axios";
export default {
  computed: {
    ...mapGetters({
      user_uid: "user_uid/user_uid",
      user_email: "user_email/user_email",
    }),
  },
  data() {
    return {
      config: {
        url: "https://laberu-ptrmd2zvzq-as.a.run.app",
        // url: "http://localhost:8080",
      },
      fname: null,
      lname: null,
      age: null,
      phone_number: null,
      accept: false,
    };
  },
  components: {
    backgroundDisplay,
  },
  methods: {
    ...mapActions({
      setUserID: "user_id/setUserID",
    }),
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });

        this.showLoading();
        this.createAccount();
      }
    },
    async createAccount() {
      try {
        await Axios.post(`${this.config.url}/user/create`, {
          fname: this.fname,
          lname: this.lname,
          email: this.user_email,
          age: this.age,
          phone_number: this.phone_number,
          uid: this.user_uid,
        }).then(async (response) => {
          this.onTimeout();
          await this.getUserID();
          this.$router.push("/tutorial");
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getUserID() {
      try {
        const response = await this.$axios.get(
          `${this.config.url}/user/check_login/${this.user_uid}`
        );
        this.setUserID({ id: response.data[0]._id });
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

<style>
.btnRegis {
  display: block;
  width: 50%;
  height: 3rem;
  border: none;
  padding: 0px 28px;
  cursor: pointer;
}
.regisCol {
  padding: 0px 0 0 0;
}
.regisText {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
}
.navUsername {
  color: black;
}
.paddingCol {
  padding: 15px 30px 15px 30px;
}
.regisCard {
  width: 700px;
  padding: 30px 30px 30px 30px;
}
.q-pa-md {
  padding: 16px 16px;
  margin: -20px 0 0 0;
}
.q-textarea .q-field__native {
  resize: none;
  padding-top: 17px;
  min-height: 52px;
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
  animation: animate 25s linear infinite;
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