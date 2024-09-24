import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country, SearchBy } from '../../interfaces/interfaces';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = []

  constructor(private countriesService: CountriesService) {

  }

  searchByRegion(term: string): void {
    this.countriesService
      .search(term, SearchBy.region)
      .subscribe(countries => { // cuando te suscribes en cuando la petición http se va a realizar
        this.countries = countries == null ? [] : countries;
      });
  }
}
