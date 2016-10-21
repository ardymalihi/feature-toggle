import { Injectable } from '@angular/core';

import { IServerConfig } from '../shared/feature-toggle.interface'

function _window(): any {
    // return the native window obj
    return window;
}

@Injectable()
export class ServerConfigLoader {
    get window(): any {
        return _window();
    }
    serverConfig: IServerConfig;

    constructor() {
        this.serverConfig = this.window.serverConfig;
    }
}