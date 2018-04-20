import { Component, OnInit } from '@angular/core';
import { PetsHttpService } from '../pets-http.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets : Pet[] = []

  constructor(private petsHttp : PetsHttpService) { }

  ngOnInit() {
    this.petsHttp.getPets().subscribe((data) => {
      if (data.message == "success") {
        this.pets = data.data
      }
    })
  }

  petValues() : Pet[] {
    return this.pets.sort((a : Pet, b : Pet) => {
      if (a.type < b.type) return -1
      if (a.type > b.type) return 1
      return 0
    })
  }

}
