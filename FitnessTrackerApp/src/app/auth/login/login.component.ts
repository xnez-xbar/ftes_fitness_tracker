import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public checkRemember = false;


  public loginForm = this.fb.group({
    email:[ localStorage.getItem( 'email' ) || '' , [ Validators.required , Validators.email ] ],
    password:[ '', Validators.required ],
    remember:[ this.checkRemember ],
  },{
    validators: this.switchValido('remember')
  }
  );


  constructor( private router: Router,
               private fb: FormBuilder,
               private userService: UserService ) { }


  login() {

    this.userService.login(this.loginForm.value)
        .subscribe( resp => {
          if ( this.loginForm.get( 'remember' ).value ) {
            localStorage.setItem( 'email', this.loginForm.get('email').value )
            
          } else {
            localStorage.removeItem( 'email')

          }
          //Navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => console.warn(err.error.msg)
    );

  }

  switch() {
    
    this.checkRemember = !this.checkRemember;
    console.log('this.checkRemember: ', this.checkRemember);
    this.loginForm.get("remember").setValue(this.checkRemember);
    
  }

  switchValido(state: any) {
    return ( formGroup: FormGroup ) => {

      const rememberControl = formGroup.get(state);

      if (rememberControl.value) {
        rememberControl.setErrors(null);
      } else {
        rememberControl.setErrors({ esVerdadero: true})
      }
    }
  }

}
