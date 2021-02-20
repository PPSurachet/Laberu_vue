<template>
<q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <div class="text-white toolbarT">
            <q-toolbar class="row full-height justify-center">
                <q-btn flat>
                    <q-icon name="laberu" />
                    <q-toolbar-title class="titleName"><strong>LABERU.AI</strong>
                    </q-toolbar-title>
                </q-btn>
                <q-space />
                <div class="user">
                    <div class="text-h6 text-center navUsername">labelru@gmail.com</div>
                </div>
                <q-btn flat round dense icon="account_circle" class="text-blue-grey-7" size="20px">
                    <q-menu touch-position>
                        <q-list style="min-width: 100px">
                            <q-item v-close-popup>
                                <q-btn color="amber" label="HISTORY" push size="md" v-close-popup />
                            </q-item>
                            <q-item v-close-popup>
                                <q-btn color="red" label="Logout" push size="md" v-close-popup />
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
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

    <q-page-container style="padding-top:0">
        <div class="context">
            <div class="row justify-around flex">
                <q-card bordered class="my-card" style="width:500px">
                    <q-card-section>
                        <div class="text-h5 text-center">HISTORY</div>
                    </q-card-section>
                    <q-card-section>
                        <div class="q-pa-md drop">
                            <q-scroll-area style="height: 400px" :thumb-style="{
                    right: '-15px',
                    borderRadius: '5px',
                    background: 'grey',
                    width: '5px',
                    opacity: 1
                  }" :delay="1500">

                                <q-list v-for="image in images">
                                    <q-item>
                                        <q-item-section thumbnail direction="right">
                                            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                                        </q-item-section>
                                        <q-item-section>List item</q-item-section>

                                        <div class="q-pa-md q-gutter-sm">
                                            <q-btn label="More" color="primary" @click="image.bar = true" />

                                            <q-dialog v-model="image.bar" persistent>
                                                <q-card class="bg-white text-grey">
                                                    <q-bar class="bg-white">
                                                        <q-space />
                                                        <q-btn dense flat icon="close" v-close-popup>
                                                            <q-tooltip content-class="bg-white text-primary">
                                                                Close
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-bar>
                                                    <q-img src="https://cdn.quasar.dev/img/mountains.jpg" style="width:100%" />

                                                    <q-card-section>
                                                        <div class="text-subtitle1">
                                                            $・Italian, Cafe
                                                        </div>
                                                        <div class="text-caption text-grey">
                                                            {{ lorem }}
                                                        </div>
                                                    </q-card-section>
                                                </q-card>
                                            </q-dialog>
                                        </div>
                                    </q-item>
                                </q-list>
                            </q-scroll-area>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page-container>
</q-layout>
</template>

<script>
const maxSize = 10;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
    heavyList.push({
        label: "Option " + (i + 1)
    });
}

Object.freeze(heavyList);

export default {
    data() {
        return {
            text: "",
            open: false,
            card: false,
            current: "",
            lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            // dialog: false,
            // drawerLeft: false,
            // drawerRight: true
            pagination: {
                sortBy: "desc",
                descending: false,
                page: 2,
                rowsPerPage: 3
                // rowsNumber: xx if getting data from a server
            },
            images: [{
                    id: 1,
                    bar: false
                }, {
                    id: 2,
                    bar: false
                }, {
                    id: 3,
                    bar: false
                }, {
                    id: 4,
                    bar: false
                }, {
                    id: 5,
                    bar: false
                }, {
                    id: 6,
                    bar: false
                },{
                    id: 7,
                    bar: false
                },{
                    id: 8,
                    bar: false
                },
                {
                    id: 9,
                    bar: false
                },
                {
                    id: 10,
                    bar: false
                },

            ],
            heavyList
        };
    },
    methods: {
        onClick() {
            // console.log('Clicked on a fab action')
        },
        toggleFab() {
            this.open = !this.open;
        },
        pagesNumber() {
            return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
        }
    }
};
</script>

<style>
.q-dialog__backdrop {
    z-index: -1;
    pointer-events: all;
    background: transparent;
}

.navUsername {
    color: black;
}

.toolbarT {
    height: 80px;
    background: #f8f8f8;
}

.user {
    color: grey;
}

.titleName {
    color: #666877;
}

.my-card {
    width: 400px;
    border-radius: 10px;
}

.my-carddetail {
    width: 300px;
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
