import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vet } from '../../models/vet';
import { VetService } from '../../services/vet.service';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../models/specialty';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-form-vet',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './form-vet.component.html',
  styleUrl: './form-vet.component.css'
})
export class FormVetComponent {

  public vet: Vet;
  public textoBoton: string;
  public listaSpec: Specialty[] = [];

  constructor(private peticion: VetService, private ruta: Router, private ruta_activa: ActivatedRoute, private peticionSpecialty: SpecialtyService) {
    /*
    this.vet = {
      id: -1,
      firstName: "",
      lastName: "",
      specialties: []
    };*/

    //OTRA FORMA DE ESCRIBIR UN CONSTRUCTOR CON PARAMETROS VACIOS
    this.vet = <Vet>{};
    this.textoBoton = "Añadir";

    this.peticionSpecialty.listarSpecialties().subscribe({
      next: (res) => this.listaSpec = res,
      error: error => console.log(error)
    })
  }

  

  ngOnInit() {

    this.vet.id = this.ruta_activa.snapshot.params["id"];
    console.log("id: " + this.vet.id);

    if (this.vet.id == -1) {
      this.textoBoton = "Añadir";
    } else {
      this.textoBoton = "Modificar";

      this.peticion.seleccionarVets(this.vet.id).subscribe({
        next: vet => {
          console.log(vet); 
          this.vet = vet
          this.vet.specialties = environment.SeleccionarObjArray(this.listaSpec, vet.specialties);
        },
        error: error => console.log(error)
      })
    }
  }

  onSubmit(vet: Vet) {
    console.log("Formulario enviado " + vet);
    if (this.vet.id == -1) {
      this.peticion.anadirVets(vet).subscribe(datos_insertar =>
        this.ruta.navigate(['/vets'])
      );
    } else {
      let vetModificar: Vet = {
        id: this.vet.id,
        firstName: this.vet.firstName,
        lastName: this.vet.lastName,
        specialties: this.vet.specialties
      }
      this.peticion.modificarVets(vetModificar).subscribe(datos_modificar =>
        this.ruta.navigate(['/vets'])
      );
    }
  }
}

/*
  jsonEqual: function(a:any, b:any){
    return JSON.stringify(a) === JSON.stringify(b);
  },

  SeleccionarObj: function(lista:object[], obj:object){
    var res;
    lista.forEach(valor =>{
      if(environment.jsonEqual(valor, obj))
      res=valor;
    });
    return res;
  },

  SeleccionarObjArray: function(lista:Array<object>, objE:Array<object>){
    var res = new Array();
    objE.forEach(ele =>{
      lista.forEach(valor=>{
        if(environment.jsonEqual(valor, ele))
          res.push(valor);
      });
    });
  }
*/