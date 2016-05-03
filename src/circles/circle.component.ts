import { Component, Input } from "angular2/core";

declare var __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: "shared-lib-circle",
    templateUrl : "circle.component.html",
    styleUrls: ["circle.component.css"]
})
export class CircleComponent {
    @Input() size: number = 50;
}