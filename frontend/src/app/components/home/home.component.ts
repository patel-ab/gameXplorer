import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Game } from '../../model/class/Game';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  searchName = '';
  currentName = '';
  receivedObj: any;
  gameResults: any[] = [];
  finalResult: any[] = [];
  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;

  constructor(private router: Router, private http: HttpClient, private sharedService: SharedService) {}
  ngOnInit(): void {
    this.currentName = this.sharedService.currentName;
    console.log("Inside home component - Name = ", this.currentName);
  //   const state = history.state;
  //   if (state?.data) {
  //     this.receivedObj = state.data;
  //     console.log('Received Game Object:', this.receivedObj);
  //     this.currentName = this.receivedObj.userId;
  //     console.log('Received User Name :', this.currentName);
  //   } else {
  //     console.log('No gameObj found in the state');
  //   }
   }

  onSignOut() {
    const isSignOut = confirm('Do you want to sign out');
    if (isSignOut) {
      this.router.navigate(['/login']);
    }
  }

  prepareUrl(gameName: string): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&search=${gameName}`;

    return this.http.get<any>(url);
  }

  searchGame() {
    if (this.searchName.trim() === '') {
      return;
    }

    this.prepareUrl(this.searchName).subscribe({
      next: (response) => {
        this.gameResults = response.results;
        // logic for empty / null results
        console.log(this.gameResults);
        alert('Search Successful');
        this.searchName = '';
        this.finalResult = this.filterResults(this.gameResults);
        const gamePopulated = document.getElementById('games-populated');
        if (gamePopulated) {
          gamePopulated.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(this.finalResult);
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }

  filterResults(data: any[]): any[] {
    const topResults = data.sort((a, b) => b.rating - a.rating).slice(0, 4);

    return topResults.map((gameData) => new Game(gameData));
  }
}
