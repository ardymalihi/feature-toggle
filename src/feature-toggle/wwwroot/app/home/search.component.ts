import { Component, Output, EventEmitter } from '@angular/core';
import { EmitterService } from '../shared/emitter.service';

@Component({
    moduleId: module.id,
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {

    constructor(private emitterService: EmitterService) { }

    inputSearch: string;

    keyup() {
        this.emitterService.get("searchChanged").emit(this.inputSearch);
    }
}
