/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var compileTemplate = function (templateRef) {
    var context = {};
    var embeddedView = templateRef.createEmbeddedView(context);
    var result = function (data) {
        Object.assign(context, data);
        embeddedView.detectChanges();
        var templateWrap = document.createElement('span');
        embeddedView.rootNodes.forEach(function (rootNode) {
            templateWrap.appendChild(rootNode.cloneNode(true));
        });
        return templateWrap;
    };
    result.destroy = function () {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
