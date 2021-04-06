<template>
  <div class="row">
    <div class="col bg-white rounded-borders">
      <div class="q-mr-md">
        <q-table
          style="box-shadow: none"
          :selected-rows-label="getTaskSuccessByUser"
          selection="single"
          :selected.sync="selected"
          :grid="$q.screen.md"
          :dense="$q.screen.lt.md"
          title="User"
          :data="user"
          :columns="columns"
          row-key="name"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </div>
    <q-separator vertical inset="true" />
    <div class="col bg-white rounded-borders">
      <div class="row justify-between items-center q-mx-md">
        <div class="text-h6 text-center q-my-md" v-if="selected.length > 0">
          Labelling By {{ selected[0].name }}
        </div>
        <div class="text-h6 text-center q-my-md" v-else>Labelling By</div>
        <div class="q-my-md">
          <q-btn
            dense
            round
            padding="sm"
            color="white"
            size="15px"
            icon="fas fa-random"
            class="text-grey-6"
            @click="RandomImageByUser()"
          />
        </div>
      </div>
      <q-scroll-area style="height: 450px" v-if="images != null">
        <div v-for="(image, index) in images" :key="image._id">
          <q-item clickable v-ripple @click="onDialog(index, null)">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="config.baseImageUrl + image.shortcode + '.jpg'" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ image.shortcode }}</q-item-section>
          </q-item>
        </div>
        <div v-if="card.image != null">
          <q-dialog v-model="card.status">
            <q-card class="my-card">
              <q-img
                :src="config.baseImageUrl + card.image.shortcode + '.jpg'"
              />
              <q-card-section>
                <div class="row no-wrap items-center">
                  <div class="col text-h6">
                    {{ card.image.description }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import Axios from "app/node_modules/axios";
export default {
  data() {
    return {
      card: {
        status: false,
        image: null,
      },
      config: {
        url: "https://laberu-uag2fgef3q-as.a.run.app",
        // url: "http://localhost:8080",
        project_name: null,
        baseImageUrl: null,
        labelingCount: null,
        labelType: null,
        customerID: null,
      },
      filter: "",
      selected: [],
      user: [],
      columns: [
        {
          name: "email",
          required: true,
          align: "left",
          label: "Email",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "success",
          required: true,
          align: "left",
          label: "Total",
          field: (row) => row.total,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      images: null,
    };
  },
  async mounted() {
    await this.configProject();
    await this.getUser();
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
    async getUser() {
      try {
        const response = await Axios.get(`${this.config.url}/user`);

        this.user = await Promise.all(
          response.data.map(async (item) => {
            const countSuccess = await Axios.get(
              `${this.config.url}/task-success/findByUser/${item._id}/true`
            );
            return { name: item.email, total: countSuccess.data, id: item._id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getTaskSuccessByUser() {
      try {
        const response = await Axios.get(
          `${this.config.url}/task-success/findImageByUser/${this.selected[0].id}`
        );
        this.images = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async RandomImageByUser() {
      try {
        const response = await Axios.get(
          `${this.config.url}/task-success/randomImageByUser/${this.selected[0].id}`
        );
        this.onDialog(-1, response.data[0]);
      } catch (error) {}
    },
    onDialog(index, data) {
      if (data != null) {
        this.card.image = data;
      } else {
        this.card.image = this.images[index];
      }
      this.card.status = true;
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 400px;
  border-radius: 10px;
}
</style>