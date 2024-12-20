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

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {


  game: Game | null = null;
  currentImage: string = '';
  imageIndex: number = 0;


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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const state = history.state;
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
    this.router.navigate(['/home']);
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
      throw new Error('Method not implemented.');
      }


}
