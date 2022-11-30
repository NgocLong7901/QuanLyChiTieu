import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Đăng nhập thất bại';
  successMessage: string | undefined;
  invalidLogin = false;
  loginSuccess = false;
  loginForm: any = this.fb.group({
      username: [''],
      password: ['']
  });
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: any) => {
      var code = response.status;
      console.log("status code:" + code);
      if (code == 200) {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Đăng nhập thành công';
        this.authService.username = this.loginForm.value.username;
        this.authService.password = this.loginForm.value.password;
        this.authService.registerSuccessfulLogin(this.loginForm.value.username);
        localStorage.setItem('userId', response.body['id_user']);
        localStorage.setItem('user', JSON.stringify(response.body)); // lấy toàn bộ thông tin user         
        this.router.navigate(['/index']);
      }
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
