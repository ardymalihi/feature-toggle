import { Component, OnInit } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { EmitterService } from '../shared/emitter.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    host: string;

    constructor(private featureToggleService: FeatureToggleService, private emitterService: EmitterService) { }

    ngOnInit() {

        this.featureToggleService.getCurrentUser()
            .subscribe(user => {
                this.host = user.host;
                this.emitterService.get("userLoaded").emit(this.host);
            });

        
    }
}