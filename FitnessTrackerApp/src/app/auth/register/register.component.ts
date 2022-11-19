import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {

  public formSubmitted = false;
  public checkTerminos = false;

  public registerForm = this.fb.group({
    nombre:[ 'Alvaro', Validators.required ],
    email:[ 'test@test.com', [Validators.required , Validators.email] ],
    password:[ '123456', Validators.required ],
    passwordTwo:[ '123456', Validators.required ],
    terminos:[ this.checkTerminos, Validators.required ]
  },{
    validators: [this.passwordsIguales('password', 'passwordTwo'), this.switchValido('terminos')]
  }
  );

  constructor( private router: Router,
               private fb: FormBuilder,
               private userService: UserService) { }

  crearUsuario () {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return
    } 

    //realizar la creacion
    this.userService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          
          this.router.navigateByUrl('/');
          
        }, (err) => console.warn(err.error.msg)
    );
  
  }

  campoNoValido( campo : string): boolean{
    if (this.registerForm.get(campo).invalid && this.formSubmitted){
      return true 
    } else {
      return false
    }
  }

  aceptaTerminos(){
    return this.registerForm.get('terminos').value && this.formSubmitted;
  }

  switch() {
    this.checkTerminos = !this.checkTerminos;
    this.registerForm.get("terminos").setValue(this.checkTerminos);
    
  }

  switchValido(state: any) {
    return ( formGroup: FormGroup ) => {

      const terminosControl = formGroup.get(state);

      if (terminosControl.value) {
        terminosControl.setErrors(null);
      } else {
        terminosControl.setErrors({ esVerdadero: true})
      }
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('passwordTwo').value

    if ( pass1 === pass2 && this.formSubmitted ) {
      return false
    } else {
      return true
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true})
      }
    }
  }

  


}