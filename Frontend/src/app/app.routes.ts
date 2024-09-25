import { Routes } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraficosComponent } from './components/graficos/graficos.component';

export const routes: Routes = [
   {path: '', component: ListaComponent},
   {path: 'add', component: AddProductComponent},
   {path: 'edit/:id', component: AddProductComponent},
   {path: 'maps', component: MapsComponent},
   {path: 'fullCalendar', component: CalendarComponent},
   {path: 'grafics', component: GraficosComponent},
   {path: '**', redirectTo: '', pathMatch: 'full'},
];
