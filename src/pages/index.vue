<template>
  <q-page>
    <q-dialog
      v-model="inform.persistentMaxDone"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-blue-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Inform</div>
        </q-card-section>
        <q-card-section class="q-pt-none"> Completed </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="onLogout"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row q-pa-sm">
      <div class="col-1">
        <q-input standout v-model="taskManager.no" label="NO" readonly />
      </div>
      <div class="col-2">
        <q-input
          standout
          v-model="data.shortCode"
          label="Short Code"
          readonly
        />
      </div>
      <div class="col-7"></div>
      <div class="col-2">
        <q-input
          standout
          v-model="login.userLogin"
          label="User login"
          readonly
        />
      </div>
    </div>

    <div class="row justify-center items-center">
      <div class="col-5 text-center">
        <q-img
          :src="data.imageSrc"
          style="height: 720px; max-width: 720px"
          native-context-menu
        >
          <q-icon
            class="absolute all-pointer-events"
            size="32px"
            name="info"
            color="white"
            style="top: 8px; left: 8px"
          >
            <q-tooltip>Tooltip</q-tooltip>
          </q-icon>
        </q-img>
      </div>

      <div class="col-5 text-center">
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 bg-info items-start">
            <div class="row">
              <div class="col-0.5 text-center">
                <a target="_blank" :href="data.imageIG"
                  ><img
                    src="~assets/logo_ig.png"
                    style="height: 50px; max-width: 50px"
                /></a>
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="data.userName"
                  readonly
                  label="Username"
                  stack-label
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="data.fullName"
                  readonly
                  label="Fullname"
                  stack-label
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="data.locationName"
                  readonly
                  label="Location Name"
                  stack-label
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="data.captionText"
                  readonly
                  type="textarea"
                  label="Caption Text"
                  stack-label
                />
              </div>
            </div>
          </div>
          <div class="col-2"></div>
        </div>

        <div class="row"></div>
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 bg-info items-start">
            <q-btn-toggle
              v-model="toggle.advertisement"
              spread
              no-caps
              toggle-color="purple"
              color="white"
              text-color="black"
              :options="[
                { label: 'Advertisement', value: true },
                { label: 'Not Advertisement', value: false },
              ]"
              @click="onCheckToggle"
            />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 bg-info items-start">
            <q-btn-toggle
              v-model="toggle.tourism"
              spread
              no-caps
              toggle-color="pink"
              color="white"
              text-color="black"
              :options="[
                { label: 'Tourism', value: true },
                { label: 'Not Tourism', value: false },
              ]"
              @click="onCheckToggle"
            />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 text-center">
            <q-btn
              color="green-6"
              class="full-width"
              label="Save"
              @click="onSave"
            />
          </div>
        </div>
        <div class="row q-mt-sm"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { QSpinnerFacebook } from "quasar";
