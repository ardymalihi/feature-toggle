import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {

    private emitters: { [id: string]: EventEmitter<any> } = {}

    constructor() {
        
    }

    get(id: string): EventEmitter<any> {
        if (!this.emitters[id])
            this.emitters[id] = new EventEmitter();
        return this.emitters[id];
    }
}