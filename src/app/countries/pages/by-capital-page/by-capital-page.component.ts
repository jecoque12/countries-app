import { Country, SearchBy } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  constructor(private countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }


  searchByCapital(term: string): void {

    this.isLoading = true;
    this.countriesService
      .search(term, SearchBy.capital)
      .subscribe(countries => { // cuando te suscribes en cuando la petición http se va a realizar
        this.countries = countries == null ? [] : countries;
        this.isLoading = false;
      });
  }
}
