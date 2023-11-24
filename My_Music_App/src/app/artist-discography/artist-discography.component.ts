import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import albumData from '../data/SearchResultsAlbums.json';
import artistData from '../data/SearchResultsArtist.json';

@Component({
  selector: 'app-artist-discography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-discography.component.html',
  styleUrl: './artist-discography.component.scss',
})
export class ArtistDiscographyComponent implements OnInit {
  constructor() {}
  albums: any;
  artist: any;
  ngOnInit() {
    this.artist = artistData;

    // filter out duplicate album names
    this.albums = albumData.items.filter(
      (curValue, index, self) =>
        self.findIndex(
          (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
        ) === index
    );
  }
}
