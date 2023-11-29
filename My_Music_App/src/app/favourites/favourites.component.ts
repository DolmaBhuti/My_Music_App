import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  constructor(private musicService: MusicDataService) {}

  favouriteTracks: any;
  favSub: Subscription | undefined;
  removeFavSub: Subscription | undefined;

  public removeFromFavourites(trackId: any) {
    this.removeFavSub = this.musicService
      .removeFromFavourites(trackId)
      .subscribe(
        (result) => {
          this.favouriteTracks = result.tracks;
        },
        (err) => {
          console.log('Error removing track from favourites');
        }
      );
  }

  ngOnInIt(): void {
    this.favSub = this.musicService.getFavourites().subscribe(
      (result) => {
        console.log('favs result', result);
        this.favouriteTracks = result.tracks;
      },
      (err) => {
        console.error('Error getting favourites', err);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.favSub) {
      this.favSub.unsubscribe();
    }
  }
}
