import { Component } from '@angular/core';
import { Country, SearchBy } from '../../interfaces/interfaces';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public countries: Country[] = []

  constructor(private countriesService: CountriesService) {

  }

  searchByCountry(term: string): void {
    this.countriesService
      .search(term, SearchBy.country)
      .subscribe(countries => { // cuando te suscribes en cuando la petición http se va a realizar
        this.countries = countries == null ? [] : countries;
      });

  }
}
