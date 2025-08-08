import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';
import { environment } from '../../environments/environment.development';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  listarPets(id_owner: number) {
    let parametro = JSON.stringify({
      accion: "ListarPetsOwnerId",
      id: id_owner
    })
    //console.log(parametro)
    return this.http.post<any>(this.url, parametro);
  }

  // seleccionarPets(id_owner: number, id_pet: number) {
  //   let variable: any;
  //   let parametro = JSON.stringify({
  //     accion: "ObtenerOwnerId",
  //     id: id_owner
  //   })
  //   if (parametro) {
  //     let parametro2 = JSON.stringify({
  //       accion: "ObtenerOwnerId_Pets",
  //       id: id_pet
  //     })
  //     variable = this.http.post<any>(this.url, parametro2)
  //   }
  //   console.log(variable)
  //   return variable;
  // }
  borrarPet(pet: Pet) {
    console.log("Estamos en borrar pets");
    let parametro = JSON.stringify({
      accion: "BorraPet",
      id: pet.id,
      listado: "OK"
    });
    console.log(parametro);
    return this.http.post<Pet[]>(this.url, parametro);
  }

  seleccionarPet(id: number) {
    console.log("Estamos en seleccionar pet por id");
    let parametro = JSON.stringify({
      accion: "ObtenerPetId",
      id: id
    })
    console.log(parametro)
    return this.http.post<Pet>(this.url, parametro);
  }

  modificarPet(pet: Pet) {
    console.log("Estamos en modificar pets");
    let parametro = JSON.stringify({
      accion: "ModificaPet",
      pet: pet
    });
    return this.http.post<any[]>(this.url, parametro);
  }

  anadePets(pet: Pet) {
    console.log("Estamos en anadir Pets");
    let parametro = JSON.stringify({
      accion: "AnadePet",
      pet: pet
    });
    console.log(parametro)
    return this.http.post<Pet[]>(this.url, parametro);
  }
}
