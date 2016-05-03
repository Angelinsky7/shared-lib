import 'reflect-metadata';
import 'rxjs';

import { Component } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";

import { CircleComponent, RectComponent } from "./core";

@Component({
    selector: 'shared-lib-test',
    template: `
       <shared-lib-circle></shared-lib-circle>
       <shared-lib-rect size="100"></shared-lib-rect>
    `,
    directives: [
        CircleComponent,
        RectComponent
    ],
    providers: [
        
    ]
})
class AppComponent {
    
}

bootstrap(AppComponent);