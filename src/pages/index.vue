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
    <backgroundDisplay>
    </backgroundDisplay>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="row justify-around">
          <div class="col-md-6">
            <q-card class="cardIMG" style="left: 20%">
              <q-card-section>
                <div class="row">
                  <div class="col">
                    <div class="imgNumber text-left" style="text-right">
                      Image#01
                    </div>
                  </div>
                  <div class="col text-right">
                    <q-btn
                      color="primary"
                      label="SKIP"
                      class="btnSkip"
                      style="margin: 0 15px 0 0"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="q-pa-md">
                  <img
                    src="../images/image_1.jpg"
                    alt=""
                    class="imgMain"
                    width="100%"
                    height="auto"
                  />
                </div>
                <div class="imgID">
                  Image ID : 00715AB
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card class="cardText" style="left: 15%">
              <q-card-section>
                <div class="text-h6 text-center">
                  <b>Describe the Image</b>
                </div>
              </q-card-section>
              <q-card-actions vertical>
                <div
                  class="q-pa-md"
                  style="max-width: 90% align-item-center"
                  row="100"
                >
                  <q-input
                    class="textDescribe"
                    filled
                    type="textarea"
                    placeholder="โปรดใส่คำอธิบายรูปภาพ"
                  />
                </div>

                <div class="btnSave">
                  <q-btn class="btnColor" label="SAVE" />
                </div>
              </q-card-actions>
            </q-card>
            <!-- <q-card class="cardProfile" style="left: 15%">
              <q-card-section>
                <div class="text-h6 text-center"><b>Profile</b></div>
              </q-card-section>
              <q-card-actions vertical>
                <div class="row" style="padding-bottom:20px">
                  <div class="col-4">
                    <div class="row">
                      <q-icon name="fas fa-images" class="ProfileIMG" />
                      <div class="detail">x 155</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <q-icon name="fas fa-wallet" class="ProfileIMG" />
                      <div class="detail">3000 Baht</div>
                    </div>
                  </div>
                </div>
              </q-card-actions>
            </q-card> -->
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from '../components/login_animation'
export default{
  components:{
    backgroundDisplay
  }
}
</script>

<style>
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
  width: 700px;
  border-radius: 10px;
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

.btnSkip {
  border-radius: 5px;
  font-size: 12px;
  width: 20%;
  height: 90%;
}
.btnColor {
  width: 90%;
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
