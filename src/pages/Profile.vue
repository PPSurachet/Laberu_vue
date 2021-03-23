<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="text-white toolbarT">
        <q-toolbar class="row full-height justify-center">
          <q-btn flat @click="$router.push('/index')">
            <q-icon name="img:../icons/icon.png" size="3rem" />
            <q-toolbar-title class="titleName" style="padding: 0px">
              <strong>LABERU.AI</strong>
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
    <background-display></background-display>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="fixed-center">
          <q-card class="profileCard">
            <q-card-section>
              <div class="row items-center justify-between">
                <q-btn @click="$router.push('/index')" round v-close-popup >
                  <q-icon class="backBtn" name="img:../icons/unknown.png" size="3rem" v-close-popup />
                </q-btn>
              <div class="profileLabel">ข้อมูลส่วนตัว</div>
              <div style="width:64px;height:64px"></div>
              </div>
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
                <div class="col-2 paddingCol">
                  <div class="profileBG">{{ this.userData.age }}</div>
                </div>
                <div class="col-4 paddingCol">
                  <div class="profileBG">{{ this.userData.phone_number }}</div>
                </div>
                <div class="col-6 paddingCol">
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
                  <div class="declineText">
                    ปฏิเสธ : {{ this.userData.countNotSuccess }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col paddingCol">
                  <div class="totalMoneyText">
                    เป็นเงินสุทธิ : {{ this.userData.countSuccess * 0.75 }} ฿
                  </div>
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
      config: {
        url: "https://laberu-uag2fgef3q-as.a.run.app",
        // url: "http://localhost:8080",
      },
      userData: {
        _id: null,
        fname: null,
        lname: null,
        age: null,
        phone_number: null,
        email: null,
        countSuccess: null,
        countNotSuccess: null,
      },
    };
  },
  components: {
    backgroundDisplay,
  },
  // async mounted() {
  //   await this.getUserData();
  //   await this.getUserTaskSuccess();
  // },
  methods: {
    async getUserData() {
      const response = await Axios.get(
        `${this.config.url}/user/check_login/${this.user_uid}`
      );

      this.userData._id = response.data[0]._id;
      this.userData.fname = response.data[0].fname;
      this.userData.lname = response.data[0].lname;
      this.userData.age = response.data[0].age;
      this.userData.email = response.data[0].email;
      this.userData.phone_number = response.data[0].phone_number;
    },

    async getUserTaskSuccess() {
      const success = await Axios.get(
        `${this.config.url}/task-success/findByUser/${this.userData._id}/true`
      );

      const notSuccess = await Axios.get(
        `${this.config.url}/task-success/findByUser/${this.userData._id}/false`
      );
      this.userData.countSuccess = success.data;
      this.userData.countNotSuccess = notSuccess.data;
    },

    logout() {
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped src="../css/profile.css">

</style>