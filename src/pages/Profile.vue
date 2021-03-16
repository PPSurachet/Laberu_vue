<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="text-white toolbarT">
        <q-toolbar class="row full-height justify-center">
          <q-btn flat @click="$router.push('/index')">
            <q-icon name="laberu" />
            <q-toolbar-title class="titleName"
              ><strong>LABERU.AI</strong>
            </q-toolbar-title>
          </q-btn>
          <q-space />
          <div class="user">
            <div class="text-h6 text-center navUsername">
              {{ this.userData.email }}
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
                    @click="$router.push('/profile')"
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
    <background-display></background-display>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="fixed-center">
          <q-card class="profileCard">
            <q-card-section>
              <div class="profileLabel">ข้อมูลส่วนตัว</div>
            </q-card-section>
            <div class="col-12">
              <div class="row">
                <div class="col paddingCol">
                  <div class="profileBG">{{ this.userData.fname }}</div>
                </div>
                <div class="col paddingCol">
                  <div class="profileBG">{{ this.userData.lname }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col-2 paddingAge">
                  <div class="profileBG">{{ this.userData.age }}</div>
                </div>
                <div class="col-4 paddingTel">
                  <div class="profileBG">{{ this.userData.phone_number }}</div>
                </div>
                <div class="col-6 paddingEmail">
                  <div class="profileBG">{{ this.userData.email }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col paddingCol">
                  <div class="profileBG">???????????????????????</div>
                </div>
              </div>

              <div class="row">
                <div class="col paddingCol">
                  <div class="totalText">
                    ยอดรวมทั้งหมด : {{ this.userData.countSuccess }}
                  </div>
                </div>
                <div class="col paddingCol">
                  <div class="acceptText">
                    ยอมรับ : {{ this.userData.countSuccess }}
                  </div>
                </div>
                <div class="col paddingCol">
                  <div class="declineText">ปฏิเสธ : 0</div>
                </div>
              </div>
              <div class="row">
                <div class="col paddingCol">
                  <div class="totalMoneyText">เป็นเงินสุทธิ : 1500 ฿</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import Axios from "app/node_modules/axios";
export default {
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
      user_uid: "user_uid/user_uid",
    }),
  },
  data() {
    return {
      userData: {
        _id: null,
        fname: null,
        lname: null,
        age: null,
        phone_number: null,
        email: null,
        countSuccess: null,
      },
    };
  },
  components: {
    backgroundDisplay,
  },
  async mounted() {
    await this.getUserData();
    await this.getUserTaskSuccess();
  },
  methods: {
    async getUserData() {
      const response = await Axios.get(
        `http://localhost:8080/user/check_login/${this.user_uid}`
      );

      this.userData._id = response.data[0]._id;
      this.userData.fname = response.data[0].fname;
      this.userData.lname = response.data[0].lname;
      this.userData.age = response.data[0].age;
      this.userData.email = response.data[0].email;
      this.userData.phone_number = response.data[0].phone_number;
    },

    async getUserTaskSuccess() {
      const response = await Axios.get(
        `http://localhost:8080/task-success/findByUser/${this.userData._id}`
      );
      console.log(response.data.length);
      this.userData.countSuccess = response.data.length;
    },
  },
};
</script>

<style>
.totalMoneyText {
  text-align: right;
  font-weight: bold;
  font-size: 14px;
}
.acceptText {
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}
.declineText {
  text-align: right;
  font-weight: bold;
  font-size: 14px;
}
.totalText {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
.profileBG {
  color: #6a6969;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  background-color: #e3dcdc;
}
.profileLabel {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.navUsername {
  color: black;
}
.paddingAge {
  padding: 5px 0px 5px 30px;
}
.paddingTel {
  padding: 5px 30px 5px 10px;
}
.paddingEmail {
  padding: 5px 30px 5px 30px;
}
.paddingCol {
  padding: 15px 30px 15px 30px;
}
.profileCard {
  border-radius: 10px;
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