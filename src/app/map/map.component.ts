import { Component, OnInit } from '@angular/core';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import { FormControl,Validators } from '@angular/forms';

class  Modales {
  titulo: string;
  descripcion: string;
  url: string;
  Lat: number;
  Lng: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  map: Map;
  Marcadores:Array<Modales>=[];
  titulo = new FormControl('',[Validators.minLength(2),Validators.maxLength(25),Validators.required])
  descripcion = new FormControl('',[Validators.minLength(10),Validators.maxLength(250),Validators.required])
  url = new FormControl('',[Validators.minLength(15),Validators.required])
  lat = new FormControl(0)
  lng = new FormControl(0)


  clearValues(){
    this.titulo.setValue('');
    this.descripcion.setValue('');
    this.url.setValue('');
    this.lat.setValue(0);
    this.lng.setValue(0);
  }

  constructor() { }

  ngOnInit(): void {
    this.initializeMapOptions();
  }


  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
    this.map.doubleClickZoom.disable()
  }

  setMarker(event){
  console.log("---coordenadas en el onclick event---")
  console.log(this.map.mouseEventToLatLng(event))
  let Coords = this.map.mouseEventToLatLng(event);

  this.lat.setValue(Coords.lat);
  this.lng.setValue(Coords.lng);

  let element: HTMLElement = document.getElementById('modalHidden') as HTMLElement;
  element.click();
  }

  onSave(){
let Puntos= new Modales();
  Puntos.titulo=this.titulo.value
  Puntos.descripcion=this.descripcion.value
  Puntos.url=this.url.value
  Puntos.Lat=this.lat.value;
  Puntos.Lng=this.lng.value
  this.Marcadores.push(Puntos)
  let element: HTMLElement = document.getElementById('cerrar') as HTMLElement;
  element.click();
  console.log("---puntos guardados---")
  console.log(this.Marcadores)
  this.guardarPunto(Puntos)
  }

  guardarPunto(Punto){
    let marker = new Marker([this.lat.value,this.lng.value])
      .setIcon(
        icon({
          iconSize: [40, 40],
          iconAnchor: [13, 41],
          iconUrl: 'assets/icon.png'
        }));

      let card=`<div class="card" style="width:100%;">
      <img src="${this.url.value}" class="card-img-top" style="">
      <div class="card-body">
        <h5 class="card-title">${this.titulo.value}</h5>
        <p class="card-text">${this.descripcion.value}</p>
        <p class="card-text"><small class="text-muted">Coordenadas:[${this.lat.value},${this.lng.value}]</small></p>
      </div>
    </div>`

        marker.addTo(this.map);
        marker.bindPopup(card).openPopup();

        this.clearValues()
  }



  private addSampleMarker() {
    let marker = new Marker([6.2703204,-75.5657608])
      .setIcon(
        icon({
          iconSize: [40, 40],
          iconAnchor: [13, 41],
          iconUrl: 'assets/icon.png'
        }));

        marker.addTo(this.map);
        marker.bindPopup("<b>Estas en el Parque Explora!</b>"
        +"<br>Genial!"
        +'<br><small id="emailHelp" class="form-text text-muted">Haz doble click en cualquier parte para agregar más puntos!</small>'
        +"").openPopup();
  }


  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(6.2703204,-75.5657608),
      zoom: 16,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

}


