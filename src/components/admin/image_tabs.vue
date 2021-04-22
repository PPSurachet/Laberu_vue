<template>
  <q-tab-panel name="images">
    <q-splitter v-model="splitterModel" :limits="[30, 100]">
      <template v-slot:before>
        <div class="text-h6 q-mr-xs row justify-between items-center">
          <div class="row">List Images</div>
          <q-btn
            dense
            round
            padding="sm"
            color="white"
            size="15px"
            icon="fas fa-random"
            class="text-grey-6"
            @click="RandomImage()"
          />
        </div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 450px"
        >
          <div
            v-model="tabs"
            vertical
            class="q-mr-lg ml-lg"
            style="color: #666877"
            v-for="(image, index) in images"
            :key="index"
          >
            <q-item
              clickable
              v-ripple
              :active="active == index"
              @click="getImageLaberuInfo(image, index)"
            >
              <q-item-section avatar>
                <q-icon name="fas fa-image" />
              </q-item-section>
              <q-item-section>{{ image.shortcode }}</q-item-section>
              <q-item-section avatar side v-if="image.result.length == 5">
                <q-icon name="fas fa-check-circle" color="blue" />
              </q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-scroll-area>
      </template>
      <template v-slot:after>
        <div v-if="imageInfo.item">
          <div class="text-h5 q-mb-md q-ml-md">Label Info</div>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 450px"
          >
            <div class="text-center q-mb-md">
              <img
                :src="config.baseImageUrl + imageInfo.shortcode + '.jpg'"
                style="max-height: 280px"
              />
            </div>
            <div class="q-ml-md">
              <p style="color: red">Shortcode : {{ imageInfo.shortcode }}</p>
              <p style="color: #191970">Descriptions</p>
              <div v-for="(item, index) in imageInfo.descriptions">
                <p style="color: #191970">
                  {{ index + 1 }} : {{ item.description }}
                </p>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </template>
    </q-splitter>
  </q-tab-panel>
</template>

<script>
import Axios from "app/node_modules/axios";
export default {
  data() {
    return {
      active: null,
      tabs: "",
      tab: "mails",
      innerTab: "innerMails",
      splitterModel: 20,
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
        backgroundColor: "#C4C4C4",
        width: "9px",
        opacity: 0.2,
      },
      config: {
        url: "https://laberu-ptrmd2zvzq-as.a.run.app",
        // url: "http://localhost:8080",
        project_name: null,
        baseImageUrl: null,
        labelingCount: null,
        labelType: null,
        customerID: null,
      },
      images: [],
      imageInfo: {
        icon: false,
        item: false,
        shortcode: null,
        descriptions: [],
      },
    };
  },
  async mounted() {
    await this.configProject();
    await this.getTaskImage();
  },
  methods: {
    async configProject() {
      try {
        const configProject = await Axios.get(`${this.config.url}/project`);

        this.config.project_name = configProject.data[0].project_name;
        this.config.baseImageUrl = configProject.data[0].baseImageUrl;
        this.config.labelingCount = configProject.data[0].labelingCount;
        this.config.labelType = configProject.data[0].labelType;
        this.customerID = configProject.data[0].customerID;
      } catch (error) {
        console.log(error);
      }
    },
    async getTaskImage() {
      try {
        const response = await Axios.get(
          `${this.config.url}/task-image/findTaskSuccessInAllImages`
        );
        this.images = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async RandomImage() {
      try {
        const response = await Axios.get(
          `${this.config.url}/task-image/randomTaskSuccessInAnImages`
        );
        this.getImageLaberuInfo(response.data[0], null);
      } catch (error) {}
    },
    async getImageLaberuInfo(data, index) {
      this.active = index;
      this.imageInfo.item = true;
      this.imageInfo.shortcode = data.shortcode;
      this.imageInfo.descriptions = data.result;
    },
  },
};
</script>

<style>
</style>