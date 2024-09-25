import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/ilocation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'maps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  locations: Location[] = [];
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  zoom = 10;
  markers: { [key: number]: mapboxgl.Marker } = {}; 


  categories: string[] = ['restaurant', 'park', 'museum'];
  selectedCategories: string[] = [];
  selectedCategory: string = 'restaurant'; 


  constructor(private locationService: LocationService) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initializeMap();
      this.loadLocations();
    }
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
      accessToken: 'pk.eyJ1IjoieWFuYS1qcyIsImEiOiJjbTB3bmkxczkwMzEwMnNzNmR6YzN5dXY5In0.NOogDdPx-b1-wkMBw89YNg'
    });

    this.map.on('click', (event) => {
      const coordinates = event.lngLat;
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.addLocation(coordinates.lat, coordinates.lng);
    });
  }

  loadLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.updateMarkers();
    });
  }


  updateMarkers() {
    this.clearMarkers();
  
    this.locations
      .filter(location => this.selectedCategories.length === 0 || this.selectedCategories.includes(location.description))
      .forEach(location => {
        
        const iconUrl = this.getIconForCategory(location.description);
  
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.backgroundImage = `url(${iconUrl})`;
        el.style.width = '40px';   
        el.style.height = '40px';  
        el.style.backgroundSize = 'cover';  
  

        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .addTo(this.map);
  

        this.markers[location.idlocation!] = marker;
      });
  }

  

  getIconForCategory(category: string): string {
    switch (category) {
      case 'restaurant':
        return 'assets/icons/restaurant2.png';
      case 'park':
        return 'assets/icons/park2.png';
      case 'museum':
        return 'assets/icons/museum2.png'; 
      default:
        return './public/assets/icons/default.svg';
    }
  }
  
  addLocation(lat: number, lng: number) {
    const newLocation: Location = { latitude: lat, longitude: lng, description: this.selectedCategory };
    this.locationService.addLocation(newLocation).subscribe(
      location => {
        this.locations.push(location);
        this.updateMarkers(); 
      },
      error => {
        console.error("Error adding location:", error);
      }
    );
  }
  selectCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
  }
  

  deleteLocation(id: number | undefined) {
    if (id !== undefined) {
      this.locationService.deleteLocation(id).subscribe(
        () => {
          this.locations = this.locations.filter(location => location.idlocation !== id);
          this.clearMarkers();
          this.updateMarkers(); 
        },
        error => {
          console.error("Error deleting location:", error);
        }
      );
    } else {
      console.error("ID is undefined");
    }
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.updateMarkers(); 
  }

  clearMarkers() {
    Object.values(this.markers).forEach(marker => marker.remove());
    this.markers = {};
  }

}