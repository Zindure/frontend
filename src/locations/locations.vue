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

    <div
        v-if="addForm === true || editForm === true"
        id="addForm"
    >
      <th>Ajouter</th>
      <button class="close" @click="editForm = false; addForm = false">x</button>
      <p>
        <label for="nomFilm">Nom du Film</label>
        <input
            id="nomFilm"
            v-model="nomFilm"
            type="text"
            name="nomFilm"
        >
      </p>
      <p>
        <label for="debutFilmage">Debut filmage</label>
        <input
            id="debutFilmage"
            v-model="debutFilmage"
            type="text"
            name="debutFilmage"
        >
      </p>
      <p>
        <label for="finFilmage">Fin filmage</label>
        <input
            id="finFilmage"
            v-model="finFilmage"
            type="text"
            name="finFilmage"
        >
      </p>
      <p>
        <label for="typeFilm">Type de film</label>
        <input
            id="typeFilm"
            v-model="typeFilm"
            type="text"
            name="typeFilm"
        >
      </p>
      <p>
        <label for="nomProducteur">Nom du producteur</label>
        <input
            id="nomProducteur"
            v-model="nomProducteur"
            type="text"
            name="nomProducteur"
        >
      </p>
      <p>
        <label for="nomRealisateur">Nom du réalisateur</label>
        <input
            id="nomRealisateur"
            v-model="nomRealisateur"
            type="text"
            name="nomRealisateur"
        >
      </p>
      <p>
        <label for="adresse">Adresse</label>
        <input
            id="adresse"
            v-model="adresse"
            type="text"
            name="adresse"
        >
      </p>
      <p>
        <label for="arrondissement">Arrondissement</label>
        <input
            id="arrondissement"
            v-model="arrondissement"
            type="text"
            name="arrondissement"
        >
      </p>
      <p>
        <label for="annee">Année</label>
        <input
            id="annee"
            v-model="annee"
            type="text"
            name="annee"
        >
      </p>


      <p>
      <button v-on:click="changeLocations()">Submit</button>
      </p>

    </div>

    <table class="table table-striped table-bordered" v-if="locationList === true">
      <thead>
      <tr>
        <th>Lieu de tournage</th>
        <th><button v-if="admin === true" v-on:click="addForm = true">Add</button></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="location in locations" :key="location.id" >
        <td v-on:click="rowClick(location)">{{location.adresse_lieu}}</td>
        <td><button v-on:click="deleteEvent(location._id)">Delete</button></td>
        <td><button v-on:click="editEvent(location)">Edit</button></td>
<!--        <td>{{location.annee_tournage}}</td>
            <td>{{location.nom_realisateur}}</td>-->
      </tr>
      </tbody>
    </table>
  </div>

</template>
<script>

import {getLocations, deleteLocation, addLocation, userService} from "../_services";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {router} from "../_helpers";

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
          if(localStorage.getItem('role') === 'admin'){
            this.admin = true;
          }
        })
    console.log(localStorage.getItem('role'));
  },
  data() {
    return {
      nomFilm:false,
      debutFilmage:false,
      finFilmage:false,
      typeFilm:false,
      nomProducteur:false,
      nomRealisateur:false,
      adresse:false,
      arrondissement:false,
      annee:false,
      currentItem:true,
      locations: null,
      loaded: false,
      showModal:false,
      locationList:false,
      addForm:false,
      editForm:false,
      admin:false,
      currentLocation:null
    };
  },
  methods: {
    changeLocations(){
      console.log("start");
      if(this.editForm === true){
        this.currentItem = {};
        this.currentItem._id = this.currentLocation
        this.currentItem.nom_tournage = this.nomFilm
        this.currentItem.date_debut = this.debutFilmage
        this.currentItem.date_fin = this.finFilmage
        this.currentItem.type_tournage = this.typeFilm
        this.currentItem.nom_producteur = this.nomProducteur
        this.currentItem.nom_realisateur = this.nomRealisateur
        this.currentItem.adresse_lieu = this.adresse
        this.currentItem.ardt_lieu = this.arrondissement
        this.currentItem.annee_tournage = this.annee
        return userService.editLocation(this.currentItem);
      }else if (this.addForm === true){
        this.currentItem = {};
        this.currentItem.nom_tournage = this.nomFilm
        this.currentItem.date_debut = this.debutFilmage
        this.currentItem.date_fin = this.finFilmage
        this.currentItem.type_tournage = this.typeFilm
        this.currentItem.nom_producteur = this.nomProducteur
        this.currentItem.nom_realisateur = this.nomRealisateur
        this.currentItem.adresse_lieu = this.adresse
        this.currentItem.ardt_lieu = this.arrondissement
        this.currentItem.annee_tournage = this.annee
        return userService.addLocation(this.currentItem);
      }

    },
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
  editEvent(location){
    this.currentItem = location;
    this.currentLocation = location._id
    this.nomFilm = location.nom_tournage;
    this.debutFilmage =location.date_debut;
    this.finFilmage = location.date_fin;
    this.typeFilm = location.type_tournage;
    this.nomProducteur = location.nom_producteur;
    this.nomRealisateur = location.nom_realisateur;
    this.adresse = location.adresse_lieu;
    this.arrondissement = location.ardt_lieu;
    this.annee = location.annee_tournage;
    this.editForm = true;

  }
  },
};
</script>

<style scoped>

</style>