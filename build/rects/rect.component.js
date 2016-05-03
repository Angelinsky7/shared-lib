System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var RectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RectComponent = (function () {
                function RectComponent() {
                    this.size = 10;
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], RectComponent.prototype, "size", void 0);
                RectComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: "shared-lib-rect",
                        template: "<div class=\"rect-inner\"     [ngStyle]=\"{'width': size + 'px', 'height': size + 'px'}\">     <label class=\"rect-inner-label\">         rect     </label> </div>",
                        styles: [":host {   display: block; }   :host .rect-inner {     display: -webkit-box;     display: -webkit-flex;     display: -ms-flexbox;     display: flex;     background: blue;     -webkit-box-pack: center;     -webkit-justify-content: center;         -ms-flex-pack: center;             justify-content: center;     -webkit-box-align: center;     -webkit-align-items: center;         -ms-flex-align: center;             align-items: center; }  /*# sourceMappingURL=rect.component.css.map */"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RectComponent);
                return RectComponent;
            }());
            exports_1("RectComponent", RectComponent);
        }
    }
});
