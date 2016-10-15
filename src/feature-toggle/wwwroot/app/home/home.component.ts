import { Component, OnInit } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { IFeatureToggle } from '../shared/feature-toggle.interface';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    inputSearch: string;
    myFeatureToggles: IFeatureToggle[];
    allFeatureToggles: IFeatureToggle[];

    constructor(private featureToggleService: FeatureToggleService) { }

    ngOnInit() {
        this.featureToggleService.getAllFeatureToggles()
            .subscribe(featureToggles => this.allFeatureToggles = featureToggles);

        this.featureToggleService.getMyFeatureToggles()
            .subscribe(featureToggles => this.myFeatureToggles = featureToggles);
    }

    searchChanged(value) {
        this.inputSearch = value;
    }
}