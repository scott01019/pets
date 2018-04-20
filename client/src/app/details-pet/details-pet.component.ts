import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetsHttpService } from '../pets-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-pet',
  templateUrl: './details-pet.component.html',
  styleUrls: ['./details-pet.component.css']
})
export class DetailsPetComponent implements OnInit {
  
  pet : Pet = new Pet()
  likeButtonDisabled : boolean

  constructor(private petHttp : PetsHttpService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.likeButtonDisabled = false
    this.petHttp.getPet(this.route.snapshot.params["id"]).subscribe((data) => {
      if (data.message == "success") this.pet = data.data
    })
  }

  likeButtonClicked() {
    this.likeButtonDisabled = true
    this.pet.likes += 1
    this.petHttp.updatePet(this.pet).subscribe((data) => {
      if (data.message == "success") this.pet = data.data
    })
  }

  adoptButtonClicked() {
    this.petHttp.deletePet(this.pet._id).subscribe((data) => {
      if (data.message == "success") {
        this.router.navigate([""])
      }
    })
  }

}
