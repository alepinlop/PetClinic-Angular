import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-form-owner',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './form-owner.component.html',
  styleUrl: './form-owner.component.css'
})
export class FormOwnerComponent {

  public owner: Owner;
  public textoBoton: string;

  constructor(private peticion: OwnerService, private ruta: Router, 
    private ruta_activa: ActivatedRoute) {

    this.owner = {
      id: -1,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      telephone: "",
      pets: []
    };
    this.textoBoton = "Añadir";
  }

  ngOnInit() {
    this.owner.id = this.ruta_activa.snapshot.params["id"];
    console.log("id: " + this.owner.id);

    if (this.owner.id == -1) {
      this.textoBoton = "Añadir";
    } else {
      this.textoBoton = "Modificar";

      this.peticion.seleccionarOwners(this.owner.id).subscribe({
        next: owner => {console.log(owner); this.owner = owner},
        error: error => console.log(error)
      })
    }
  }

  onSubmit(owner: Owner) {
    console.log("Formulario enviado " + owner);
    if (this.owner.id == -1) {
      this.peticion.anadirOwners(owner).subscribe(datos_insertar =>
        this.ruta.navigate(['/owners'])
      );
    } else {
      let ownerModificar: Owner = {
        id: this.owner.id,
        firstName: this.owner.firstName,
        lastName: this.owner.lastName,
        address: this.owner.address,
        city: this.owner.city,
        telephone: this.owner.telephone,
        pets: this.owner.pets
      }
      this.peticion.modificarOwners(ownerModificar).subscribe(datos_modificar =>
        this.ruta.navigate(['/owners'])
      );
    }
  }
}
