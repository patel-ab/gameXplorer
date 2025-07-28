import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
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
  currentImages: string[] = [];
  screenshots: string[] = [];
  imageIndex = 0;
  currentBackgroundImage: string = '';

  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.currentName = this.sharedService.currentName;
    console.log('Inside home component - Name = ', this.currentName);
    this.fetchScreenShot(this.currentName);
  }

  startImageSlider(): void {
    this.updateImages();
    setInterval(() => {
      this.updateImages();
    }, 3000);
  }
  updateImages(): void {
    if (this.screenshots.length > 0) {
      const currentIndex = this.imageIndex % this.screenshots.length;
      this.currentBackgroundImage = `url('${this.screenshots[currentIndex]}')`;
      // Update for the next image
      this.imageIndex = (this.imageIndex + 1) % this.screenshots.length;
    }
  }

  areScreenshotsAvailable(): boolean {
    console.log("Length is", this.screenshots.length)
    return this.screenshots.length > 0;
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

  fetchScreenShot(user_id: string) {
    this.http
      .get(`${environment.apiUrl}/api/favourites/screenshots/user/${user_id}`)
      .subscribe({
        next: (response: any) => {
          this.screenshots = response;
          console.log('Data received from backend', response);
          if (this.screenshots.length > 0) {
            this.startImageSlider();
          }
        },
        error: (error) => {
          console.log('Error occurred:', error);
        },
      });
  }
}
