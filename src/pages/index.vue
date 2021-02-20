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
                <div class="q-pa-md" style="text-align:center;">
                  <div style="font-weight:bold;font-size:50px">{{ dataImage.shortcode }}</div>
                  <!-- <q-img
                    src="../images/image_1.jpg"
                    alt=""
                    class="imgMain"
                    width="100%"
                    height="auto"
                  /> -->
                </div>
                <div class="imgID">
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
                    v-model="taskSuccess.caption"
                    filled
                    type="textarea"
                    placeholder="โปรดใส่คำอธิบายรูปภาพ"
                  />
                </div>

                <div class="btnSave">
                  <q-btn class="btnColor" label="SAVE" @click="onSave()" />
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
import { QSpinnerFacebook } from 'quasar';
export default {
  data(){
    return {
      user:{
        _id:'6023a41eaf493f54ec7a856e',
        name:null,
      },
      dataImage:{
        _id:null,
        shortcode:null,
      },
      taskImage:{
        _id:null,
        shortcode:null,
        status:null,
        process:null,
      },
      taskSuccess:{
        _id:null,
        shortcode:null,
        caption:null,
        time_start:null,
        time_stop:null,
        user_id:null,
        task_id:null,
      }
    }
  },
  // created(){
  //   window.addEventListener('onbeforeunload',this.resetStatus())
  // },
  // mounted(){
  //   this.init();
  // },
  methods:{
    async init(){
      this.showLoading();
      if(this.checkDone()){
        await this.getImageByUser();
        await this.updateStatusTask(true);
        await this.setImageData();
        if(this.insertNewRecord()){
          this.onTimeout();
        }
      }else{
        this.showMessage();
      }
    },
    async checkDone() {
      try {
        const responseImage = await this.$axios.get('https://testlaberu3-uag2fgef3q-as.a.run.app/image-data/getCountImage')
        const responseTaskImage = await this.$axios.get('https://testlaberu3-uag2fgef3q-as.a.run.app/task-image/getCountTaskSuccess')
        if(responseTaskImage.data > responseImage){
          return true;
        }else{
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getImageByUser(){
      try {
        const response = await this.$axios.get(`https://testlaberu3-uag2fgef3q-as.a.run.app/task-image/findImage/${this.user._id}`);
        this.taskImage._id = response.data[0]._id;
        this.taskImage.shortcode = response.data[0].shortcode;
        this.taskImage.status = response.data[0].status;
        this.taskImage.process = response.data[0].process;
      } catch (error) {
        console.log(error);
      }
    },
    async setImageData(){
      try {
        const response = await this.$axios.get(`https://testlaberu3-uag2fgef3q-as.a.run.app/image-data/${this.taskImage.shortcode}`);
        this.dataImage._id = response.data[0]._id;
        this.dataImage.shortcode = response.data[0].shortcode;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatusTask (inputStatus) {
      try {
        await this.$axios.put(`https://testlaberu3-uag2fgef3q-as.a.run.app/task-image/update_status/${this.taskImage._id}`,{
          status:inputStatus
        })
      } catch (error) {
        console.log(error);
      }
    },
    async insertNewRecord(){
      try {
        const response = await this.$axios.post(`https://testlaberu3-uag2fgef3q-as.a.run.app/task-success/create`,{
            shortcode:this.taskImage.shortcode,
            caption:null,
            time_start:null,
            time_stop:null,
            user_id: this.user._id,
            task_id: this.taskImage._id,
        })

        this.taskSuccess._id = response.data._id;
      } catch (error) {
        console.log(error);
      }
    },
    async onSave() {
      try {
        await this.$axios.put(`https://testlaberu3-uag2fgef3q-as.a.run.app/task-success/updateOnSave/${this.taskSuccess._id}`,{
            shortcode:this.taskImage.shortcode,
            caption:this.taskSuccess.caption,
            time_start:null,
            time_stop:null,
            user_id: this.user._id,
            task_id: this.taskImage._id,
        })

        await this.updateStatusTask(false);
        this.taskSuccess.caption = null;
        this.init();

      } catch (error) {
        console.log(error);
      }
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'blue-8',
      })
    },
    showMessage () {
      this.$q.loading.show({
        spinner: null,
        spinnerColor: null,
        spinnerSize: 0,
        backgroundColor: 'blue-8',
        message:'Enee ๆ ๆ ๆ ๆ ๆ ๆ'
      })
    },
    onTimeout () {
        this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    },
    async resetStatus(){
        await this.$axios.put(`https://testlaberu3-uag2fgef3q-as.a.run.app/task-image/update_status/${this.taskSuccess._id}`,{
          status:false
        })

        await this.$axios.delete(`https://testlaberu3-uag2fgef3q-as.a.run.app/task-success/delete${this.taskSuccess._id}`)
    }
  },
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
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
