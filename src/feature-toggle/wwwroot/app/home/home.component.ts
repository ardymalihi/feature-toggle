import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    inputSearch: string;

    constructor() { }

    ngOnInit() {
    }

    searchChanged(value) {
        this.inputSearch = value;
    }
}