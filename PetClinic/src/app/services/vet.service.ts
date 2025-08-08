import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vet } from '../models/vet';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  private url = environment.API_URL;

  constructor(private http: HttpClient) { }

  listarVets() {
    console.log("Estamos en listar vets");
    let parametro = JSON.stringify({
      accion: "ListarVets"
    });
    return this.http.post<Vet[]>(this.url, parametro);
  }

  seleccionarVets(id: number) {
    console.log("Estamos en seleccionar vets por id");
    let parametro = JSON.stringify({
      accion: "ObtenerVetId",
      id: id
    })
    console.log(parametro)
    return this.http.post<Vet>(this.url, parametro);
  }

  anadirVets(vet: Vet) {
    console.log("Estamos en anadir vets");
    let parametro = JSON.stringify({
      accion: "AnadeVet",
      vet: vet
    });
    console.log(parametro)
    return this.http.post<Vet[]>(this.url, parametro);
  }

  modificarVets(vet: Vet) {
    console.log("Estamos en modificar vets");
    let parametro = JSON.stringify({
      accion: "ModificaVet",
      vet: vet
    });
    console.log(parametro)
    return this.http.post<Vet[]>(this.url, parametro);
  }

  borrarVets(vet: Vet) {
    console.log("Estamos en borrar vets");
    let parametro = JSON.stringify({
      accion: "BorraVet",
      id: vet.id,
    });
    console.log(parametro);
    return this.http.post<Vet[]>(this.url, parametro);
  }
}
