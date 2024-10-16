import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { debounceTime, pipe, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ''
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  @Input()
  public placeHolder: string = '';
  @Input()
  public initialValue: string = '';
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  @ViewChild('searchBox')
  public tagInput!: ElementRef<HTMLInputElement>;


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        // console.log(value);
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }


  onEnter(): void {
    this.onValue.emit(this.tagInput.nativeElement.value);

  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }


}
