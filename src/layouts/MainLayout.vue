<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar square>
            <img src="~assets/a-type.png" />
          </q-avatar>
          Image Classification Lebeling
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          label="Logout"
          @click="logout"
          icon="account_circle"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push({ name: "signin",  params: { nextUrl: '/home' } });
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
