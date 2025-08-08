import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialty } from '../models/specialty';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  //private url: string = "http://localhost/serviciosWebs/petClinic/servicios.php"
  private url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  listarSpecialties() {
    console.log("Estamos en listar vets");
    let parametro = JSON.stringify({
      accion: "ListarSpecialties"
    });
    return this.http.post<Specialty[]>(this.url, parametro);
  }


}
