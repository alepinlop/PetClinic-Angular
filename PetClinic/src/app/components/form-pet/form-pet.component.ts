import { Component } from '@angular/core';
import { Pet } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pettytype } from '../../models/pettytype';
import { PettytypeService } from '../../services/pettytype.service';

@Component({
  selector: 'app-form-pet',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './form-pet.component.html',
  styleUrl: './form-pet.component.css'
})
export class FormPetComponent {

  public pet: Pet;
  public textoBoton: string;
  public listaTypes: Pettytype[] = [];

  @Input()
  public id_owner: any;

  constructor(private peticion: PetService, private ruta: Router, private ruta_activa: ActivatedRoute, private peticionTypes: PettytypeService) {
    this.pet = <Pet>{}

    this.textoBoton = "Añadir";
    this.peticionTypes.listarPettytypes().subscribe({
      next: (res) => this.listaTypes = res,
      error: error => console.log(error)
    })
  }

  ngOnInit() {
    this.pet.id = this.ruta_activa.snapshot.params["id"];
    console.log("id: " + this.pet.id);

    if (this.pet.id == -1) {
      this.textoBoton = "Añadir";
    } else {
      this.textoBoton = "Modificar";

      this.peticion.seleccionarPet(this.pet.id).subscribe({
        next: pet => {console.log(pet); this.pet = pet},
        error: error => console.log(error)
      })
    }
  }


  onSubmit(pet: Pet) {
    console.log("Formulario enviado " + pet);
    if (this.pet.id == -1) {
      this.peticion.anadePets(pet).subscribe(datos_insertar =>
        this.ruta.navigate(['/pets'])
      );
    } else {
      let petModificar: Pet = {
        id: this.pet.id,
        name: this.pet.name,
        birthDate: this.pet.birthDate,
        typeName: this.pet.typeName,
        ownerId: this.pet.ownerId
      }
      this.peticion.modificarPet(petModificar).subscribe(datos_modificar =>
        this.ruta.navigate(['/pets'])
      );
    }
  }
}