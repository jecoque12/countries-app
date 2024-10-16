import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country, SearchBy } from '../../interfaces/interfaces';
import { Region } from '../../interfaces/Region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = []
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  constructor(private countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }


  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region
    this.countriesService
      .search(region, SearchBy.region)
      .subscribe(countries => { // cuando te suscribes en cuando la petición http se va a realizar
        this.countries = countries == null ? [] : countries;
        this.isLoading = false;
      });

  }
}
