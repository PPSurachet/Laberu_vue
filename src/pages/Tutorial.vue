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
        <div class="q-pa-md" style="padding: 0px">
          <div class="paddingArrow">
            <q-carousel
              v-model="slide"
              swipeable
              animated
              :control-type="controlType"
              control-color="grey"
              navigation
              padding
              arrows
              height="auto"
              class="text-black rounded-borders paddingCarousel"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <q-card class="cardIMGTutorial">
                  <q-card-section>
                    <div class="tutorialText">
                      Tutorial
                      <div class="exampleText">ตัวอย่างภาพ #image0001</div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="q-pa-md" style="padding: 0px">
                      <img
                        src="../images/image_1.jpg"
                        alt=""
                        width="90%"
                        height="auto"
                        class="firstCard"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-card class="cardIMGTutorial">
                  <q-card-section>
                    <div class="tutorialText">
                      Tutorial
                      <div class="exampleText">ตัวอย่างภาพ #image0001</div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="q-pa-md">
                      <div class="col">
                        <img
                          src="../images/tutorialText.png"
                          alt=""
                          width="90%"
                          height="auto"
                          class="secondCard"
                        />
                      </div>
                      <div class="col text-right" style="margin-top: -3rem">
                        <q-btn
                          color="primary"
                          label="GET STARTED"
                          @click="$router.push('/index')"
                          class="btnStart"
                          style="margin: 0 15px 0 0"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
export default {
  components: {
    backgroundDisplay,
  },
  data() {
    return {
      controlType: "flat",
      controlTypeOptions: [
        { value: "regular", label: "regular" },
        { value: "unelevated", label: "unelevated" },
        { value: "flat", label: "flat (default)" },
        { value: "outline", label: "outline" },
        { value: "push", label: "push" },
      ],
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>

<style>
.q-carousel__arrow .q-icon {
  font-size: 80px;
}
.paddingArrow {
  padding: 0 250px 0 250px;
}
.firstCard {
  width: 85%;
  border-radius: 10px;
}
.secondCard {
  width: 100%;
  border-radius: 10px;
}
.Tcenter {
  text-align: center;
}
.exampleText {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.tutorialText {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
}
.q-carousel {
  background: transparent;
  height: 400px;
}
.paddingCarousel {
  padding: 20px 20px 20px 20px;
}
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
.cardIMGTutorial {
  text-align: center;
  width: 700px;
  height: 520px;
  border-radius: 10px;
  padding: 10px 0 0 0;
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
.btnStart {
  border-radius: 12px;
  font-size: 18px;
  width: 25%;
  height: 60px;
}
.btnColor {
  width: 100%;
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

</style>