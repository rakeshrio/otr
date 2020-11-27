<template>
<div class="catalogue my-5 px-3">

<div class="col-md-10 my-5 p-0 mb-5 m-auto">
    <b-row >
        <b-col md="3" class="only-laptop">
            <b-col class="mb-4 m-0 p-0 text-left">
                <b-card>
                    <div class="col-md-12 m-0 p-0">
                    <p class="labels">Filter Budget</p>
                        <b-form-group>
                            <b-form-radio v-model="selectedBudget" name="some-radios" value="50000">>  ₹ 50000 </b-form-radio>
                            <b-form-radio v-model="selectedBudget" name="some-radios" value="60000">>  ₹ 60000</b-form-radio>
                            <b-form-radio v-model="selectedBudget" name="some-radios" value="70000">>  ₹ 70000</b-form-radio>
                            <b-form-radio v-model="selectedBudget" name="some-radios" value="90000">>  ₹ 90000</b-form-radio>
                        </b-form-group>
                    </div>
                </b-card>
            </b-col>
            <b-col class="mb-4 m-0 p-0 text-left">
                <b-card>
                    <div class="col-md-12 m-0 p-0">
                    <p class="labels">Filter Make</p>
                        <b-form-group>
                            <b-form-radio v-for="(data, index) in allBrands" :key="index" v-model="selectedMake" name="make" :value="data.make">{{data.make}}</b-form-radio>
                        </b-form-group>
                    </div>
                </b-card>
            </b-col>
            <b-col v-if="selectedBudget || selectedMake">
             <b-button @click="resetFilter" variant="outline-dark">Reset Filters</b-button>
            </b-col>
        </b-col>
        <b-col class="contents">
            <b-row>
                <b-col style="cursor:pointer" class="col-md-4 col-12 text-left" @click="goToCheckout(data._id)"  v-for="(data, index) in allModels" :key="index">
                    <b-card  class="flaps mb-4">
                        <img :src="data.hero_image" alt="" width="100%" />
                        <p class="title m-0 p-0"><strong>{{ data.make }} {{ data.model }}</strong></p>
                        <p
                            class="labels m-0 p-0"
                            v-if="data.superset.length > 0"
                        >
                            ₹ {{ getPrice(data.superset) }}
                        </p>
                    </b-card>
                </b-col>
            </b-row>
            <b-row v-if="loading && allModels.length == 0">
                <b-col class="col-md-4 mb-4" v-for="(data, index) in loader" :key="index">
                <b-card>
                    <div class="mb-2">
                    <b-skeleton-img class="mb-5"></b-skeleton-img>
                    </div>
                    <b-skeleton width="54%"></b-skeleton>
                    <b-skeleton width="47%"></b-skeleton>
                    <b-skeleton width="90%"></b-skeleton>
                </b-card>
                </b-col>
            </b-row>
            <b-row v-if="!loading && allModels.length == 0">
                <b-col class="col-md-4 mb-4">
                <b-card>
                   <p>We didn't get any data.</p>
                </b-card>
                </b-col>
            </b-row>
        </b-col>
        
    </b-row>
</div>

</div>

</template>
<script>
import * as _ from 'lodash' 

export default {
    data(){
        return{
            selectedBudget:'',
            selectedMake:'',
            loader: [{}, {}, {}, {}, {}, {}, {}, {}],
        }
    },
    created(){
        this.fetchData()
    },
    watch:{
        selectedBudget(value){
            if(this.selectedMake){
                this.$store.dispatch('getModelsWithMakeAndBudget',{make: this.selectedMake, budget: value})
            }else{
                this.$store.dispatch('getModelsWithMakeAndBudget',{budget: value})
            }
        },
        selectedMake(value){
            if(this.selectedBudget){
                this.$store.dispatch('getModelsWithMakeAndBudget',{make: value, budget: this.selectedBudget})
            }else{
                this.$store.dispatch('getModelsWithMakeAndBudget',{make: value})
            }
        }
    },
    methods:{
        resetFilter(){
            this.selectedBudget = '',
            this.selectedMake = ''
        },
        fetchData(){
            this.$store.dispatch("getAllBrands")
            this.$store.dispatch('getModelsWithMakeAndBudget',{})
        },
        getPrice(data) {
            var max = _.maxBy(data, "price");
            var min = _.minBy(data, "price");
            if (min == max) {
                return max.price;
            } else {
                return min.price + "-" + max.price;
            }
        },
        goToCheckout(id) {
            this.$router.push("/display/" + id);
        },
    },
    computed:{
        allBrands(){
            return this.$store.state.getAllBrands
        },
        allModels() {
            return this.$store.state.getModelsWithMakeAndBudget
        },
        loading() {
            return this.$store.state.makingAJAX;
        },
    }
}
</script>
<style scoped>
/*
    .contents{
        max-height: 200px;
        overflow: scroll;
    }
    .contents::-webkit-scrollbar {
    display: none;
    }
*/
@media only screen and (max-width: 600px) {
  .only-laptop {
    display: none;
  }
}

.catalogue{
    transition: 2s;
}
.labels{
    color: #4e44d8 !important; font-weight: bold
}
</style>
    
