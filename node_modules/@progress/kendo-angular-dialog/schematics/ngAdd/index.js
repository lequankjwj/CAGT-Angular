"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    const finalOptions = Object.assign({}, options, { mainNgModule: 'DialogsModule', package: 'dialog', peerDependencies: {
            // Peer dependency of buttons
            "@progress/kendo-angular-popup": "^3.0.0"
        } });
    return schematics_1.externalSchematic('@progress/kendo-schematics', 'ng-add', finalOptions);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map