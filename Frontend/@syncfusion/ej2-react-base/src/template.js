/**
 * Template compiler for react
 */
import { setTemplateEngine, getTemplateEngine, extend } from '@syncfusion/ej2-base';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
var stringCompiler = getTemplateEngine();
// eslint-disable-next-line
export function compile(templateElement, helper) {
    if (typeof templateElement === 'string' || (templateElement.prototype && templateElement.prototype.CSPTemplate && typeof templateElement === 'function')) {
        return stringCompiler(templateElement, helper);
    }
    else {
        return function (data, component, prop, element) {
            var actTemplate = templateElement;
            var actData = data;
            if (typeof actTemplate === 'object') {
                actTemplate = templateElement.template;
                actData = extend({}, data, templateElement.data || {});
            }
            var cEle;
            if (element) {
                cEle = element;
            }
            else {
                cEle = document.createElement('div');
            }
            var rele = React.createElement(actTemplate, actData);
            var portal = ReactDOM.createPortal(rele, cEle);
            portal.propName = prop;
            if (!component.portals) {
                component.portals = [portal];
            }
            else {
                component.portals.push(portal);
            }
            if (!element) {
                return [cEle];
            }
        };
    }
}
setTemplateEngine({ compile: compile });
