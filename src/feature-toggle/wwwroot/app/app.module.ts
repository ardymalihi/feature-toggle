import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { routing, appRoutingProviders } from './app.routing';
import { FeatureToggleService } from './shared/feature-toggle.service';
import { FeatureTogglesComponent } from './home/feature-toggles.component';
import { SearchComponent } from './home/search.component';
import { SearchPipe } from './shared/feature-toggle.pipe';

import { UiSwitchModule } from 'angular2-ui-switch'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        UiSwitchModule
    ],
    providers: [
        appRoutingProviders,
        FeatureToggleService
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        FeatureTogglesComponent,
        SearchComponent,
        SearchPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }