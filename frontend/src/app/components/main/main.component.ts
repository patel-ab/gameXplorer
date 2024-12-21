import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Game } from '../../model/class/Game';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-main',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  game: Game | null = null;
  currentImage: string = '';
  imageIndex: number = 0;
  currentName = '';

  imageMapping: Record<string, string> = {
    steam: 'steam.png',
    playstationstore: 'playStation.webp',
    xboxstore: 'xbox.jpg',
    appstore: 'appStore.png',
    gog: 'gog.png',
    nintendostore: 'nintendo.jpg',
    xbox360store: 'xbox360.jpg',
    googleplay: 'googlePlay.jpg',
    itchio: 'itchio.png',
    epicgames: 'epicGames.png',
  };

  urlMapping: Record<string, string> = {
    steam: environment.Steam,
    playstationstore: environment.PlayStationStore,
    xboxstore: environment.XboxStore,
    appstore: environment.AppStore,
    gog: environment.GOG,
    nintendostore: environment.NintendoStore,
    xbox360store: environment.Xbox360Store,
    googleplay: environment.GooglePlay,
    itchio: environment.itchio,
    epicgames: environment.EpicGames,
  };

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const state = history.state;
    this.currentName = this.sharedService.currentName;
    console.log("Inside main component - Name = ", this.currentName);

    // if (state?.userName) {
    //   this.currentName = state.userName;
    //   console.log('Received User Name', this.currentName);
    // }
    if (state?.gameObj) {
      this.game = state.gameObj;
      console.log('Received Game Object:', this.game);

      if (
        this.game &&
        this.game.screenshots &&
        this.game.screenshots.length > 0
      ) {
        console.log('Inside Image function', this.game);
        this.currentImage = this.game.screenshots[0];
        this.cdr.detectChanges();
        this.startImageSlider();
      }
    }
  }

  startImageSlider(): void {
    setInterval(() => {
      if (this.game && this.game.screenshots.length > 0) {
        this.imageIndex = (this.imageIndex + 1) % this.game.screenshots.length; // Cycle through images
        this.currentImage = this.game.screenshots[this.imageIndex];
      }
    }, 3000);
  }

  goHome() {
    this.router.navigate(['/home'], { state: { currentName: this.currentName } });
  }

  getLogoFileName(storeName: string): string {
    const formattedStoreName = storeName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');

    return this.imageMapping[formattedStoreName] || 'white.jpeg';
  }

  getStoreUrl(storeName: string) {
    const formattedStoreName = storeName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');

    return this.urlMapping[formattedStoreName] || '/home';
  }

  addToFavourites() {
    const payload = {
      userId: this.currentName,
      game_id: this.game?.id,
      game_name: this.game?.name,
      game_screenshots: this.game?.screenshots,
    };
    console.log('Sending payload', payload);
    this.http.post('http://127.0.0.1:8000/api/favourite/', payload).subscribe({
      next: (response: any) => {
        console.log('Successfully sent to backend', response);
        alert("Added to favourites");
      },
      error: (error) => {
        console.error('Error sending to backed', error.message);
        alert(error.error.message);
      },
    });
  }
}
