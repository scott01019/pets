import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { DetailsPetComponent } from './details-pet/details-pet.component';

const routes: Routes = [
  { path: "", component: PetsComponent },
  { path: "new", component: NewPetComponent },
  { path: "edit/:id", component: EditPetComponent },
  { path: "details/:id", component: DetailsPetComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
