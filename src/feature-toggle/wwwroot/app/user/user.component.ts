import { Component, OnInit } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    host: string;

    constructor(private featureToggleService: FeatureToggleService) { }

    ngOnInit() {

        this.featureToggleService.getCurrentUser()
            .subscribe(user => { this.host = user.host });

        
    }
}