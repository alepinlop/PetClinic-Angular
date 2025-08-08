import { Component } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {

  public listaOwners: Owner[] = [];
  public owner: Owner;

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
    }

    this.peticion.listarOwners().subscribe(datos => {
      console.log(datos, "Estamos en listar de owners.component");
      this.listaOwners = datos;
    });

  }

  borrarOwner(owner: Owner) {
    console.log(owner.id, "Estamos en borrar de owners.component");
    if (confirm("Owner que se va a borrar: " + owner.firstName)) {
      this.peticion.borrarOwners(owner).subscribe(resultado_borrar => {
        this.listaOwners = resultado_borrar;
      });
    }
  }

  irNuevoUModificarOwner() {
    this.ruta.navigate(['anadir-owner/', -1]);
  }
}
