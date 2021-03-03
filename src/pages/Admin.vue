<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-10"></div>
      <div class="col-2">
        <q-input
          standout
          v-model="login.userLogin"
          label="User login"
          readonly
        />
      </div>
    </div>
    <div class="row q-pa-sm">
      <div class="col-11"></div>
      <div class="col-1">
        <q-btn color="warning" label="Reload" class="full-width" @click="init" />
      </div>
    </div>

    <!-- Linear -->
    <div class="row q-pa-sm">
      <div class="col-1"></div>

      <div class="col-4">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.progressDone"
          color="green"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'Complete : ' + linear.countByDone"
            />
          </div>
        </q-linear-progress>
      </div>
      <div class="col-2"></div>
      <div class="col-4">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.progressAds"
          color="purple"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'Ads : ' + linear.counetAds"
            />
          </div>
        </q-linear-progress>
      </div>
    </div>
    <!-- // -->
    <div class="row q-pa-sm">
      <div class="col-1"></div>
      <div class="col-4">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.countAllData"
          color="blue"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'All Data : ' + linear.countAllData"
            />
          </div>
        </q-linear-progress>
      </div>
      <div class="col-2"></div>
      <div class="col-4">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.progressTourist"
          color="pink"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'Tourist : ' + linear.countTourist"
            />
          </div>
        </q-linear-progress>
      </div>
    </div>
    <div class="row q-pa-sm"></div>

    <!-- Tabel -->
    <div class="row">
      <!-- All User -->
      <div class="col">
        <div class="q-pa-md">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 500px; max-width: 1280px"
          >
            <q-table
              title="User"
              :data="data_all"
              :columns="columns_data_all"
              :filter="report.filterUser"
              row-key="userID"
              selection="single"
              :selected.sync="report.selected"
              @update:selected="onDetail"
            >
              <template v-slot:top-right>
                <q-input
                  outlined
                  dense
                  debounce="300"
                  v-model="report.filterUser"
                  placeholder="Search by Email"
                >
                
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
            </q-table>
          </q-scroll-area>
        </div>
      </div>
      <!-- User Done -->
      <div class="col">
        <div class="q-pa-md">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 500px; max-width: 1280px"
          >
            <q-table
              :title="'Detail by User : ' + report.detailBy"
              :data="data_by_user"
              :columns="columns_data_by_user"
              :filter="report.filterShortCode"
              row-key="shortCode"
            >
              <template v-slot:top-right>
                <q-input
                  outlined
                  dense
                  debounce="300"
                  v-model="report.filterShortCode"
                  placeholder="Search by ShortCode"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
            </q-table>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { QSpinnerFacebook } from "quasar";
import { date } from 'quasar'

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

      // Linear
      linear: {
        countAllData: null,
        countByDone: null,
        progressDone: null,

        counetAds: null,
        countTourist: null,
        progressAds: null,
        progressTourist: null,
      },
      // Report
      report: {
        all: null,
        byUser: null,
        filterUser: null,
        filterShortCode: null,
        selected: [],
        detailBy: "",
      },
      // Tabel
      columns_data_all: [
        {
          name: "userID",
          required: true,
          label: "User Name",
          align: "left",
          field: (row) => row.userID,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "count",
          align: "center",
          label: "Count",
          field: "count",
          sortable: true,
        },
      ],
      data_all: [],
      columns_data_by_user: [
        {
          name: "shortCode",
          required: true,
          label: "Short Code",
          align: "left",
          field: (row) => row.shortCode,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "isAds",
          align: "center",
          label: "Ads",
          field: "isAds",
          sortable: true,
        },
        {
          name: "isTourist",
          align: "center",
          label: "Tourist",
          field: "isTourist",
          sortable: true,
        },
        {
          name: "Time Start",
          align: "center",
          label: "TimeStart",
          // field: "timeStart",
          field: (row) => date.formatDate(row.timeStart, 'YYYY-MM-DD : hh:mm:ss'),
          sortable: true,
        },
        {
          name: "Time Stop",
          align: "center",
          label: "TimeStop",
          // field: "timeStop",
          field: (row) => date.formatDate(row.timeStop, 'YYYY-MM-DD : hh:mm:ss'),
          sortable: true,
        },
      ],
      data_by_user: [],

      // Scroll Area
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },

      // Loading
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
      await this.getHelpClassificationCount();
      await this.getHelpClassificationCountByDone();
      await this.getHelpClassificationCountAds();
      await this.getHelpClassificationCountTourist();
      await this.progressLabel();
      console.log("countAllData : " + this.linear.countAllData);
      console.log("countByDone : " + this.linear.countByDone);
      console.log("countAds : " + this.linear.counetAds);
      console.log("countTourist : " + this.linear.countTourist);
      await this.getHelpReportAll();
      console.log(this.report.all);
      this.data_all = this.report.all;
      await this.onTimeout();
    },

    async progressLabel() {
      this.linear.progressDone =
        this.linear.countByDone / this.linear.countAllData;
      this.linear.progressAds = this.linear.counetAds / this.linear.countByDone;
      this.linear.progressTourist =
        this.linear.countTourist / this.linear.countByDone;
    },

    // >> Classification
    async getHelpClassificationCount() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/Count"
        );
        this.linear.countAllData = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpClassificationCountByDone() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/CountByDone"
        );
        this.linear.countByDone = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpClassificationCountAds() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/CountAds"
        );
        this.linear.counetAds = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpClassificationCountTourist() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/CountTourist"
        );
        this.linear.countTourist = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    // >> Report
    async getHelpReportAll() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpReport"
        );
        this.report.all = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpReportByUser() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/DetailByUser/" +
            this.report.detailBy
        );
        this.report.byUser = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    // >> Button
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

    async onDetail(newSelected) {
      this.showLoading();
      if(newSelected[0] == undefined){
        this.report.detailBy = ""
        this.data_by_user = []
      }else{
        console.log("Detail");
        this.report.detailBy = newSelected[0].userID;
        console.log(this.report.detailBy);
        await this.getHelpReportByUser();
        console.log(this.report.byUser);
        this.data_by_user = this.report.byUser;
      }
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 500);
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
