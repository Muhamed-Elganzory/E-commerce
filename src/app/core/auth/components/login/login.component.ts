import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ValidationMessagesComponent
} from '../../../../shared/components/validation-messages/validation-messages.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  isShowPassword: boolean = true;

  formInit(){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    });
  }

  submitForm(): void{
    this.isLoading = true;
    if(this.loginForm.valid && this.isLoading){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any)=>{
          console.log(response);
          if(response.message == 'success'){
            console.log(response);
            this.router.navigate(['/home']);
          }
        },
        error: (error: any) => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.errorMessage = '';
          this.successMessage = 'Success';
          this.loginForm.reset();
          this.isLoading = false;
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
      this.isLoading = false;
    }
  }

  showPassword(){
    this.isShowPassword= !this.isShowPassword;
  }

  ngOnInit() {
    this.formInit();
  }
}
