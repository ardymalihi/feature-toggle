import { Component, OnInit, Input, Pipe } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { IFeatureToggle } from '../shared/feature-toggle.interface'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'app-feature-toggles',
    templateUrl: './feature-toggles.component.html'
})
export class FeatureTogglesComponent implements OnInit {
    @Input() host: string;
    @Input() title: string;
    @Input() searchedFeatureToggle: string;
    featureToggles: IFeatureToggle[];

    constructor(private featureToggleService: FeatureToggleService, public toastr: ToastsManager) {
    }

    ngOnInit() {

        this.featureToggleService.getFeatureToggles(this.host)
            .subscribe(featureToggles => this.featureToggles = featureToggles);
    }


    onChange(featureToggle: IFeatureToggle) {
        featureToggle.enabled = !featureToggle.enabled;
        if (featureToggle.enabled) {
            this.toastr.success(featureToggle.name + ' is ON');
        }
        else {
            this.toastr.info(featureToggle.name + ' is OFF');
        }
        
    }


    deleteFeatureToggle(featureToggle: IFeatureToggle) {

        this.featureToggleService
            .deleteFeatureToggle(featureToggle)
            .subscribe(removed => {
                alert(removed);
            }
        );
    }
}
