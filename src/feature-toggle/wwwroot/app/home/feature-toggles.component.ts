import { Component, OnInit, Input, Pipe } from '@angular/core';

import { FeatureToggleService } from '../shared/feature-toggle.service';
import { EmitterService } from '../shared/emitter.service';
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

    constructor(
        private emitterService: EmitterService,
        private featureToggleService: FeatureToggleService,
        private toastr: ToastsManager) {
    }

    ngOnInit() {

        this.emitterService.get("searchChanged").subscribe(value => {
            this.searchedFeatureToggle = value;
        });

        this.emitterService.get("featureToggleCloned").subscribe(value => {
            if (value.host === this.host) {
                this.featureToggles.push(value);
            }
        });

        this.featureToggleService.getFeatureToggles(this.host)
            .subscribe(featureToggles => this.featureToggles = featureToggles);
    }


    onChange(featureToggle: IFeatureToggle) {
        featureToggle.enabled = !featureToggle.enabled;
        this.featureToggleService
            .flipFeatureToggle(featureToggle)
            .subscribe(updated => {
                if (featureToggle.enabled) {
                    this.toastr.success(featureToggle.name + ' is ON');
                }
                else {
                    this.toastr.info(featureToggle.name + ' is OFF');
                }
            }
            );
    }


    deleteFeatureToggle(featureToggle: IFeatureToggle) {

        this.featureToggleService
            .deleteFeatureToggle(featureToggle)
            .subscribe(removed => {
                this.featureToggles = this.featureToggles.filter(f => f.id !== featureToggle.id);
                this.toastr.success(featureToggle.name + ' successfully removed');
            }
        );
    }

    cloneFeatureToggle(featureToggle: IFeatureToggle) {
        let clonedFeatureToggle: IFeatureToggle = Object.assign({}, featureToggle);
        clonedFeatureToggle.host = this.featureToggleService.currentUser;
        this.featureToggleService
            .cloneFeatureToggle(clonedFeatureToggle)
            .subscribe(id => {
                if (id > 0) {
                    clonedFeatureToggle.id = id;
                    this.emitterService.get("featureToggleCloned").emit(clonedFeatureToggle);
                    this.toastr.success(clonedFeatureToggle.name + ' successfully added to your list');
                }
            }
        );
    }

    private clone(): any {
        var cloneObj = new (<any>this.constructor());
        for (var attribut in this) {
            if (typeof this[attribut] === "object") {
                cloneObj[attribut] = this.clone();
            } else {
                cloneObj[attribut] = this[attribut];
            }
        }
        return cloneObj;
    }
}
