import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  private userAPIBase = environment.userAPIBase;

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

  addToFavourites(id: string): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    const trackId = { id: id };
    console.log('trackId', trackId);
    return this.http.put<[String]>(
      `${this.userAPIBase}/favourites/${id}`,
      trackId
    );
  }

  removeFromFavourites(id: string): Observable<any> {
    return this.http
      .delete<[String]>(`${this.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
          // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
          if (favouritesArray.length > 0) {
            return this.getFavourites();
          } else {
            return new Observable((o) => o.next({ tracks: [] }));
          }
        })
      );
  }
  getFavourites(): Observable<any> {
    return this.http.get<string[]>(`${this.userAPIBase}/favourites/`).pipe(
      switchMap((favouritesArray: string[]) => {
        if (favouritesArray.length > 0) {
          console.log({ favouritesArray });
          return this.spotifyToken.getBearerToken().pipe(
            switchMap((token) => {
              return this.fetchTracksFromSpotify(favouritesArray, token);
            }),
            catchError((error) => {
              // Handle Spotify API error
              console.error('Error fetching tracks from Spotify:', error);
              return of({ tracks: [] });
            })
          );
        } else {
          return of({ tracks: [] });
        }
      }),
      catchError((error) => {
        // Handle user API error
        console.error('Error fetching user favourites:', error);
        return of({ tracks: [] });
      })
    );
  }

  fetchTracksFromSpotify(
    favouritesArray: string[],
    token: string
  ): Observable<any> {
    const trackIds = favouritesArray.join();
    return this.http
      .get<any>(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        catchError((error) => {
          // Handle Spotify API error
          console.error('Error fetching tracks from Spotify:', error);
          return of({ tracks: [] });
        })
      );
  }
}
