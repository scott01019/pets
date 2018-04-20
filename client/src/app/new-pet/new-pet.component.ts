import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetsHttpService } from '../pets-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})

export class NewPetComponent implements OnInit {

  pet : Pet = new Pet()
  errors : string[] = []

  constructor(private petHttp : PetsHttpService, private router : Router) { }

  ngOnInit() {
  }

  submitPetClicked() {
    if (this.pet.type) this.pet.type = this.pet.type.charAt(0).toUpperCase() + this.pet.type.slice(1).toLowerCase();
    this.petHttp.createPet(this.pet).subscribe((data) => {
      if (data.message == "success") {
        this.router.navigate([""])
      } else {
        this.errors = data.error
      }
    })
  }

}
