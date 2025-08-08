import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formulario: FormGroup;

  public loginIncorrecto: boolean =false;

  constructor(private servicioLogin: LoginService,
    private servicioUpdateMenu: UpdateMenuService,
    private ruta: Router, private fb: FormBuilder){

      this.formulario = this.fb.group({
        email: this.fb.control('alejandro@gmail.com', Validators.required),
        clave: this.fb.control("", Validators.required)
      });
    }

    ngOnInit(){

    }
}
