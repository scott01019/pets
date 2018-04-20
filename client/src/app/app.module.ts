import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PetsComponent } from './pets/pets.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { DetailsPetComponent } from './details-pet/details-pet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms"
import { PetsHttpService } from './pets-http.service';


@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    NewPetComponent,
    EditPetComponent,
    DetailsPetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PetsHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
