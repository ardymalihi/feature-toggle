import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IFeatureToggle } from './feature-toggle.interface';
import { EmitterService } from './emitter.service';

@Injectable()
export class FeatureToggleService {

    public currentUser: string = "";

    constructor(private http: Http, private emitterService: EmitterService) {
        this.emitterService.get("userLoaded").subscribe(user => {
            this.currentUser = user;
        });
    }

    getFeatureToggles(host: string) {
        return this.http.get('api/featuretoggles?host=' + host)
            .map(response => <IFeatureToggle[]>response.json());
    }

    deleteFeatureToggle(featureToggle: IFeatureToggle) {
        return this.http.delete('api/featuretoggles?id=' + featureToggle.id + "&host=" + featureToggle.host)
            .map(response => <boolean>response.json());
    }

    addFeatureToggle(featureToggle: IFeatureToggle) {
        return this.http.post('api/featuretoggles', featureToggle)
            .map(response => <IFeatureToggle>response.json());
    }

    cloneFeatureToggle(featureToggle: IFeatureToggle) {
        featureToggle.host = this.currentUser;
        return this.http.post('api/featuretoggles', featureToggle)
            .map(response => <number>response.json());
    }

    flipFeatureToggle(featureToggle: IFeatureToggle) {
        return this.http.put('api/featuretoggles', featureToggle)
            .map(response => <boolean>response.json());
    }

    getCurrentUser() {
        return this.http.get('api/users/current')
            .map(response => <any>response.json());
    }

}