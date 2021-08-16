import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //   {
  //   "Email": "hr@transit.com",
  //   "Password": "Aa@123456",
  //   "ConfirmPassword": "Aa@123456"
  // }
  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', Validators.required),
  });

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onUserLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.httpClient
      .post<any>(`${environment.BASE_URL}Account/login`, this.loginForm.value)
      .subscribe(
        (resData) => {
          this.router.navigate(['/home']);
          this.toastrService.success('Login Successfully');
          localStorage.setItem('userLogin', 'Login');
        },
        (err) => {
          this.toastrService.error('Enter Correct Email and password');
        }
      );
  }
}
