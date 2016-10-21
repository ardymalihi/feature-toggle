import { Component, OnInit } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { IUser } from '../shared/feature-toggle.interface';
import { ServerConfigLoader } from '../shared/server-config.loader'
import { EmitterService } from '../shared/emitter.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

    get user(): IUser {
        return this.serverConfogLoader.serverConfig.user;
    }

    constructor(
        private featureToggleService: FeatureToggleService,
        private serverConfogLoader: ServerConfigLoader,
        private emitterService: EmitterService) { }

    ngOnInit() {
    }
}