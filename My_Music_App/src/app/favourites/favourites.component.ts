import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent implements OnInit, OnDestroy {
  constructor(private musicService: MusicDataService, private title: Title) {}

  favouritesList: Array<any> = [];
  private favSub: Subscription | undefined;
  private removeSubs: Subscription | undefined;

  public removeFromFavourites(id: any): void {
    this.removeSubs = this.musicService.removeFromFavourites(id).subscribe(
      (data) => {
        this.favouritesList = data.tracks;
        console.log('removed song from favs');
      },
      (err) => {
        console.log('Error removing song from favourties:', err);
      }
    );
  }
  //audio play button
  public play(preview_url: any): void {
    //get reference to audio tag
    const audioElement: HTMLAudioElement = <HTMLAudioElement>(
      document.getElementById('audio')
    );
    audioElement.setAttribute('src', preview_url);
    console.log('src attricute, ', preview_url);
    //play audio
    //if element is playing, pause it
    if (audioElement?.paused) {
      audioElement.play();
    }
  }

  //pause button function
  public stop(): void {
    //get reference to audio tag
    const audioElement: HTMLAudioElement = <HTMLAudioElement>(
      document.getElementById('audio')
    );
    audioElement.pause();
  }
  ngOnInit(): void {
    //set title
    this.title.setTitle('My Favourites');

    this.favSub = this.musicService.getFavourites().subscribe((data) => {
      this.favouritesList = data.tracks;
    });
  }
  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
    this.removeSubs?.unsubscribe();
  }
}
