import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Pettytype } from '../models/pettytype';

@Injectable({
  providedIn: 'root'
})
export class PettytypeService {

  private url = environment.API_URL;

  constructor(private http: HttpClient) { }

  listarPettytypes() {
    let parametro = JSON.stringify({
      accion: "ListarPettypes"
    });
    return this.http.post<Pettytype[]>(this.url, parametro);
  }

  seleccionarType(id: number) {
    console.log("Estamos en seleccionar type por id");
    let parametro = JSON.stringify({
      accion: "ObtenerPetId",
      id: id
    })
    console.log(parametro)
    return this.http.post<Pettytype>(this.url, parametro);
  }

  anadirPettytypes(type: Pettytype) {
    let parametro = JSON.stringify({
      accion: "AnadePettype",
      pettype: type
    });
    return this.http.post<Pettytype>(this.url, parametro);
  }

  modificarPettytypes(type: Pettytype) {
    let parametro = JSON.stringify({
      accion: "ModificaPettype",
      pettype: type
    });
    return this.http.post<Pettytype[]>(this.url, parametro);
  }

  borrarPettytypes(type: Pettytype) {
    let parametro = JSON.stringify({
      accion: "BorraPettype",
      id: type.id
    });
    return this.http.post<Pettytype>(this.url, parametro);
  }

}
