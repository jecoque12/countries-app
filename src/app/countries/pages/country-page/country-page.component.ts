import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { SearchBy } from '../../interfaces/interfaces';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.search(id, SearchBy.alphaCode)))
      .subscribe((countries) => {
        if (countries?.length == 0) {
          return;
        }
        console.log(countries![0]);
      })



  }


}
