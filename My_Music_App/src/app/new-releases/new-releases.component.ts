import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-releases',
  standalone: false,
  templateUrl: './new-releases.component.html',
  styleUrl: './new-releases.component.scss',
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  constructor(private musicService: MusicDataService, private title: Title) {}

  //properties
  releases: any;
  private subscription: Subscription | undefined;

  //invoked after component is initialized
  ngOnInit(): void {
    this.title.setTitle('New Releases');
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
