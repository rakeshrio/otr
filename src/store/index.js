import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStateModel:[],
    cartdata:[],
    getAllBrands:[],
    getModelsWithoutDealer:[],
    getModelsWithMake:[],
    getModelsWithType:[],
    getModelsWithDisplacement:[],
    getModelsWithBudget:[],
    getModelsWithSearch:[],
    getModelsWithMakeAndBudget:[],
    makingAJAX:false,
    cart:JSON.parse(localStorage.getItem('cart')),
    compare:[]
  },
  mutations: {
    getCurrentStateModel(state, value){
      state.currentStateModel = value;
    },
    getModelsWithoutDealer(state, value){
      state.getModelsWithoutDealer = value;
    },
    getModelsWithMake(state, value){
      state.getModelsWithMake = value;
    },
    getModelsWithBudget(state, value){
      state.getModelsWithBudget = value;
    },
    getModelsWithType(state, value){
      state.getModelsWithType = value;
    },
    getModelsWithDisplacement(state, value){
      state.getModelsWithDisplacement = value;
    },
    getModelsWithSearch(state, value){
      state.getModelsWithSearch = value;
    },
    getModelsWithMakeAndBudget(state, value){
      state.getModelsWithMakeAndBudget = value;
    },
    getAllBrands(state, value){
      state.getAllBrands = value;
    },
    COMPARE(state, value){
      state.compare = value
    }

  },
  actions: {
    getModels({commit}){
      axios.get('https://backend-bikex.herokuapp.com/api/otr_models/otr-list').
      then(data=> {
        commit('getCurrentStateModel', data.data)
      });
    },

    getCompareData({commit}){
      var x = JSON.parse(localStorage.compare)
      commit('COMPARE', x)
    },

    // getAllBrands({commit}){
    //   axios.get('https://backend-bikex.herokuapp.com/api/otr_models/makes/data').
    //   then(data=> {
    //     commit('getAllBrands', data.data)
    //   });
    // },
    getAllBrands({commit}){
      axios.get('https://backend-bikex.herokuapp.com/api/otr_models/get-brand/data').
      then(data=> {
        commit('getAllBrands', data.data)
      });
    },
    getModelsWithoutDealer({commit},payload){
      axios.get('https://backend-bikex.herokuapp.com/api/otr_models/model-data-without-dealer/' + payload.id).
      then(data=> {
        commit('getModelsWithoutDealer', data.data)
      });
    },
    getModelsWithMake({commit},payload){
      axios.post('https://backend-bikex.herokuapp.com/api/otr_models/make' , {
        make:payload.id
      }).
      then(data=> {
        commit('getModelsWithMake', data.data)
      });
    },
    getModelsWithMakeAndBudget({commit},payload){
      axios.post('https://backend-bikex.herokuapp.com/api/otr_models/filter/make/budget' , {
        make:payload.make,
        budget:payload.budget
      }).
      then(data=> {
        commit('getModelsWithMakeAndBudget', data.data)
      });
    },
    getModelWithSearch({commit},payload){
      axios.post('https://backend-bikex.herokuapp.com/api/otr_models/filter-model' , {
        contains:payload.id
      }).
      then(data=> {
        commit('getModelsWithSearch', data.data)
      });
    },
    getModelsWithType({commit},payload){
      axios.post('https://backend-bikex.herokuapp.com/api/otr_models/type' , {
        type:payload.id
      }).
      then(data=> {
        commit('getModelsWithType', data.data)
      });
    },
    getModelsWithBudget({commit},payload){
      axios.post('https://backend-bikex.herokuapp.com/api/otr_models/budget' , {
        price:payload.id
      }).
      then(data=> {
        commit('getModelsWithBudget', data.data)
      });
    },
    getModelsWithDisplacement({commit},payload){
      axios.post('https://backend-bikex.herokuapp.com/api/otr_models/displacement' , {
        displacement:payload.id
      }).
      then(data=> {
        commit('getModelsWithDisplacement', data.data)
      });
    }
  },
  modules: {
  }
})
