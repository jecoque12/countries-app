import { Country, SearchBy } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  constructor(private countriesService: CountriesService) {

  }

  searchByCapital(term: string): void {
    this.countriesService
      .search(term, SearchBy.capital)
      .subscribe(countries => { // cuando te suscribes en cuando la petición http se va a realizar
        this.countries = countries == null ? [] : countries;
      });
  }
}
