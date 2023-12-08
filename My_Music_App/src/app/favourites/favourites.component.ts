import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent implements OnInit, OnDestroy {
  constructor(private musicService: MusicDataService) {}

  favouritesList: Array<any> = [];
  private favSub: Subscription | undefined;
  private removeSubs: Subscription | undefined;

  public removeFromFavourites(id: any): void {
    this.removeSubs = this.musicService
      .removeFromFavourites(id)
      .subscribe((data) => {
        this.favouritesList = data.tracks;
      });
  }

  ngOnInit(): void {
    this.favSub = this.musicService.getFavourites().subscribe((data) => {
      this.favouritesList = data.tracks;
    });
  }
  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
    this.removeSubs?.unsubscribe();
  }
}
