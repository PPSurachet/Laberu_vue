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
              <q-card-actions vertical>
                <div
                  style="max-width: 90% align-item-center"
                  row="100"
                >
                   <div style="margin-top:0">
                        <q-list class="rounded-borders" style="max-width: 100%">
                          <q-expansion-item
                            label="Guide"
                            icon="link"
                            style="font-weight:bold;font-size:16px"
                          >
                          <q-card style="padding: 0px 20px 10px 20px">
                            <q-card-section>
                              ##
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                              eveniet doloribus ullam aliquid.
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>

                      </q-list>
                    </div>
                    
                </div>
              </q-card-actions>
            </q-card> 

            <q-card class="cardText" style="left: 15%; top:3%">
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
                <q-form
                  @submit="onSubmit"
                  >
                  <q-input
                    filled
                    class="textDescribe"
                    v-model="deciptionArea"
                    label="โปรดใส่คำอธิบายรูปภาพ*"
                    type="textarea"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <div class="btnSave">
                      <q-btn class="btnColor" label="Save" type="submit"/>
                  </div>
                  </q-form>
                </div> 
              </q-card-actions>
            </q-card>
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
  },
  data(){
    return{
    deciptionArea: null,
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
  }
}
</script>

<style>
.exampleWay input{
  font-size: 15px;
  font-weight:500;
  opacity: 1;
}

.exampleWay{
  height: 5rem;
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
