<template>
    <div class="q-col-gutter-md q-mt-sm row items-center ">
        <div class="col" v-for="image in images">
            <q-img
                :src="image.url"
                :width="image.width"
                :height="image.height"
            />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            images:[
            {
                url:require('../images/image_1.jpg'),
                width:'100%',
                height:'180px',
            },{
                url:require('../images/image_2.jpg'),
                width:'100%',
                height:'200px',
            },{
                url:require('../images/image_3.jpg'),
                width:'100%',
                height:'225px',
            },{
                url:require('../images/image_4.jpg'),
                width:'100%',
                height:'250px',
            },{
                url:require('../images/image_5.jpg'),
                width:'100%',
                height:'275px',
            },{
                url:require('../images/image_1.jpg'),
                width:'100%',
                height:'300px',
            },{
                url:require('../images/image_5.jpg'),
                width:'100%',
                height:'275px',
            },{
                url:require('../images/image_4.jpg'),
                width:'100%',
                height:'250px',
            },{
                url:require('../images/image_3.jpg'),
                width:'100%',
                height:'225px',
            },{
                url:require('../images/image_2.jpg'),
                width:'100%',
                height:'200px',
            },{
                url:require('../images/image_1.jpg'),
                width:'100%',
                height:'180px',
            },
        ]
        }
    }
}
</script>

<style scoped src="../css/login_image.css">

</style>