///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {MessageService} from "./messages/message.service";
import {ROUTER_PROVIDERS} from "angular2/router";
import {provide} from "angular2/src/core/di/provider";
import {LocationStrategy} from "angular2/src/router/location/location_strategy";
import {HashLocationStrategy} from "angular2/src/router/location/hash_location_strategy";

bootstrap(
    AppComponent,
    [
        MessageService,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),

    ],

);