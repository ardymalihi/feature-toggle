import { Pipe, PipeTransform, Injectable } from '@angular/core';

import { IFeatureToggle } from "./feature-toggle.interface"

@Pipe({
    name: 'search',
    pure: false
})
@Injectable()
export class SearchPipe implements PipeTransform {
    transform(value: IFeatureToggle[], name: any, caseInsensitive: boolean): any {
        if (name !== undefined) {
            return value.filter((featureToggle) => {
                if (caseInsensitive) {
                    return (featureToggle.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
                } else {
                    return (featureToggle.name.indexOf(name) !== -1);
                }
            });
        }
        return value;
    }
}