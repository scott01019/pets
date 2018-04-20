import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs/Observable';
import { Pet } from './pet';

@Injectable()
export class PetsHttpService {

  constructor(private http : HttpClient) { }

  getPets() : Observable<any> {
    return this.http.get<any>("/pets")
  }

  getPet(id : string) : Observable<any> {
    return this.http.get<any>("/pets/" + id)
  }

  createPet(pet : Pet) : Observable<any> {
    return this.http.post<any>("/pets/", pet)
  }

  updatePet(pet : Pet) : Observable<any> {
    return this.http.put<any>("/pets/" + pet._id, pet)
  }

  deletePet(id : string) : Observable<any> {
    return this.http.delete<any>("/pets/" + id)
  }
}
