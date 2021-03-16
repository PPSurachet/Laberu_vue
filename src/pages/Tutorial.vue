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
            <div class="text-h6 text-center navUsername">labelru@gmail.com</div>
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
                    @click="$router.push('/history')"
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
        <div class="q-pa-md">
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
                <q-card class="cardIMG">
                  <q-card-section>
                    <div class="tutorialText">
                      Tutorial
                      <div class="exampleText">ตัวอย่างภาพ #image0001</div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="q-pa-md">
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
                <q-card class="cardIMG ">
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
                        <div class="col text-right" style="margin-top:-3rem">
                          <q-btn
                          
                            color="primary"
                            label="GET STARTED"
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
    backgroundDisplay
  },
  data() {
    return {
      controlType: "flat",
      controlTypeOptions: [
        { value: "regular", label: "regular" },
        { value: "unelevated", label: "unelevated" },
        { value: "flat", label: "flat (default)" },
        { value: "outline", label: "outline" },
        { value: "push", label: "push" }
      ],

      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
    };
  }
};
</script>

<style>
.q-carousel__arrow .q-icon {
  font-size: 80px;
}
.paddingArrow {
  padding: 0 500px 0 350px;
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
.cardIMG {
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
