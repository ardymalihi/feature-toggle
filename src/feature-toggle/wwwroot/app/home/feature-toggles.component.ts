import { Component, Input, Pipe } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { IFeatureToggle } from '../shared/feature-toggle.interface'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'app-feature-toggles',
    templateUrl: './feature-toggles.component.html'
})
export class FeatureTogglesComponent {
    @Input() featureToggles: IFeatureToggle[];
    @Input() title: string;
    @Input() searchedFeatureToggle: string;

    constructor(public toastr: ToastsManager) {
    }

    onChange(featureToggle: IFeatureToggle) {
        featureToggle.enabled = !featureToggle.enabled;
        if (featureToggle.enabled) {
            this.toastr.success(featureToggle.name + ' Activated');
        }
        else {
            this.toastr.info(featureToggle.name + ' Deactivated');
        }
        
    }
}
