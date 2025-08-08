import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pettytype } from '../../models/pettytype';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PettytypeService } from '../../services/pettytype.service';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-form-pettytype',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './form-pettytype.component.html',
  styleUrl: './form-pettytype.component.css'
})
export class FormPettytypeComponent {

  public listaTypes: Pettytype[] = [];
  public textoBoton: string;
  public type: Pettytype = { id: -1, name: "" };
  @Output()
  public respuesta = new EventEmitter<Pettytype>();

  constructor(private peticion: PettytypeService, private ruta: Router, private ruta_activa: ActivatedRoute) {
    this.type = <Pettytype>{}

    this.textoBoton = "Añadir";
    this.peticion.listarPettytypes().subscribe({
      next: (res) => this.listaTypes = res,
      error: error => console.log(error)
    })

  }

  ngOnInit() {
    this.type.id = this.ruta_activa.snapshot.params["id"];
    console.log("id: " + this.type.id);

    if (this.type.id == -1) {
      this.textoBoton = "Añadir";
    } else {
      this.textoBoton = "Modificar";

      this.peticion.seleccionarType(this.type.id).subscribe({
        next: type => {console.log(type); this.type = type},
        error: error => console.log(error)
      })
    }
  }
  

  anadirType(type: Pettytype) {
    console.log(type);
    this.peticion.anadirPettytypes(type).subscribe({
      next: result => {
        console.log(result);
        this.respuesta.emit(result);
      },
      error: error => console.error(error)
    });
  }
  
}