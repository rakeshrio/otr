<template>
  <div class="col-md-12">
        <div class="row my-5 col-md-12 m-0 p-0">
            <div class="col-md-4" v-for="(data, index) in compareData" :key="index">
                <div class="card px-2" >
                    <div class="col-md-12 d-flex justify-content-between">
                        
                        <p>{{index}}</p>
                        <p @click="remove(index)">Remove</p>

                    </div>
                    <img :src="data.hero_image" width="100%" alt="">
                    <p><strong>{{data.make}} {{data.model}}</strong></p>

                </div>
            </div>
            <div class="col-md-12 my-5" v-if="compareData.length < 3">

                <p>Add item to compare</p>

                <button @click="$router.push('/models')">ADD NOW</button>

            </div>
            
        </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            compareData : ''
        }
    },
    computed:{
        // compareData(){
        //     return this.$store.state.compare
        // }
    },
    created(){
        this.compareData = JSON.parse(localStorage.compare)
    },
    methods:{
        remove(index){
            var data = this.compareData
            data.splice(index, 1)
            localStorage.compare = JSON.stringify(data)
            this.compareData = JSON.parse(localStorage.compare)
        }
    }
}
</script>

<style>

</style>