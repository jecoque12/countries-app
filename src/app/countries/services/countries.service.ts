import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country, SearchBy } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private URL: string = 'https://restcountries.com/v3.1'
  constructor(private http: HttpClient) { }


  searchCapital(term: string): Observable<Country[]> {

    return this.http.get<Country[]>(`${this.URL}/capital/${term}`)
      .pipe(
        // tap(countries => console.log('Paso por el tap 1 ', countries)),
        // map(countries => []),
        // tap(countries => console.log('Paso por el tap 2', countries)),
        catchError(() => of([])) // * es un catch, el of lo que hace es construir un observable nuevo donde devolvemos una lista vacía ante cualquier tipo de error


      );
    // cuando te suscribes en cuando la petición http se va a realizar
  }
  searchRegion(term: string): Observable<Country[]> {

    return this.http.get<Country[]>(`${this.URL}/region/${term}`)
      .pipe(
        // tap(countries => console.log('Paso por el tap 1 ', countries)),
        // map(countries => []),
        // tap(countries => console.log('Paso por el tap 2', countries)),
        catchError(() => of([])) // * es un catch, el of lo que hace es construir un observable nuevo donde devolvemos una lista vacía ante cualquier tipo de error


      );
    // cuando te suscribes en cuando la petición http se va a realizar
  }
  searchCountry(term: string): Observable<Country[]> {

    return this.http.get<Country[]>(`${this.URL}/name/${term}`)
      .pipe(
        // tap(countries => console.log('Paso por el tap 1 ', countries)),
        // map(countries => []),
        // tap(countries => console.log('Paso por el tap 2', countries)),
        catchError(() => of([])) // * es un catch, el of lo que hace es construir un observable nuevo donde devolvemos una lista vacía ante cualquier tipo de error


      );
    // cuando te suscribes en cuando la petición http se va a realizar
  }

  search(term: string, type: SearchBy): Observable<Country[] | null> {

    let URL = this.getURL(term, type);

    return this.http.get<Country[]>(URL)
      .pipe(
        catchError(() => of(null))
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
