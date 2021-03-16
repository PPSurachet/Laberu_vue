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


        </q-toolbar>
      </div>
    </q-header>
    <backgroundDisplay>
    </backgroundDisplay>

    <q-page-container class="body" style="padding-top:0">
      <div class="context">
        <div class="row justify-around">
          <div class="col-lg-1"></div>
          <div class="col-lg-4">
            <q-card-section align="center" style="left:3rem">
              <div class="text-h4">
                Image Labeling
                <div class="text-subtitle2">by LABERU</div>
              </div>
              <div class="q-pa-md">
                <imageDisplay></imageDisplay>
                <div class="q-col-gutter-md row items-start q-mt-xs"></div>
              </div>
            </q-card-section>
          </div>
          <div class="col-lg-1"></div>
          <div class="col-lg-4 q-mt-md">
            <q-card flat bordered class="loginCard">
              <q-card-section>
                <div class="text-h4 text-center q-mt-md q-mb-md">
                  ลงชื่อเข้าใช้
                </div>
                <q-form class="text-center">
                  <q-input square clearable class="txtInput" type="email" label="Email" v-model="user.email" name="email" id="email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input square clearable class="txtInput" type="password" label="Password"  v-model="user.password" name="password" id="password">
                    <template v-slot:prepend>
                      <q-icon
                        :name="user.isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer hiddenIcon"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <div align="right" class="q-pa-sm">
                    <q-btn
                      flat
                      size="10px"
                      class="forgetPW"
                      label="Forgot password?"
                      style="left:15px"
                    />
                  </div>
                </q-form>
                <div align="center">
                  <q-btn
                    class="q-mt-sm loginBtn"
                    outline
                    @click="$router.push('/index')"
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
                <div class="q-mt-sm q-gutter-sm" align="center">
                  <q-btn class="createaccBtn" flat color="primary" label="Create an account" />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-2"></div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from '../components/login_animation'
import imageDisplay from '../components/login_image'
export default {
  components: {
    backgroundDisplay,
    imageDisplay,
  },
  data(){
    return {
      user: {
      email : "",
      password : "",
    }
    }
    
  }
  
}

</script>

<style>
.loginCard {
  left: 6rem;
  height: 95%;
  padding: 0rem 1rem 2rem 1rem ;
  width: auto;  
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