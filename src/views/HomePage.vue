<template>
  <ion-page>
    <ion-header class="center">
      <ion-toolbar color="dark">
        <ion-title>Ma météo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid style="height: 100%">
        <ion-row justify-content-center align-items-center style="height: 10%">
          <ion-item id="item">
            <ion-label>Ville</ion-label>
            <ion-select placeholder="Choisir" v-model="ville" @ionChange="getMeteo">
            <ion-select-option value="Montréal">Montréal</ion-select-option>
              <ion-select-option value="Bangkok">Bangkok</ion-select-option>
              <ion-select-option value="Paris">Paris</ion-select-option>
              <ion-select-option value="Motueka">Motueka</ion-select-option>
              <ion-select-option value="Position">Position actuelle</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-row>
      
        <ion-row justify-content-center align-items-center style="height: 90%">
          <ion-card fullscreen="true">
            <h6>{{this.date}}</h6>
            <ion-card-header>
              <ion-card-title id="title">{{this.city}}</ion-card-title>
            </ion-card-header>
            <ion-img :src="this.imageSrc" id="img"></ion-img>
            <ion-card-content id="temp">{{this.temp}}°C</ion-card-content>
            <ion-card-content id="ressenti">Ressenti: {{this.ressenti}} °C </ion-card-content>
            <ion-card-content id="description" class="ion-text-capitalize">{{ this.description }}</ion-card-content>
          </ion-card>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-footer class="center">
      <ion-toolbar color="dark">
        <ion-title>© Franck Stefani</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  loadingController,
  IonSelectOption,
  IonSelect,
  IonImg,
  IonLabel,
  IonCard
} from "@ionic/vue";
import { defineComponent } from "vue";
import { Geolocation } from "@capacitor/geolocation";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonSelectOption,
    IonSelect,
    IonImg,
    IonLabel,
    IonCard
  },

  data() {
    return {
      ville: "Montreal",
      imageSrc: "",
      icon: "",
      temp: "",
      ressenti: "",
      city: "",
      date: "",
      description: "",
      latitude: 0,
      longitude: 0,
    };
  },

  ionViewDidEnter() {
    console.log("Home page did Enter");
    this.getMeteo();
    this.getCurrentPosition();
  },

  methods: { 
    async getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("Current", coordinates);
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    },
    
    async getMeteo() {
      const loading = await loadingController.create({
        message: "Attendre SVP...",
      });

      let url = "";

      await loading.present();

      if (this.ville == "Position") {
        await this.getCurrentPosition();
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=7969203b60a64757a483c5a88e4ebd7d&units=metric&lang=fr`;
      }
      else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${this.ville}&appid=7969203b60a64757a483c5a88e4ebd7d&units=metric&lang=fr`;
      }

        fetch(url)
          .then((reponse) => reponse.json())
          .then((data) => {
            console.log(data);
            const date = new Date(data.dt * 1000);
            const mois = ["Janvier","Février","Mars", "Avril", "Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
            const jours = ["Dimanche", "Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
            const year = date.getFullYear();
            const month = mois[date.getMonth()];
            const dayMonth = date.getDate();
            const dayWeek = jours[date.getDay()];

            this.city = data.name;
            this.temp = data.main.temp;
            this.ressenti = data.main.feels_like;
            this.description = data.weather[0].description;
            this.icon = data.weather[0].icon;
            this.imageSrc = `http://openweathermap.org/img/wn/${this.icon}.png`;
            this.date = `${dayWeek}, ${dayMonth} ${month} ${year}`;

            loading.dismiss();
          });
    },
  },
});
</script>

<style scoped>

ion-page {
height: max-content;
}

ion-content {
  --ion-font-family: 'Knewave', cursive;
  --background: url(/public/assets/images/city.jpg);
  background-size: cover;
}

ion-card {
  --background: url(/public/assets/images/fond.jpg);
  background-size: cover;
  text-align: center;
  width: 75%;
  margin: auto;
  color: black;
}

ion-item {
  --background: transparent;
  width: 75%;
  justify-content: center;
  margin:auto;
  color: whitesmoke;
}

ion-select ::part(placeholder) {
  color: whitesmoke;
}


#img {
  height: 65%;
  width: 65%;
  display: block;
  margin: auto;
}

#item{
font-size: 1.25em;
}

#temp {
font-size: 3em;
}

#ressenti {
font-size: 2em;
}

#description {
font-size: 2em;
}

#title {
font-size: 3em;
color: black;
}

.center {
text-align: center;
}

</style>
