import { Component, Input } from "angular2/core";

declare var __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: "shared-lib-rect",
    templateUrl : "rect.component.html",
    styleUrls: ["rect.component.css"]
})
export class RectComponent {
    @Input() size: number = 10;
}