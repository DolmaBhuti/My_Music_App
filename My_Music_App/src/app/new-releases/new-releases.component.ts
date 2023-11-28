import { Component, OnInit, Input, OnDestroy } from '@angular/core';
//import data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-releases',
  standalone: false,
  templateUrl: './new-releases.component.html',
  styleUrl: './new-releases.component.scss',
})
export class NewReleasesComponent implements OnInit {
  //properties
  releases: any;
  private subscription: Subscription | undefined;
  constructor(private musicService: MusicDataService) {}

  //invoked after component is initialized
  ngOnInit(): void {
    //this.releases = data.albums.items;
    this.subscription = this.musicService.getNewReleases().subscribe(
      (result) => {
        console.log(result, 'from new releases component');
        this.releases = result.albums.items;
        console.log(this.releases[0]);
      },
      (err) => {
        // Handle errors from either the token retrieval or the Spotify API request
        console.error('Error fetching new releases:', err);
        // Perform error handling, display a message, or retry the request
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
