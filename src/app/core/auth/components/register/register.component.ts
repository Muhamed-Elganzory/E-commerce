import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import {NgClass} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ValidationMessagesComponent,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  isShowPassword: boolean = true;

  formInit(): void{
    // name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)] );
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      rePassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.formInit();
  }

  passwordMatchValidator(control: AbstractControl)  {
    // return control.get('password')?.value == control.get('rePassword')?.value? null  : {mismatch: true};
    let password = control.get('password')?.value;
    let rePassword = control.get('rePassword')?.value;

    if(password == rePassword){
      return null;
    }else{
      return {
        mismatch: true,
      }
    }
  }

  submitForm(): void{
    this.isLoading = true;
    if(this.registerForm.valid && this.isLoading){
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any)=>{
          console.log(response);
          if(response.message == 'success'){
            console.log(response);
            this.router.navigate(['/login']);
          }
        },
        error: (error: any) => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.errorMessage = '';
          this.successMessage = 'Success';
          this.registerForm.reset();
          this.isLoading = false;
        }
      })
    }else{
      this.registerForm.get('rePassword')?.setValue(null);
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
    }
  }

  showPassword(){
    this.isShowPassword = !this.isShowPassword;
  }
}
