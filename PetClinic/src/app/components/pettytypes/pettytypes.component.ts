import { Component } from '@angular/core';
import { Pettytype } from '../../models/pettytype';
import { PettytypeService } from '../../services/pettytype.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormPettytypeComponent } from '../form-pettytype/form-pettytype.component';

@Component({
  selector: 'app-pettytypes',
  standalone: true,
  imports: [FormsModule, RouterLink, FormPettytypeComponent],
  templateUrl: './pettytypes.component.html',
  styleUrl: './pettytypes.component.css'
})
export class PettytypesComponent {

  public listarPettytypes: Pettytype[] = [];
  public showForm: boolean = false;
  public type: Pettytype = { id: -1, name: "" };

  constructor(private peticion: PettytypeService, ruta: Router, ruta_activa: ActivatedRoute) {
    this.peticion.listarPettytypes().subscribe({
      next: datos_pettytype => this.listarPettytypes = datos_pettytype,
      error: error => console.error(error)
    })
  }

  anadirForm() {
    this.showForm = !this.showForm;
  }

  editarForm() {
    this.showForm = !this.showForm;
  }

  onAnadirType(event: Pettytype) {
    this.listarPettytypes.push(event);
    console.log(event);
    this.anadirForm();
  }

  borrarPettytype(pettytype: Pettytype) {
    console.log("antes ", pettytype);
    if (confirm("¿Seguro que quieres borrar este dato? " + pettytype.name)) {
      this.peticion.borrarPettytypes(pettytype).subscribe({
        next: result => {
          console.log(result);
          let re = result as unknown as { result: string };
          if (re.result == "OK") {
            this.listarPettytypes = this.listarPettytypes.filter(t => t != pettytype);
          }
        },
        error: error => console.error(error)
      });
    }
  }

}
