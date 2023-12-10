import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  constructor(
    private musicServie: MusicDataService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  searchQuery: any;
  results: any;
  private searchSub: Subscription | undefined;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.searchQuery = queryParams['q'];
      console.log('in search component, searchString:  ' + this.searchQuery);

      //set title with the search query
      this.title.setTitle('Search Results for ' + this.searchQuery);
    });

    this.searchSub = this.musicServie.searchArtists(this.searchQuery).subscribe(
      (result) => {
        if (!!result && result !== null) {
          //console.log("Result is " + JSON.stringify(result));
          this.results = result.artists.items.filter(
            (x: any) => x.images.length > 0
          );
        } else {
          console.log('No Results Found');
        }
      },
      (error) => {
        console.log(`Error in getting data ${JSON.stringify(error)}`);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }
}
