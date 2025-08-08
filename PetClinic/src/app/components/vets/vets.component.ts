import { Component } from '@angular/core';
import { VetService } from '../../services/vet.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Vet } from '../../models/vet';

@Component({
  selector: 'app-vets',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vets.component.html',
  styleUrl: './vets.component.css'
})
export class VetsComponent {
  public listaVets: Vet[] = [];
  public vet: Vet;

  constructor(private peticion: VetService, private ruta: Router,
    private ruta_activa: ActivatedRoute) {
    /*
    this.vet = {
      id: -1,
      firstName: "",
      lastName: "",
      specialties: []
    }*/
    //OTRA FORMA DE ESCRIBIR UN CONSTRUCTOR CON PARAMETROS VACIOS
    this.vet = <Vet>{};

    this.peticion.listarVets().subscribe({
      next: datos => { this.listaVets = datos },
      error: error => console.log(error)
    });

    // console.log(datos, "Estamos en listar de vets.component");

  }

  borrarVet(vet: Vet) {
    console.log(vet.id, "Estamos en borrar de vets.component");
    if (confirm("Vet que se va a borrar: " + vet.firstName)) {
      this.peticion.borrarVets(vet).subscribe(resultado_borrar => {
        // DA LO CORRECTO, PERO HAY QUE HACERLO DE MODO FILTER
        this.peticion.listarVets().subscribe(datos => {
          this.listaVets = datos;
          console.log(datos);
        })
      });
    }
  }

  irNuevoUModificarVet() {
    this.ruta.navigate(['anadir-vet/', -1]);
  }
}