import { Component, Input, Pipe } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { IFeatureToggle } from '../shared/feature-toggle.interface'

@Component({
    moduleId: module.id,
    selector: 'app-feature-toggles',
    templateUrl: './feature-toggles.component.html'
})
export class FeatureTogglesComponent {
    @Input() featureToggles: IFeatureToggle[];
    @Input() title: string;
    @Input() searchedFeatureToggle: string;

    onChange(featureToggle: IFeatureToggle) {
        console.log(featureToggle);
    }
}
