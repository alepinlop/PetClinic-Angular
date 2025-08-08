import { Injectable } from '@angular/core';
import { Owner } from '../models/owner';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private url = environment.API_URL;
    

  constructor(private http: HttpClient) { }

  listarOwners() {
    console.log("Estamos en listar owners");
    let parametro = JSON.stringify({
      accion: "ListarOwners"
    });
    return this.http.post<Owner[]>(this.url, parametro);
  }

  seleccionarOwners(id: number) {
    console.log("Estamos en seleccionar owners por id");
    let parametro = JSON.stringify({
      accion: "ObtenerOwnerId",
      id: id
    })
    console.log(parametro)
    return this.http.post<Owner>(this.url, parametro);
  }

  anadirOwners(owner: Owner) {
    console.log("Estamos en anadir owners");
    let parametro = JSON.stringify({
      accion: "AnadeOwner",
      owner: owner
    });
    console.log(parametro)
    return this.http.post<Owner[]>(this.url, parametro);
  }

  modificarOwners(owner: Owner) {
    console.log("Estamos en modificar owners");
    let parametro = JSON.stringify({
      accion: "ModificaOwner",
      owner: owner
    });
    return this.http.post<Owner[]>(this.url, parametro);
  }

  borrarOwners(owner: Owner) {
    console.log("Estamos en borrar owners");
    let parametro = JSON.stringify({
      accion: "BorraOwner",
      id: owner.id,
      listado: "OK"
    });
    console.log(parametro);
    return this.http.post<Owner[]>(this.url, parametro);
  }

}
