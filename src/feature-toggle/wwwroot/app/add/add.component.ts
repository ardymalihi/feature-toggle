import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { EmitterService } from '../shared/emitter.service';
import { IFeatureToggle, IUser } from '../shared/feature-toggle.interface'
import { ServerConfigLoader } from '../shared/server-config.loader'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit {

    featureToggle: IFeatureToggle;

    get user(): IUser {
        return this.serverConfogLoader.serverConfig.user;
    }

    constructor(
        private router: Router,
        private emitterService: EmitterService,
        private featureToggleService: FeatureToggleService,
        private serverConfogLoader: ServerConfigLoader,
        private toastr: ToastsManager) {
    }

    ngOnInit() {

        this.featureToggle = { id: 0, name: "", description: "", enabled: false, host: "" };
    }

    addFeatureToggle() {
        this.featureToggleService.addFeatureToggle(this.featureToggle).subscribe(id => {
            if (id > 0) {
                this.toastr.success("Feature Toggle successfully added").then(t => {
                    this.router.navigate(['/']);
                });
            }
            else {
                this.toastr.error("Could not add the Feature Toggle. It might exist");
            }
        });
    }
}