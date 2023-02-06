<template>
  <div class="" v-if="loaded === true">
    <h3 class="p-3 text-center">Liste des lieux de tournages à Paris</h3>
    <div class="overlay"v-if="showModal === true">
      <!-- overlay to help with readability of modal -->
      <div class="modal-vue" >
        <button class="close" @click="showModal = false; locationList = true">x</button>
        <table class="table table-striped table-bordered">
          <tr>
            <td> Adresse</td>
            <td> {{currentItem.adresse_lieu}}</td>
          </tr>
          <tr>
            <td> Année de tournage</td>
            <td>{{currentItem.annee_tournage}}</td>
          </tr>
          <tr>
            <td> Date de début</td>
            <td>{{currentItem.date_debut}}</td>
          </tr>
          <tr>
            <td> Date de fin</td>
            <td>{{currentItem.date_fin}}</td>
          </tr>
          <tr>
            <td> Nom du producteur</td>
            <td>{{currentItem.nom_producteur}}</td>
          </tr>
          <tr>
            <td> Nom du réalisateur</td>
            <td>{{currentItem.nom_realisateur}}</td>
          </tr>
          <tr>
            <td> Nom du tournage</td>
            <td>{{currentItem.nom_tournage}}</td>
          </tr>
        </table>
      </div>
    </div>
      <!-- Modal for detail on table cell click event -->

    <table class="table table-striped table-bordered" v-if="locationList === true">
      <thead>
      <tr>
        <th>Lieu de tournage</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="location in locations" :key="location.id" >
        <td v-on:click="rowClick(location)">{{location.adresse_lieu}}</td>
        <td><button v-on:click="deleteEvent(location._id)">Delete</button></td>
        <td><button v-on:click="editEvent(location._id)">Edit</button></td>
<!--        <td>{{location.annee_tournage}}</td>
            <td>{{location.nom_realisateur}}</td>-->
      </tr>
      </tbody>
    </table>
  </div>

</template>
<script>

import {getLocations,deleteLocation} from "../_services";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default {
  name: "locations",
  async beforeCreate() {
    let locations = null
    getLocations(localStorage.getItem('jwt_token'))
        .then(response => {
          this.locations = response;
          console.log(this.locations);
          this.loaded = true;
          this.locationList = true;
        })
  },
  data() {
    return {
      currentItem:true,
      locations: null,
      loaded: false,
      showModal:false,
      locationList:false,
    };
  },
  methods: {
  rowClick(item) {
    this.currentItem = item;
    this.showModal = true;
    this.locationList = false;
    console.log(this.showModal);
},
  deleteEvent(id){
  deleteLocation(id);
  this.$router.go();
  },
  editEvent(){

  }
  },
};
</script>

<style scoped>

</style>