export default {
  name: "PageIndex",
  computed: {
    ...mapGetters({
      user_login: "user_login/user_login",
    }),
  },
  data() {
    return {
      login: {
        userLogin: null,
      },
      taskManager: {
        massage: null,
        no: null,
      },
      data: {
        imageSrc: null,
        imageIG: null,
        shortCode: null,
        fullName: null,
        userName: null,
        locationName: null,
        captionText: null,
      },
      classification: {
        shortCode: null,
        ads: null,
        tourist: null,
        timeStart: null,
        timeStop: null,
        userId: null,
        status: null,
        no: null,
      },
      toggle: {
        advertisement: null,
        tourism: null,
      },
      inform: {
        persistentMaxDone: false,
      },
      timer: 0,
    };
  },
  async mounted() {
    this.login.userLogin = this.user_login;
    console.log("User Login : ", this.login.userLogin);
    this.init();
  },
  methods: {
    async init() {
      this.showLoading();
      this.toggle.advertisement = null;
      this.toggle.tourism = null;
      await this.getHelpTaskManager();
      if (this.taskManager.massage == "Data") {
        console.log(this.taskManager.massage);
        console.log(this.taskManager.no);
        await this.getHelpClassification();
        await this.putHelpClassificationStart();
        await setTimeout(await this.display, 500);
      } else if (this.taskManager.massage == "Reset_Status") {
        console.log(this.taskManager.massage);
        await this.putHelpClassificationSetStatusAll();
        await this.init();
      } else if (this.taskManager.massage == "Completed") {
        console.log(this.taskManager.massage);
        await this.onTimeout();
        this.inform.persistentMaxDone = true;
      }
    },

    async display() {
      await this.getHelpClassification();
      if (this.classification.userId == this.login.userLogin) {
        await this.getHelpData();
        await this.onTimeout();
      } else {
        await this.init();
      }
    },

    // >> TaskManager
    async getHelpTaskManager() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpTaskManager"
        );
        this.taskManager.massage = response.data.massage;
        this.taskManager.no = response.data.no;
      } catch (e) {
        console.log(e);
      }
    },

    // >> Data
    async getHelpData() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpData/" +
            this.classification.shortCode
        );
        this.data.imageSrc =
          "https://storage.cloud.google.com/instagram_phuket/post_image/" +
          response.data.shortCode +
          ".jpg";
        this.data.imageIG =
          "https://www.instagram.com/" + response.data.username;
        this.data.shortCode = response.data.shortCode;
        this.data.fullName = response.data.fullname;
        this.data.userName = response.data.username;
        this.data.locationName = response.data.locationName;
        this.data.captionText = response.data.captionText;
      } catch (e) {
        console.log(e);
      }
    },

    // >> Classification
    async getHelpClassification() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/" +
            this.taskManager.no
        );
        this.classification.shortCode = response.data.shortCode;
        this.classification.ads = response.data.isAds;
        this.classification.tourist = response.data.isTourist;
        this.classification.timeStart = response.data.timeStart;
        this.classification.timeStop = response.data.timeStop;
        this.classification.userId = response.data.userId;
        this.classification.status = response.data.status;
        this.classification.no = response.data.no;
      } catch (e) {
        console.log(e);
      }
    },

    async putHelpClassificationStart() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/Start/" +
            this.taskManager.no,
          {
            ShortCode: this.classification.shortCode,
            IsAds: this.classification.ads,
            IsTourist: this.classification.tourist,
            TimeStart: 0,
            TimeStop: 0,
            UserId: this.login.userLogin,
            Status: true,
            No: this.classification.no,
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async putHelpClassificationStop() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/Stop/" +
            this.taskManager.no,
          {
            ShortCode: this.classification.shortCode,
            IsAds: this.toggle.advertisement,
            IsTourist: this.toggle.tourism,
            TimeStart: this.classification.timeStart,
            TimeStop: 0,
            UserId: this.classification.userId,
            Status: this.classification.status,
            No: this.classification.no,
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async putHelpClassificationSetStatusAll() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/SetStatusAll"
        );
      } catch (e) {
        console.log(e);
      }
    },

    // >> Button
    async onSave() {
      console.log("onSave");
      if (this.toggle.advertisement == null && this.toggle.tourism == null) {
        console.log("Do nothing");
      } else {
        console.log("Doen");
        await this.getHelpClassification();
        await this.putHelpClassificationStop();
        await this.init();
      }
    },

    onCheckToggle() {
      if (this.toggle.advertisement == true) {
        this.toggle.tourism = false;
      } else if (this.toggle.tourism == true) {
        this.toggle.advertisement = false;
      } else if (this.toggle.advertisement == false) {
        this.toggle.tourism = false;
      } else if (this.toggle.tourism == false) {
        this.toggle.advertisement = false;
      }
    },

    onLogout() {
      console.log("Logout");
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push({ name: "signin", params: { nextUrl: "/home" } });
        })
        .catch((error) => {
          // An error happened.
        });
    },

    onTimeout(){
      this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
        }, 500);
    },

    // >> Loading
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "yellow",
        spinnerSize: 140,
        backgroundColor: "blue-8",
      });
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
html,
body {
  height: 100%;
}
body {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 254, 234, 1) 0%,
    rgba(255, 254, 234, 1) 35%,
    #b7e8eb 100%
  );
  overflow: hidden;
}
</style>
