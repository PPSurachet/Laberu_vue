<template>
  <q-page>
    <div class="ocean">
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
    <q-dialog v-model="prepare">
      <q-card style="width: width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Inform</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ errorMessage }}
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row justify-center fixed-top">
      <div class="q-pa-xl row items-start q-gutter-md">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Login to Image Classification Lebeling
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              v-model="email"
              label="Email address"
              @keydown.enter.prevent="onLogin"
              :rules="[val => !!val]"
            />
            <q-input
              outlined
              v-model="password"
              label="Password"
              type="password"
              hint
              @keydown.enter.prevent="onLogin"
              :rules="[val => !!val]"
            />
            <div class="text-center">
              <q-btn
                color="green-6"
                class="q-px-xl q-py-xs full-width"
                label="Login with Classme"
                icon="alternate_email"
                filled
                @click="onLogin"
              />
            </div>
            <div class="text-center">
              <q-btn
                color="red"
                class="q-px-xl q-py-xs q-mt-sm full-width"
                label="Login with Gmail"
                icon="mail_outline"
                filled
                @click="onGmailLogin"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "PageLogin",
  computed: {
    ...mapGetters({
      user_login: "user_login/user_login"
    })
  },
  data() {
    return {
      prepare: false,
      email: null,
      password: null,
      errorMessage: ""
    };
  },
  async mounted() {
    console.log("User Login >>> ", this.user_login);
    await this.init();
  },
  methods: {
    ...mapActions({
      setStatusLogin: "user_login/setUserLogin"
    }),
    async init() {
      this.email = null;
      this.password = null;
    },
    onLogin() {
      console.log("onLogin");
      this.onCheck();
    },
    onGmailLogin() {
      console.log("onGmailLogin");
      this.onGmailCheck();
    },
    onGmailCheck() {
      var provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          if (user) {
            this.prepare = false;
            let user_login = {
              email: user.email
            };
            this.setStatusLogin(user_login);
            if(user_login.email == "s5930211002@phuket.psu.ac.th" || user_login.email == "korawit.p@phuket.psu.ac.th"){
              this.$router.push({ name: "admin" });
            }else{
              this.$router.push({ name: "home" });
            }
          } else {
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.errorMessage = errorMessage;
          this.prepare = true;
          console.log(errorMessage);
        });
    },
    onCheck() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.errorMessage = errorMessage;
          this.prepare = true;
          console.log(errorMessage);
        });

      this.$auth.onAuthStateChanged(user => {
        if (user) {
          this.prepare = false;
          let user_login = {
            email: this.email
          };
          this.setStatusLogin(user_login);
          this.$router.push({ name: "home" });
        } else {
        }
      });
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
body {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 254, 234, 1) 0%,
    rgba(255, 254, 234, 1) 35%,
    #b7e8eb 100%
  );
  overflow: hidden;
}

.ocean {
  height: 5%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #015871;
}

.wave {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -175px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
    swell 7s ease -1.25s infinite;
  opacity: 1;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%,
  100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
}

.fixed-top {
  margin-top: 150px;
}

</style>
