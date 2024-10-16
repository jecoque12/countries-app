import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country, SearchBy } from '../interfaces/interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/Region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private URL: string = 'https://restcountries.com/v3.1'
  constructor(private http: HttpClient) { }

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }
  search(term: string, type: SearchBy): Observable<Country[] | null> {

    let URL = this.getURL(term, type);

    return this.http.get<Country[]>(URL)
      .pipe(
        tap(countries => {
          if (type == SearchBy.capital) {
            this.cacheStore.byCapital = { term, countries }
          }
          if (type == SearchBy.country) {
            this.cacheStore.byCountries = { term, countries }
          }
          if (type == SearchBy.region) {
            this.cacheStore.byRegion = { region: term as Region, countries };
          }

        }),
        catchError(() => of(null)),
        delay(2000),
        // * es un catch, el of lo que hace es construir un observable nuevo donde devolvemos una lista vacía ante cualquier tipo de error
      );
  }


  private getURL(term: string, type: SearchBy): string {
    let URL: string = '';
    if (type == SearchBy.capital) {


      URL = `${this.URL}/capital/${term}`
    }
    if (type == SearchBy.country) {
      URL = `${this.URL}/name/${term}`
    }
    if (type == SearchBy.region) {

      URL = `${this.URL}/region/${term}`
    }
    if (type == SearchBy.alphaCode)
      URL = `${this.URL}/alpha/${term}`;
    return URL;
  }



}
