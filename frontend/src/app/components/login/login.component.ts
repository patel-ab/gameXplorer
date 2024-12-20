import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private sharedService: SharedService) {}

  data = {
    userId: '',
    password: '',
  };

  verifyLogin() {
    console.log('Sending Data', this.data);
    this.http.post('http://127.0.0.1:8000/api/login/', this.data).subscribe({
      next: (response: any) => {
        console.log('Login Successful', response);
        alert('Login Successful');
        console.log('Data being sent to state:', this.data);
        this.sharedService.currentName = this.data.userId;
        console.log('Shared Service Data', this.sharedService.currentName);
        this.router.navigate(['/home'], {state: { data: this.data }});
        this.data = { userId: '', password: '' };
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
