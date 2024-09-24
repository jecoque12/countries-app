import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ''
})
export class SearchBoxComponent {
  @Input()
  public placeHolder: string = '';
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  @ViewChild('searchBox')
  public tagInput!: ElementRef<HTMLInputElement>;


  onEnter(): void {
    this.onValue.emit(this.tagInput.nativeElement.value);

  }
}
