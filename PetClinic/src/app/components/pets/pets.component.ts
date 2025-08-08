import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pet } from '../../models/pet';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {

  public listaPets: Pet[] = [];
  //pet: Pet;
  @Input()
  public idOwner: any;


  constructor(private peticion: PetService, private ruta: Router) {
    // this.pet = <Pet>{};
    // console.log(this.pet.owner)
  }

  ngOnChanges() {
    console.log("estoy en el onchange")
    console.log(this.idOwner)
    if (this.idOwner) {
      this.peticion.listarPets(this.idOwner).subscribe({
        next: datos_pets => { this.listaPets = datos_pets; console.log(datos_pets) },
        error: error => console.log(error)
      });
    }
  }

    borrarPet(pet: Pet) {
    console.log(pet.id, "Estamos en borrar de pet.component");
    if (confirm("Mascota que se va a borrar: " + pet.name)) {
      this.peticion.borrarPet(pet).subscribe(resultado_borrar => {
        this.listaPets = resultado_borrar;
      });
    }
  }

  irNuevoModificarPet() {
    this.ruta.navigate(['/anadir-pet/', -1]);
  }
}
