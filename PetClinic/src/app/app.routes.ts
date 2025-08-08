import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OwnersComponent } from './components/owners/owners.component';
import { DetailOwnerComponent } from './components/detail-owner/detail-owner.component';
import { FormOwnerComponent } from './components/form-owner/form-owner.component';
import { VetsComponent } from './components/vets/vets.component';
import { FormVetComponent } from './components/form-vet/form-vet.component';
import { PetsComponent } from './components/pets/pets.component';
import { FormPetComponent } from './components/form-pet/form-pet.component';
import { PettytypesComponent } from './components/pettytypes/pettytypes.component';
import { FormPettytypeComponent } from './components/form-pettytype/form-pettytype.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "owners",
        component: OwnersComponent
    },
    {
        path: "ver-owner/:id",
        component: DetailOwnerComponent
    },
    {
        path: "anadir-owner/:id",
        component: FormOwnerComponent
    },
    {
        path: "vets",
        component: VetsComponent
    },
    {
        path: "anadir-vet/:id",
        component: FormVetComponent
    },
    {
         path: "pets",
         component: PetsComponent
    },
    {
        path: "anadir-pet/:id",
        component: FormPetComponent
    },
    {
        path: "pettytypes",
        component: PettytypesComponent
    },
    {
        path: "anadir-pettytype/:id",
        component: FormPettytypeComponent
    },
    ];
