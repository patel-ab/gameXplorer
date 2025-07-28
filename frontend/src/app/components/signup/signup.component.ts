import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/class/User';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-signup',
  imports: [FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private router: Router, private http: HttpClient) {}

  userObj: User = new User();
  confirm_pwd = '';
  message = '';

  verifyPassword(): boolean {
    if (this.userObj.password === this.confirm_pwd) {
      return true;
    } else {
      return false;
    }
  }
  
  onSubmit() {
    if (this.verifyPassword()) {
     this.http.post(`${environment.apiUrl}/api/users`, this.userObj)
        .subscribe({
          next: (response: any) => {
            console.log('Form submitted successfully:', response);
            this.message = response.message;
            alert('Signup Successful - You can go to Login Page');
            this.router.navigate(['/login']);
            this.userObj = new User(); 
            this.confirm_pwd = '';
          },
          error: (error) => {
            console.error('Error submitting form:', error.message);
            if (error.error && error.error.message) {
              alert(error.error.message);
            } else {
              alert('An unexpected error occurred. Please try again.');
            }
          },
        });
    } else {
      console.log('Password verification failed. userObj:', this.userObj); 
      alert('Given passwords do not match');
    }
  }
}
