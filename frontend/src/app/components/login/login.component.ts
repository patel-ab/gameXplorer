import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}

  data = {
    userId: '',
    password: '',
  };

  verifyLogin() {
    console.log('Sending Data', this.data);
    this.http.post('http://127.0.0.1:8000/api/login/', this.data).subscribe({
      next: (response: any) => {
        console.log('Login Successful', response);
        this.data = { userId: '', password: '' };
        alert('Login Successful');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('An unexpected error occurred. Please login again.');
        }
      },
    });
  }
}
