import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  standalone: false,
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  constructor(
    private musicService: MusicDataService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  //properties
  album: any;
  albumId: any;
  addToFav: boolean = false;
  paramSub: Subscription | undefined;
  albumSub: Subscription | undefined;

  //methods
  public addToFavourites(trackID: any): void {
    this.addToFav = this.musicService.addToFavourites(trackID);

    if (this.addToFav === true) {
      this.snackBar.open('Adding to Favorites...', 'Done', {
        duration: 1500,
      });
    } else {
      this.snackBar.open('Unable to add song to Favourites', '', {
        duration: 1500,
      });
    }
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
      });
  }
}
