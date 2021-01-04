
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
Vue.use(Vuex)

const store = new Vuex.Store({


  state: {

    storage:'/../storage/' ,

    //store admin
    admin: {},

    //asign categories as a empty value
    categories : '',

    //asign landing sliders
    landing_sliders :'',

     //asign landing sliders
     banner :'',

    //asign category slider
    category_sliders :'',

    //asign for upcoming course
    upcoming_course:'',

  },


  actions:{

       //session check
      //every time this session check, for admin session running or expired
      admin(context) {
          axios
              .get("/api/check/session/admin")

              //if session status ruuning
              .then((resp) => {
                  if (resp.data.status == "RUNNING") {
                      context.commit('admin', resp.data.admin)

                  }

                  //if session is expired, admin redirect ot login again
                  if (resp.data.status == "EXPIRED") {

                      localStorage.removeItem("admin_token");
                      router.push({ name: "adminLogin" });
                      return;
                  }
              })
              //error handaling
              .catch(() => {
                  router.push({ name: "adminLogin" });
              });
      },


      categories(context){
            axios.get("/api/get/categories/to/display/frontend")
            .then(resp => {
              if (resp.data.status == "OK") {
                context.commit('categories',resp.data.categories);
              }
            })
      },

      landing_sliders(context){
        axios.get('/api/get/landing/sliders/public')
        .then(resp =>{
        if (resp.data.status == "OK") {
          context.commit('landing_sliders',resp.data.landing_sliders);
        }
      })

    },



   banner(context){
        axios.get('/api/get/banner/public')
        .then(resp =>{
          // console.log(resp);
        if (resp.data.status == "OK") {
          context.commit('banner',resp.data.banner);
        }
      })

    },


   upcoming_course(context){
        axios.get('/api/get/upcoming/course/public')
        .then(resp =>{
          console.log(resp);
        if (resp.data.status == "OK") {
          context.commit('upcoming_course',resp.data.upcoming_course);
        }
      })

    },
    
    category_sliders(context){

        axios.get('/api/get/category/sliders/public')
        .then(resp =>{
          // console.log(resp);
        if (resp.data.status == "OK") {
          context.commit('category_sliders',resp.data.category_sliders);
        }
      })

    },



  },


  mutations: {
      
       admin(state, payload){
         return state.admin= payload ;
       },

       categories(state,payload){
         return state.categories = payload ;
       },

      landing_sliders(state,payload){
        return state.landing_sliders=payload ;
       },

       banner(state,payload){
        return state.banner=payload ;
       },

       upcoming_course(state,payload){
        return state.upcoming_course=payload ;
       },

      category_sliders(state,payload){
        return state.category_sliders=payload ;
      }

  },

  getters:{

       admin(state){
         return state.admin ;
       },

       categories(state){
         return state.categories ;
       },

       landing_sliders(state){
         return state.landing_sliders ;
       },

       banner(state){
         return state.banner ;
       },

       category_sliders(state){
         return state.category_sliders ;
       },

       upcoming_course(state){
         return state.upcoming_course;
       }

  },

 


})

global.store = store;
export default store ;