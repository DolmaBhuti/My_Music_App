import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-artist-discography',
  standalone: false,
  templateUrl: './artist-discography.component.html',
  styleUrl: './artist-discography.component.scss',
})
export class ArtistDiscographyComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService,
    private title: Title
  ) {}
  albumsByArtist: any;
  artist: any;

  artistId: any;
  paramSub: Subscription | undefined;
  artistSub: Subscription | undefined;
  albumSub: Subscription | undefined;
  ngOnInit() {
    this.paramSub = this.activatedRoute.params.subscribe((par) => {
      this.artistId = par['id'];
    });

    this.artistSub = this.musicDataService
      .getArtistById(this.artistId)
      .subscribe((result) => {
        this.artist = result;
        //set title
        this.title.setTitle(this.artist.name);
        console.log(this.artist);
      });

    this.albumSub = this.musicDataService
      .getAlbumsByArtistId(this.artistId)
      .subscribe((result) => {
        this.albumsByArtist = result.items.filter(
          //// filter out duplicate album names
          (curValue: any, index: any, self: any) =>
            self.findIndex(
              (t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        );
      });
  }
  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    if (this.artistSub) {
      this.artistSub.unsubscribe();
    }
    if (this.albumSub) {
      this.albumSub.unsubscribe();
    }
  }
}
