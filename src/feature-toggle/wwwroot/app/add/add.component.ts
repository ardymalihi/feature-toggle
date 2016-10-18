import { Component, OnInit } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { EmitterService } from '../shared/emitter.service';
import { IFeatureToggle } from '../shared/feature-toggle.interface'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit {

    featureToggle: IFeatureToggle;

    constructor(
        private emitterService: EmitterService,
        private featureToggleService: FeatureToggleService,
        private toastr: ToastsManager) {
    }

    ngOnInit() {

        this.featureToggle = { id: 0, name: "", description: "", enabled: false, host: "" };
    }

    addFeatureToggle() {
        this.featureToggleService.addFeatureToggle(this.featureToggle).subscribe(id => {
            if (id > 0) {
                this.toastr.success("Feature Toggle successfully added");
            }
            else {
                this.toastr.error("Could not add the Feature Toggle. It might exist");
            }
        });
    }
}