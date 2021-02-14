<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="text-white toolbarT">
        <q-toolbar class="row full-height justify-center">
          <q-btn flat>
            <q-icon name="img:../icons/icon.png" size="3rem" />
            <q-toolbar-title class="titleName"
              ><strong>LABERU.AI</strong>
            </q-toolbar-title>
          </q-btn>
          <q-space />

          <q-btn-dropdown
            flat
            round
            dense
            icon="account_circle"
            class="text-blue-grey-7"
            size="1.5rem"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </div>
    </q-header>
    <q-parallax height="720">
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </q-parallax>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="row justify-around">
          <div class="col-lg-4">
            <q-card-section align="center">
              <div class="text-h4">
                Image Labeling
                <div class="text-subtitle2">by LABERU</div>
              </div>
              <div class="q-pa-md">
                <div class="q-col-gutter-md q-mt-sm row items-center">
                  <div class="col">
                    <q-img
                      src="imgSet"
                      width="100%"
                      height="180px"
                    />
                  </div>
                </div>
                <!-- <div class="q-col-gutter-md q-mt-sm row items-center ">
                  <div class="col">
                    <q-img
                      animaiton="fadeInDown"
                      src="../images/right1.jpg"
                      width="100%"
                      height="180px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animaiton="fadeInDown"
                      src="../images/hight.jpg"
                      width="100%"
                      height="200px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animaiton="fadeInDown"
                      src="../images/hight.jpg"
                      width="100%"
                      height="225px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animation="fadeInDown"
                      src="../images/right3.jpg"
                      width="100%"
                      height="250px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animation="fadeInDown"
                      src="../images/right2.jpg"
                      width="100%"
                      height="275px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animation="fadeInDown"
                      src="../images/right3.jpg"
                      width="100%"
                      height="300px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animation="fadeInDown"
                      src="../images/right1.jpg"
                      width="100%"
                      height="275px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animation="fadeInDown"
                      src="../images/right3.jpg"
                      width="100%"
                      height="250px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animation="fadeInDown"
                      src="../images/right2.jpg"
                      width="100%"
                      height="225px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animaiton="fadeInDown"
                      src="../images/hight.jpg"
                      width="100%"
                      height="200px"
                    />
                  </div>
                  <div class="col">
                    <q-img
                      animaiton="fadeInDown"
                      src="../images/right1.jpg"
                      width="100%"
                      height="180px"
                    />
                  </div>
                </div> -->
                <div class="q-col-gutter-md row items-start q-mt-xs"></div>
              </div>
            </q-card-section>
          </div>
          <div class="col-lg-5 q-mt-md">
            <q-card flat bordered class="jjCard">
              <q-card-section>
                <div class="text-h4 text-center q-mt-md q-mb-md">
                  ลงชื่อเข้าใช้
                </div>
                <q-form>
                  <q-input square clearable type="email" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input square clearable type="password" label="Password">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                  <div align="right" class="q-pa-sm">
                    <q-btn
                      flat
                      size="10px"
                      class="text-grey-6"
                      label="Forgot password?"
                    />
                  </div>
                </q-form>
                <div align="center">
                  <q-btn
                    class="q-mt-xs"
                    outline
                    rounded
                    @click="$router.push('/index')"
                    style="width: 300px"
                    color="primary"
                    label="Sign in"
                  />
                </div>

                <div class="text-center q-pa-md q-gutter-md">
                  <q-btn round color="indigo-7">
                    <q-icon name="fab fa-facebook-f" size="1.5rem" />
                  </q-btn>
                  <q-btn round color="red-8">
                    <q-icon name="fab fa-google-plus-g" size="1.5rem" />
                  </q-btn>
                </div>
                <q-separator inset />
                <div class="q-mt-lg q-gutter-sm" align="center">
                  <q-btn flat color="primary" label="Create an account" />
                </div>
              </q-card-section>
              <q-card-section> </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {

}
</script>

<style>
.jjCard {
  height: 95%;
  width: 70%;
}
.toolbarT {
  height: 80px;
  background: #f8f8f8;
}

.titleName {
  color: #666877;
}

.shadow-box {
  width: 90px;
  height: 90px;
  margin: 25px;
}

.loginBtn {
  width: 300px;
  margin-top: 2rem;
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
