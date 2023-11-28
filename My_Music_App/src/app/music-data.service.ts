import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  favouritesList: Array<any> = [];

  //return an  Observable<any> that can be subscribed to in order to pull all of the new releases from the New Releases endpoint.
  getNewReleases(): Observable<any> {
    //calling function from spotify token service
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        console.log(token, 'from getNewReleases function');
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  // • getArtistById(id)
  //   - Returns the artist with the given id
  //     - If no such artist exists, returns null
  getArtistById(artistId: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${artistId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
  // • getAlbumsByArtistId(id)
  //   - Returns a list of albums by the artist with the given id
  //     - If no such album exists, returns an empty array
  getAlbumsByArtistId(artistId: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
  // • getAlbumById(id)
  //   - Returns the album with the given id
  //     - If no such album exists, returns null
  getAlbumById(albumId: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/albums/${albumId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
  // • searchArtists(searchString)
  //   - Searches for artists based on the provided string
  //     - If no results are found, returns an empty array
  searchArtists(searchString: any): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }
  // • addToFavourites(id)
  //   - Adds the song or playlist to favourites (adds it to the database)
  //     - Returns true if successful, false otherwise
  addToFavourites(itemId: any): boolean {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    // return this.http.put<[any]>(`${environment.userAPIBase}/user/favourites/${id}`, id);

    //However, if the value of id is null / undefined or the number of items in the favouritesList is greater than or  equal to 50,
    //then the value of id is not added to the favouritesList and false is returned, indicating that the  operation was a failure
    if (
      itemId != null &&
      itemId != undefined &&
      this.favouritesList.length <= 50
    ) {
      this.favouritesList.push(itemId);
      return true;
    }
    return false;
  }
  // • removeFromFavourites(id)
  //   - Removes the song or playlist from favourites (removes it from the database)
  //     - Returns true if successful, false otherwise
  removeFromFavourites(itemId: any): Observable<any> {
    let index = this.favouritesList.indexOf(itemId);
    if (index > -1) {
      this.favouritesList.splice(index, 1);
    }
    return this.getFavourites();
  }
  // • getFavourites()
  //   - Retrieves all songs and playlists in user's favourites list
  //     - Returns an array of objects containing each song or playlist object
  getFavourites(): Observable<any> {
    if (this.favouritesList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap((token) => {
          return this.http.get<any>(
            `https://api.spotify.com/v1/tracks?q=${this.favouritesList.join()}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        })
      );
    }
    //Returns an Observable<any> that broadcasts an empty array immediately to any subscribers
    return new Observable((o) => o.next({ tracks: [] }));
  }
}
//
