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
    <q-page-container class="body" style="padding-top: 0">
      <div class="row justify-center">
        <div
          class="col context adminTabs bg-white text-black shadow-2 q-mr-lg ml-lg"
          style="max-height: 500px"
        >
          <q-tabs
            v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="userID" label="User ID" />
            <q-tab name="randomImg" label="Random" />
          </q-tabs>
          <q-separator />
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="userID">
              <q-splitter v-model="splitterModel" :limits="[40, 100]">
                <template v-slot:before>
                  <div class="text-h4 q-mb-md">
                    <div class="row items-center justify-center">
                      User
                      <q-input
                        class="searchBox q-ml-md"
                        v-model="search"
                        rounded
                        outlined
                        placeholder="Search"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <q-scroll-area
                    :thumb-style="thumbStyle"
                    :bar-style="barStyle"
                    style="height: 320px"
                  >
                    <q-tabs
                      v-model="tabs"
                      vertical
                      class="text-teal q-mr-lg ml-lg"
                      v-for="n in 5"
                      :key="n"
                    >
                      <q-tab
                        name="userid1"
                        label="userid12345userid12345@gmail.com"
                      />
                      <q-separator />
                      <q-tab name="userid2" label="userid2" />
                      <q-separator />
                      <q-tab name="userid3" label="userid3" />
                      <q-separator />
                    </q-tabs>
                  </q-scroll-area>
                </template>
                <template v-slot:after>
                  <q-tab-panels
                    v-model="tabs"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="userid1">
                      <div class="text-h4 q-mb-md">Label Info</div>
                      <p style="color: green">Image_ID : "1111111111"</p>
                      <p style="color: blue">
                        tags : {"xxxx","xxxxxxx","xxxxxxxxxx","xxxxx","xxxxxxx"}
                      </p>
                      <p style="color: red">dot : "xx/xx/xxxx"</p>
                    </q-tab-panel>

                    <q-tab-panel name="userid2">
                      <div class="text-h4 q-mb-md">Label Info</div>
                      <p style="color: green">Image_ID : "222222222"</p>
                      <p style="color: blue">
                        tags : {"xxxx","xxxxxxx","xxxxxxxxxx","xxxxx","xxxxxxx"}
                      </p>
                      <p style="color: red">dot : "xx/xx/xxxx"</p>
                    </q-tab-panel>
                    <q-tab-panel name="userid3">
                      <div class="text-h4 q-mb-md">Label Info</div>
                      <p style="color: green">Image_ID : "333333333"</p>
                      <p style="color: blue">
                        tags : {"xxxx","xxxxxxx","xxxxxxxxxx","xxxxx","xxxxxxx"}
                      </p>
                      <p style="color: red">dot : "xx/xx/xxxx"</p>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </q-tab-panel>

            <q-tab-panel name="randomImg">
              <q-splitter v-model="splitterModel" :limits="[40, 100]">
                <template v-slot:before>
                  <q-scroll-area
                    :thumb-style="thumbStyle"
                    :bar-style="barStyle"
                    style="height: 350px"
                  >
                     <q-table
      style="height: 400px"
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
                      <template v-slot:top-right>
                        <q-input
                          borderless
                          dense
                          debounce="300"
                          v-model="filter"
                          placeholder="Search"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </template>
                    </q-table>
                  </q-scroll-area>
                </template>
                <template v-slot:after>
                  <q-tab-panels
                    v-model="tabs"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="userid1">
                      <q-img src="../images/image_1.jpg"></q-img>
                      <div class="text-h4 q-mb-md">Label Info</div>
                      <p style="color: green">Image_ID : "1111111111"</p>
                      <p style="color: blue">
                        tags : {"xxxx","xxxxxxx","xxxxxxxxxx","xxxxx","xxxxxxx"}
                      </p>
                      <p style="color: red">dot : "xx/xx/xxxx"</p>
                    </q-tab-panel>
                    <q-tab-panel name="userid2">
                      <q-img src="../images/image_1.jpg"></q-img>
                      <div class="text-h4 q-mb-md">Label Info</div>
                      <p style="color: green">Image_ID : "222222222"</p>
                      <p style="color: blue">
                        tags : {"xxxx","xxxxxxx","xxxxxxxxxx","xxxxx","xxxxxxx"}
                      </p>
                      <p style="color: red">dot : "xx/xx/xxxx"</p>
                    </q-tab-panel>
                    <q-tab-panel name="userid3">
                      <q-img src="../images/image_1.jpg"></q-img>
                      <div class="text-h4 q-mb-md">Label Info</div>
                      <p style="color: green">Image_ID : "333333333"</p>
                      <p style="color: blue">
                        tags : {"xxxx","xxxxxxx","xxxxxxxxxx","xxxxx","xxxxxxx"}
                      </p>
                      <p style="color: red">dot : "xx/xx/xxxx"</p>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import backgroundDisplay from "../components/adminBG";
export default {
  components: {
    backgroundDisplay,
  },
  data() {
    return {
      tab: "",
      tabs: "",
      splitterModel: 20,
      search: "",
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
      filter: "",
      columns: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
        },
      ],
    };
  },
};
</script>

<style scoped src="../css/admin.css">
</style>