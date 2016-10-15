import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {

    private emitters: { [ID: string]: EventEmitter<any> } = {}

    constructor() {
        
    }

    get(ID: string): EventEmitter<any> {
        if (!this.emitters[ID])
            this.emitters[ID] = new EventEmitter();
        return this.emitters[ID];
    }
}