import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IFeatureToggle } from './feature-toggle.interface';

@Injectable()
export class FeatureToggleService {
    
    constructor(private http: Http) { }

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
            .map(response => <boolean>response.json());
    }

    flipFeatureToggle(featureToggle: IFeatureToggle) {
        return this.http.put('api/featuretoggles', featureToggle)
            .map(response => <boolean>response.json());
    }

}