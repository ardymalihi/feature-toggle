import { Component, OnInit } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { IUser } from '../shared/feature-toggle.interface';
import { EmitterService } from '../shared/emitter.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    user: IUser = { host: "", isAdmin: false };

    constructor(private featureToggleService: FeatureToggleService, private emitterService: EmitterService) { }

    ngOnInit() {

        this.featureToggleService.getCurrentUser()
            .subscribe(user => {
                this.user = user;
                this.emitterService.get("userLoaded").emit(this.user);
            });

        
    }
}