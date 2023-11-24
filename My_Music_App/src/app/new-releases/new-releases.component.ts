import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../data/NewReleasesAlbums.json';

@Component({
  selector: 'app-new-releases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-releases.component.html',
  styleUrl: './new-releases.component.scss',
})
export class NewReleasesComponent implements OnInit {
  //properties
  releases: any;

  constructor() {}

  //invoked after component is initialized
  ngOnInit(): void {
    this.releases = data.albums.items;
  }
}
