import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IFeatureToggle } from './feature-toggle.interface';

@Injectable()
export class FeatureToggleService {
    
    constructor(private http: Http) { }

    getFeatureToggles() {
        return this.http.get('api/featuretoggles')
            .map(response => <IFeatureToggle[]>response.json());
    }
}