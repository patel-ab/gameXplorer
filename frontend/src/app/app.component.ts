import { Component, NgModule } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router) {}
  title = 'gameXplorer';
}
