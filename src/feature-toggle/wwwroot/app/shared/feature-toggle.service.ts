import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IFeatureToggle } from './feature-toggle.interface';

@Injectable()
export class FeatureToggleService {
    
    constructor(private http: Http) { }

    getAllFeatureToggles() {
        return this.http.get('api/featuretoggles')
            .map(response => <IFeatureToggle[]>response.json());
    }

    getMyFeatureToggles() {
        return this.http.get('api/featuretoggles/host')
            .map(response => <IFeatureToggle[]>response.json());
    }

}