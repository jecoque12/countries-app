import { Component, OnInit } from '@angular/core';
import { Country, SearchBy } from '../../interfaces/interfaces';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = []
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {

  }
  ngOnInit(): void {

    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }


  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesService
      .search(term, SearchBy.country)
      .subscribe(countries => { // cuando te suscribes en cuando la petición http se va a realizar
        this.countries = countries == null ? [] : countries;
        this.isLoading = false;
      });

  }
}
