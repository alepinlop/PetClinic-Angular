import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Owner } from '../../models/owner';
import { PetsComponent } from '../pets/pets.component';

@Component({
  selector: 'app-detail-owner',
  standalone: true,
  imports: [FormsModule, RouterLink, PetsComponent],
  templateUrl: './detail-owner.component.html',
  styleUrl: './detail-owner.component.css'
})
export class DetailOwnerComponent {

  public owner: Owner;
  //public textoBoton: string;
  public listaOwner: Owner[] = [];

  constructor(private peticion: OwnerService, private ruta: Router, private ruta_activa: ActivatedRoute) {

    this.owner = {
      id: -1,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      telephone: "",
      pets: []
    };
    //this.textoBoton = "Añadir";
  }

  ngOnInit() {
    this.owner.id = this.ruta_activa.snapshot.params["id"];
    console.log("id: " + this.owner.id);

    // if (this.owner.id == -1) {
    //   this.textoBoton = "Añadir";
    // } else {
    //   this.textoBoton = "Modificar";

    this.peticion.seleccionarOwners(this.owner.id).subscribe({
      next: owner => { console.log(owner); this.owner = owner },
      error: error => console.log(error)
    })
    //}
  }

  onSubmit(owner: Owner) {
    console.log("Formulario enviado " + owner);
    if (this.owner.id != -1) {
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

  // borrarOwner(owner: Owner) {
  //   console.log(owner.id, "Estamos en borrar de owners.component");
  //   if (confirm("Owner que se va a borrar: " + owner.firstName)) {
  //     this.peticion.borrarOwners(owner).subscribe(resultado_borrar => {
  //       this.listaOwners = resultado_borrar;
  //     });
  //   }
  // }
}
