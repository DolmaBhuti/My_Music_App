import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import albumData from '../data/SearchResultsAlbum.json';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  //properties
  album: any;
  constructor() {}
  ngOnInit(): void {
    this.album = albumData;
  }
}
