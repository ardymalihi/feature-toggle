import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { AboutComponent } from './about/about.component';
import { routing, appRoutingProviders } from './app.routing';
import { FeatureToggleService } from './shared/feature-toggle.service';
import { EmitterService } from './shared/emitter.service';
import { FeatureTogglesComponent } from './feature-toggles/feature-toggles.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from './shared/feature-toggle.pipe';

import { UiSwitchModule } from 'angular2-ui-switch'
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        UiSwitchModule,
        ToastModule
    ],
    providers: [
        appRoutingProviders,
        FeatureToggleService,
        EmitterService
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AddComponent,
        AboutComponent,
        FeatureTogglesComponent,
        SearchComponent,
        UserComponent,
        SearchPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }