import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  standalone: false,
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  animations: [
    // animation triggers go here
  ],
})
export class AlbumComponent implements OnInit {
  constructor(
    private musicService: MusicDataService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  //properties
  leadArtistName: any;
  leadArtistId: any;

  album: any;
  albumId: any;
  addFavouriteSub: Subscription | undefined;
  paramSub: Subscription | undefined;
  albumSub: Subscription | undefined;

  //methods
  public addToFavourites(trackID: any): void {
    this.addFavouriteSub = this.musicService.addToFavourites(trackID).subscribe(
      (result) => {
        this.snackBar.open('Adding to Favorites...', 'Done', {
          duration: 1500,
        });
        console.log(result);
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', '', {
          duration: 1500,
        });
        console.log(err.message);
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
    //get id from params using activated route
    this.paramSub = this.activatedRoute.params.subscribe((params) => {
      this.albumId = params['id'];
      console.log(`Album ID is ${this.albumId}`);
    });
    //get data for the selected album
    // invoke the getAlbumById(id) method of the  MusicDataService (where id is the value of the "id" parameter) and subscribe to the returned Observable.
    this.albumSub = this.musicService
      .getAlbumById(this.albumId)
      .subscribe((result) => {
        console.log(result.images);
        this.album = result;
        this.leadArtistName = result.artists[0].name;
        this.leadArtistId = result.artists[0].id;
        console.log(this.leadArtistName + ' ' + this.leadArtistId);
      });
  }
  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
    this.addFavouriteSub?.unsubscribe();
    this.albumSub?.unsubscribe();
  }
}
