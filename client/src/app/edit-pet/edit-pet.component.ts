import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetsHttpService } from '../pets-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  pet : Pet = new Pet()
  errors : string[] = []

  constructor(private petHttp : PetsHttpService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.petHttp.getPet(this.route.snapshot.params["id"]).subscribe((data) => {
      if (data.message == "success") this.pet = data.data
    })
  }

  editPetClicked() {
    if (this.pet.type) this.pet.type = this.pet.type.charAt(0).toUpperCase() + this.pet.type.slice(1).toLowerCase();
    this.petHttp.updatePet(this.pet).subscribe((data) => {
      if (data.message == "success") {
        this.router.navigate(["details", this.pet._id])
      } else {
        this.errors = data.error
      }
    })
  }
}
