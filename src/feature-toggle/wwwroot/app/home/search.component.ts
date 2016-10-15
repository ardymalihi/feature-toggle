import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    @Output() searchChanged = new EventEmitter();
    inputSearch: string;

    keyup() {
        this.searchChanged.emit(this.inputSearch);
    }
}
