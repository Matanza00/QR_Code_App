var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../stepper-base/stepper-base-model.d.ts'/>
import { attributes, NotifyPropertyChanges, L10n, append, isNullOrUndefined, getUniqueID, Complex, KeyboardEvents, ChildProperty, Property, EventHandler, Event, addClass, remove, removeClass, initializeCSPTemplate, select, compile } from '@syncfusion/ej2-base';
import { StepperBase, StepStatus } from '../stepper-base/stepper-base';
import { Tooltip } from '@syncfusion/ej2-popups';
var ITEMCONTAINER = 'e-step-container';
var ITEMLIST = 'e-stepper-steps';
var ICONCSS = 'e-indicator';
var TEXTCSS = 'e-step-text-container';
var STEPLABEL = 'e-step-label-container';
var OPTIONAL = 'e-step-label-optional';
var SELECTED = 'e-step-selected';
var INPROGRESS = 'e-step-inprogress';
var NOTSTARTED = 'e-step-notstarted';
var FOCUS = 'e-step-focus';
var COMPLETED = 'e-step-completed';
var DISABLED = 'e-step-disabled';
var READONLY = 'e-stepper-readonly';
var PROGRESSVALUE = '--progress-value';
var RTL = 'e-rtl';
var TEMPLATE = 'e-step-template';
var LABELAFTER = 'e-label-after';
var LABELBEFORE = 'e-label-before';
var VERTICALSTEP = 'e-vertical';
var HORIZSTEP = 'e-horizontal';
var STEPICON = 'e-step-icon';
var STEPTEXT = 'e-step-text';
var TEXT = 'e-text';
var STEPSLABEL = 'e-step-label';
var LABEL = 'e-label';
var STEPINDICATOR = 'e-step-type-indicator';
var LABELINDICATOR = 'e-step-type-label';
var INDICATORICON = 'e-step-indicator';
var STEPPERTOOLTIP = 'e-stepper-tooltip';
var STEPPERIPROGRESSTIP = 'e-step-inprogress-tip';
/**
 * Defines the step progress animation of the Stepper.
 */
var StepperAnimationSettings = /** @class */ (function (_super) {
    __extends(StepperAnimationSettings, _super);
    function StepperAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], StepperAnimationSettings.prototype, "enable", void 0);
    __decorate([
        Property(2000)
    ], StepperAnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], StepperAnimationSettings.prototype, "delay", void 0);
    return StepperAnimationSettings;
}(ChildProperty));
export { StepperAnimationSettings };
/**
 * Defines the label position in the Stepper.
 */
export var StepLabelPosition;
(function (StepLabelPosition) {
    /**
     * Displays the label on top position regardless of the Stepper's orientation.
     */
    StepLabelPosition["Top"] = "Top";
    /**
     * Displays the label on bottom position regardless of the Stepper's orientation.
     */
    StepLabelPosition["Bottom"] = "Bottom";
    /**
     * Displays the label on left side regardless of the Stepper's orientation.
     */
    StepLabelPosition["Start"] = "Start";
    /**
     * Displays the label on right side regardless of the Stepper's orientation.
     */
    StepLabelPosition["End"] = "End";
})(StepLabelPosition || (StepLabelPosition = {}));
/**
 * Defines whether steps are display with only indicator, only labels or combination of both.
 */
export var StepType;
(function (StepType) {
    /**
     * Steps are shown indicator with label defined.
     */
    StepType["Default"] = "Default";
    /**
     * Steps are shown with only label.
     */
    StepType["Label"] = "Label";
    /**
     * Steps are shown with only indicator.
     */
    StepType["Indicator"] = "Indicator";
})(StepType || (StepType = {}));
/**
 * The Stepper component visualizes several steps and indicates the current progress by highlighting already completed steps.
 *
 * ```html
 * <nav id="stepper"></nav>
 * ```
 * ```typescript
 * <script>
 *   let stepperObj: Stepper = new Stepper({steps : [{}, {}, {}, {}, {}]});
 *   stepperObj.appendTo('#stepper');
 * </script>
 * ```
 */
var Stepper = /** @class */ (function (_super) {
    __extends(Stepper, _super);
    /**
     * * Constructor for creating the Stepper component.
     *
     * @param {StepperModel} options - Specifies the Stepper model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function Stepper(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.stepperItemElements = [];
        return _this;
    }
    Stepper.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        var localeText = { optional: 'Optional' };
        this.l10n = new L10n('stepper', localeText, this.locale);
        this.keyConfigs = {
            downarrow: 'downarrow',
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            uparrow: 'uparrow',
            space: 'space',
            enter: 'enter',
            home: 'home',
            end: 'end',
            tab: 'tab',
            shiftTab: 'shift+tab',
            escape: 'escape'
        };
        this.tooltipOpen = false;
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    Stepper.prototype.getModuleName = function () {
        return 'stepper';
    };
    Stepper.prototype.render = function () {
        this.initialize();
        this.navigationHandler(this.activeStep, null, false);
        this.updateStepperStatus(true);
    };
    Stepper.prototype.initialize = function () {
        var _this = this;
        this.element.setAttribute('aria-label', this.element.id);
        this.updatePosition();
        this.stepperItemList = this.createElement('ol', { className: ITEMLIST });
        this.updateOrientaion(this.element);
        this.updateStepType();
        this.element.appendChild(this.stepperItemList);
        if (this.cssClass) {
            addClass([this.element], this.cssClass.trim().split(' '));
        }
        if (this.readOnly) {
            this.element.classList.add(READONLY);
        }
        if (this.enableRtl) {
            this.element.classList.add(RTL);
        }
        this.wireEvents();
        this.updateTemplateFunction();
        this.renderItems();
        if (this.steps.length > 0) {
            if (this.steps.length > 1) {
                if (this.isAngular && this.template) {
                    setTimeout(function () {
                        _this.renderProgressBar(_this.element);
                    });
                }
                else {
                    this.renderProgressBar(this.element);
                }
            }
            this.checkValidStep();
            this.updateAnimation();
            this.updateTooltip();
            this.wireKeyboardEvent();
        }
    };
    Stepper.prototype.updatePosition = function () {
        this.progressBarPosition = this.beforeLabelWidth = this.textEleWidth = 0;
    };
    Stepper.prototype.renderDefault = function (index) {
        return (!this.steps[parseInt((index).toString(), 10)].iconCss && !this.steps[parseInt((index).toString(), 10)].text &&
            !this.steps[parseInt((index).toString(), 10)].label) ? true : false;
    };
    Stepper.prototype.updateAnimation = function () {
        var progressEle = this.element.querySelector('.e-progressbar-value');
        if (this.animation.enable) {
            if (this.animation.duration >= 0) {
                if (progressEle) {
                    progressEle.style.setProperty('--duration', ((this.animation.duration) + 'ms'));
                }
            }
            if (this.animation.delay >= 0) {
                if (progressEle) {
                    progressEle.style.setProperty('--delay', ((this.animation.delay) + 'ms'));
                }
            }
        }
        else {
            if (progressEle) {
                progressEle.style.setProperty('--delay', (0 + 'ms'));
                progressEle.style.setProperty('--duration', (0 + 'ms'));
            }
        }
    };
    Stepper.prototype.updateStepType = function () {
        if (this.stepType.toLowerCase() === 'indicator' || 'label' || 'default') {
            this.stepType.toLowerCase() !== 'default' ? this.element.classList.add('e-step-type-' + this.stepType.toLowerCase()) : '';
            if (((this.stepType.toLowerCase() === 'indicator' || 'label') && (this.labelContainer))) {
                this.clearLabelPosition();
            }
        }
    };
    Stepper.prototype.wireEvents = function () {
        var _this = this;
        EventHandler.add(window, 'resize', function () {
            if (_this.stepperItemList && _this.progressbar && _this.element.classList.contains(HORIZSTEP)) {
                _this.setProgressPosition(_this.element, true);
            }
        }, this);
        EventHandler.add(window, 'click', function () { _this.updateStepFocus(); }, this);
    };
    Stepper.prototype.updateStepFocus = function () {
        if (this.isKeyNavFocus) {
            this.isKeyNavFocus = false;
            var isFocus = this.element.querySelector('.' + FOCUS);
            if (isFocus) {
                isFocus.classList.remove(FOCUS);
                this.element.classList.remove('e-steps-focus');
            }
        }
    };
    Stepper.prototype.updateStepperStatus = function (isInitial) {
        for (var index = 0; index < this.steps.length; index++) {
            var item = this.steps[parseInt(index.toString(), 10)];
            var status_1 = item.status.toLowerCase();
            if (isInitial && this.activeStep === 0 && index === 0) {
                item.status = StepStatus.InProgress;
            }
            if (item && status_1 !== 'notstarted' && index === this.activeStep) {
                for (var i = 0; i < this.steps.length; i++) {
                    var itemElement = this.stepperItemElements[parseInt(i.toString(), 10)];
                    itemElement.classList.remove(SELECTED, INPROGRESS, COMPLETED, NOTSTARTED);
                    var prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    if (status_1 === 'completed') {
                        this.updateStatusClass(i, index, itemElement);
                    }
                    else {
                        this.updateStatusClass(i, index, itemElement, true);
                    }
                    this.isProtectedOnChange = prevOnChange;
                }
            }
            else if (item && status_1 !== 'notstarted' && index !== this.activeStep) {
                this.navigationHandler(this.activeStep, null, true);
            }
        }
    };
    Stepper.prototype.updateStatusClass = function (currentStep, index, ele, isInprogress) {
        var stepItem = this.steps[parseInt(currentStep.toString(), 10)];
        if (currentStep < index) {
            ele.classList.add(COMPLETED);
            stepItem.status = StepStatus.Completed;
        }
        else if (currentStep === index) {
            ele.classList.add(isInprogress ? INPROGRESS : COMPLETED, SELECTED);
        }
        else {
            ele.classList.add(NOTSTARTED);
        }
    };
    Stepper.prototype.renderItems = function () {
        var _this = this;
        for (var index = 0; index < this.steps.length; index++) {
            this.stepperItemContainer = this.createElement('li', { className: ITEMCONTAINER });
            this.stepperItemContainer.classList[(index === 0) ? 'add' : 'remove'](SELECTED, INPROGRESS);
            this.stepperItemContainer.classList[(index !== 0) ? 'add' : 'remove'](NOTSTARTED);
            if (this.element.classList.contains(HORIZSTEP)) {
                this.stepperItemContainer.style.setProperty('--max-width', 100 / this.steps.length + '%');
            }
            var stepSpan = this.createElement('span', { className: 'e-step' });
            if (this.renderDefault(index) && (isNullOrUndefined(this.template) || this.template === '')) {
                var isIndicator = (!this.element.classList.contains('e-step-type-default') && this.stepType.toLowerCase() === 'indicator') ? true : false;
                if (isIndicator) {
                    stepSpan.classList.add('e-icons', INDICATORICON);
                }
                if (!isIndicator) {
                    stepSpan.classList.add('e-step-content');
                    stepSpan.innerHTML = (index + 1).toString();
                }
                this.stepperItemContainer.appendChild(stepSpan);
            }
            else if (isNullOrUndefined(this.template) || this.template === '') {
                var isRender = true;
                var item = this.steps[parseInt(index.toString(), 10)];
                if (item.iconCss && (((!item.text && !item.label) || !this.element.classList.contains(LABELINDICATOR)))) {
                    var itemIcon = item.iconCss.trim().split(' ');
                    stepSpan.classList.add(ICONCSS);
                    for (var i = 0; i < itemIcon.length; i++) {
                        stepSpan.classList.add(itemIcon[parseInt(i.toString(), 10)]);
                    }
                    this.stepperItemContainer.appendChild(stepSpan);
                    this.stepperItemContainer.classList.add(STEPICON);
                    if ((this.element.classList.contains(HORIZSTEP) && (this.labelPosition.toLowerCase() === 'start' || this.labelPosition.toLowerCase() === 'end') && item.label) ||
                        (this.element.classList.contains(VERTICALSTEP) && (this.labelPosition.toLowerCase() === 'top' || this.labelPosition.toLowerCase() === 'bottom') && item.label)) {
                        this.element.classList.add('e-label-' + this.labelPosition.toLowerCase());
                        var textSpan = this.createElement('span', { className: TEXTCSS + ' ' + TEXT });
                        textSpan.innerText = item.label;
                        this.stepperItemContainer.appendChild(textSpan);
                        this.stepperItemContainer.classList.add(STEPTEXT);
                        isRender = false;
                    }
                }
                if (item.text && (!item.iconCss || !this.element.classList.contains(STEPINDICATOR)) && isRender && !(item.iconCss && item.label)) {
                    if (!item.iconCss && this.element.classList.contains(STEPINDICATOR)) {
                        this.checkValidState(item, stepSpan);
                        var prevOnChange = this.isProtectedOnChange;
                        this.isProtectedOnChange = true;
                        item.label = null;
                        this.isProtectedOnChange = prevOnChange;
                    }
                    else {
                        this.textContainer = this.createElement('span', { className: TEXTCSS });
                        var textSpan = this.createElement('span', { className: TEXT });
                        if (!item.label) {
                            textSpan.innerText = item.text;
                            (item.isValid !== null && (!item.iconCss || this.element.classList.contains(LABELINDICATOR))) ? this.textContainer.appendChild(textSpan) : textSpan.classList.add(TEXTCSS);
                            this.stepperItemContainer.appendChild((item.isValid !== null && (!item.iconCss || this.element.classList.contains(LABELINDICATOR))) ? this.textContainer : textSpan);
                            this.stepperItemContainer.classList.add(STEPTEXT);
                        }
                        if (!item.iconCss || this.element.classList.contains(LABELINDICATOR)) {
                            this.stepperItemContainer.classList.add('e-step-text-only');
                            if (!item.label && item.isValid !== null) {
                                var iconSpan = this.createElement('span', { className: 'e-step-validation-icon e-icons' });
                                this.textContainer.appendChild(iconSpan);
                            }
                        }
                        if (item.label && this.element.classList.contains(LABELINDICATOR)) {
                            textSpan.innerText = item.label;
                        }
                        var prevOnChange = this.isProtectedOnChange;
                        this.isProtectedOnChange = true;
                        item.text = item.label ? null : item.text;
                        this.isProtectedOnChange = prevOnChange;
                    }
                }
                if (item.cssClass) {
                    addClass([this.stepperItemContainer], item.cssClass.trim().split(' '));
                }
                if (item.disabled) {
                    this.stepperItemContainer.classList[item.disabled ? 'add' : 'remove'](DISABLED);
                    attributes(this.stepperItemContainer, { 'tabindex': '-1', 'aria-disabled': 'true' });
                }
                if (item.label && (!item.iconCss || !this.element.classList.contains(STEPINDICATOR)) && isRender) {
                    if (!item.iconCss && !item.text && this.element.classList.contains(STEPINDICATOR)) {
                        this.checkValidState(item, stepSpan, true);
                    }
                    else if ((!((this.element.classList.contains(LABELINDICATOR)) && item.text)) || (this.element.classList.contains(LABELINDICATOR) && item.label)) {
                        this.labelContainer = this.createElement('span', { className: STEPLABEL });
                        var labelSpan = this.createElement('span', { className: LABEL });
                        labelSpan.innerText = item.label;
                        this.labelContainer.appendChild(labelSpan);
                        this.stepperItemContainer.classList.add(STEPSLABEL);
                        this.updateLabelPosition();
                        if ((!item.iconCss && !item.text) || this.element.classList.contains(LABELINDICATOR)) {
                            this.stepperItemContainer.classList.add('e-step-label-only');
                            if (item.isValid !== null) {
                                var iconSpan = this.createElement('span', { className: 'e-step-validation-icon e-icons' });
                                this.labelContainer.appendChild(iconSpan);
                            }
                        }
                    }
                }
                if (item.optional) {
                    var optionalSpan = this.createElement('span', { className: OPTIONAL });
                    this.l10n.setLocale(this.locale);
                    var optionalContent = this.l10n.getConstant('optional');
                    optionalSpan.innerText = optionalContent;
                    if (item.label && (this.labelContainer && ((this.element.classList.contains(LABELAFTER) && !this.stepperItemContainer.classList.contains('e-step-label-only'))
                        || (this.element.classList.contains(HORIZSTEP) && this.element.classList.contains(LABELBEFORE) && !this.stepperItemContainer.classList.contains('e-step-label-only'))))
                        || (this.element.classList.contains(VERTICALSTEP) && this.element.classList.contains(LABELBEFORE))) {
                        this.labelContainer.appendChild(optionalSpan);
                    }
                    else {
                        this.stepperItemContainer.appendChild(optionalSpan);
                    }
                }
                if (item.isValid !== null) {
                    item.isValid ? this.stepperItemContainer.classList.add('e-step-valid') : this.stepperItemContainer.classList.add('e-step-error');
                }
            }
            this.renderItemContent(index, false);
            if (this.stepperItemContainer.classList.contains(INPROGRESS)) {
                attributes(this.stepperItemContainer, { 'tabindex': '0', 'aria-current': 'true' });
            }
            else {
                attributes(this.stepperItemContainer, { 'tabindex': '-1' });
            }
            this.wireItemsEvents(this.stepperItemContainer, index);
            this.stepperItemElements.push(this.stepperItemContainer);
            var eventArgs = { element: this.stepperItemContainer, index: index };
            this.trigger('beforeStepRender', eventArgs, function (args) {
                _this.stepperItemList.appendChild(args.element);
            });
            if (this.isAngular && this.template) {
                setTimeout(function () {
                    _this.calculateProgressBarPosition();
                });
            }
            else {
                this.calculateProgressBarPosition();
            }
        }
        if (this.element.classList.contains(VERTICALSTEP)) {
            if (this.element.classList.contains(LABELBEFORE)) {
                var listItems = this.stepperItemList.querySelectorAll('.' + LABEL);
                for (var i = 0; i < listItems.length; i++) {
                    var labelEle = listItems[parseInt((i).toString(), 10)];
                    labelEle.style.setProperty('--label-width', (this.beforeLabelWidth) + 5 + 'px');
                }
            }
        }
    };
    Stepper.prototype.calculateProgressBarPosition = function () {
        var isBeforeLabel = (this.element.classList.contains(LABELBEFORE)) ? true : false;
        var isStepVertical = (this.element.classList.contains(VERTICALSTEP)) ? true : false;
        if (isStepVertical) {
            var iconOnly = (this.stepperItemContainer.classList.contains(STEPICON) && !this.stepperItemContainer.classList.contains(STEPTEXT) && !this.stepperItemContainer.classList.contains(STEPSLABEL)) ? true : false;
            var textEle = (this.stepperItemContainer.querySelector('.' + TEXTCSS));
            if (textEle) {
                this.textEleWidth = this.textEleWidth < textEle.offsetWidth ? textEle.offsetWidth : this.textEleWidth;
            }
            if (isBeforeLabel) {
                var itemWidth = void 0;
                var labelWidth = this.stepperItemContainer.querySelector('.' + LABEL).offsetWidth + 15;
                if (this.beforeLabelWidth < labelWidth) {
                    this.beforeLabelWidth = labelWidth;
                }
                if (this.element.querySelector('ol').lastChild.querySelector('.' + ICONCSS)) {
                    itemWidth = (this.beforeLabelWidth + (this.stepperItemContainer.querySelector('.' + ICONCSS).offsetWidth / 2));
                }
                else if (this.stepperItemContainer.querySelector('.' + TEXTCSS)) {
                    itemWidth = (this.beforeLabelWidth + (this.stepperItemContainer.querySelector('.' + TEXTCSS).offsetWidth / 2));
                }
                if (this.progressBarPosition < itemWidth) {
                    this.progressBarPosition = itemWidth;
                }
            }
            else if (this.progressBarPosition < (iconOnly ? this.stepperItemContainer.offsetWidth : this.element.querySelector('ol').lastChild.firstChild.offsetWidth)) {
                this.progressBarPosition = iconOnly ? this.stepperItemContainer.offsetWidth : this.element.querySelector('ol').lastChild.firstChild.offsetWidth;
            }
        }
    };
    Stepper.prototype.checkValidState = function (item, stepSpan, isLabel) {
        if (item.isValid == null) {
            stepSpan.classList.add('e-step-content');
            if (isLabel) {
                stepSpan.innerHTML = item.label;
            }
            else {
                stepSpan.innerHTML = item.label ? item.label : item.text;
            }
            this.stepperItemContainer.appendChild(stepSpan);
        }
        else {
            stepSpan.classList.add(ICONCSS);
            this.stepperItemContainer.appendChild(stepSpan);
            this.stepperItemContainer.classList.add(STEPICON);
        }
    };
    Stepper.prototype.updateCurrentLabel = function () {
        var currentLabelPos;
        if (this.element.classList.contains(HORIZSTEP)) {
            currentLabelPos = this.labelPosition.toLowerCase() === 'top' ? 'before' : this.labelPosition.toLowerCase() === 'bottom' ? 'after' : this.labelPosition.toLowerCase();
        }
        else {
            currentLabelPos = this.labelPosition.toLowerCase() === 'start' ? 'before' : this.labelPosition.toLowerCase() === 'end' ? 'after' : this.labelPosition.toLowerCase();
        }
        return currentLabelPos;
    };
    Stepper.prototype.updateLabelPosition = function () {
        this.clearLabelPosition();
        this.labelContainer.classList.add('e-label-' + this.updateCurrentLabel());
        if (this.labelPosition.toLowerCase() === 'start' && this.orientation.toLowerCase() === 'vertical') {
            this.stepperItemContainer.firstChild ? this.stepperItemContainer.firstChild.before(this.labelContainer) : this.stepperItemContainer.appendChild(this.labelContainer);
        }
        else {
            this.stepperItemContainer.appendChild(this.labelContainer);
        }
        this.element.classList.add('e-label-' + this.updateCurrentLabel());
    };
    Stepper.prototype.clearLabelPosition = function () {
        var removeCss = this.labelContainer.classList.value.match(/(e-label-[after|before]+)/g);
        if (removeCss) {
            removeClass([this.labelContainer], removeCss);
            removeClass([this.element], removeCss);
        }
    };
    Stepper.prototype.checkValidStep = function () {
        for (var index = 0; index < this.steps.length; index++) {
            var item = this.steps[parseInt(index.toString(), 10)];
            var itemElement = this.stepperItemElements[parseInt(index.toString(), 10)];
            if (item.isValid !== null) {
                var indicatorEle = void 0;
                var iconEle = void 0;
                if (this.element.classList.contains(STEPINDICATOR) && !item.iconCss) {
                    indicatorEle = itemElement.querySelector('.' + ICONCSS);
                }
                else {
                    iconEle = itemElement.querySelector('.' + ICONCSS);
                }
                var textLabelIcon = itemElement.querySelector('.e-step-validation-icon');
                var itemIcon = item.iconCss.trim().split(' ');
                var validStep = itemElement.classList.contains('e-step-valid');
                if (indicatorEle) {
                    indicatorEle.classList.add('e-icons', validStep ? 'e-check' : 'e-circle-info');
                }
                if (iconEle) {
                    for (var i = 0; i < itemIcon.length; i++) {
                        iconEle.classList.remove(itemIcon[parseInt(i.toString(), 10)]);
                    }
                    iconEle.classList.add('e-icons', validStep ? 'e-check' : 'e-circle-info');
                }
                if (textLabelIcon) {
                    textLabelIcon.classList.add(validStep ? 'e-circle-check' : 'e-circle-info');
                    if (this.element.classList.contains(VERTICALSTEP)) {
                        var labelEle = itemElement.querySelector('.' + LABEL);
                        var textEle = itemElement.querySelector('.' + TEXT);
                        var itemWidth = textEle ? textEle.offsetWidth + textEle.getBoundingClientRect().left :
                            labelEle.offsetWidth + labelEle.getBoundingClientRect().left;
                        var validationIcon = itemElement.querySelector('.e-step-validation-icon');
                        validationIcon.style.setProperty('--icon-position', (itemWidth + 20) + 'px');
                    }
                }
            }
        }
    };
    Stepper.prototype.updateTooltip = function () {
        if (this.showTooltip) {
            this.tooltipObj = new Tooltip({
                target: '.e-step-container', windowCollision: true,
                opensOn: 'Custom', cssClass: this.cssClass ? (STEPPERTOOLTIP + ' ' + this.cssClass) : STEPPERTOOLTIP,
                position: 'TopCenter'
            });
            this.tooltipObj.appendTo(this.stepperItemList);
        }
        else {
            if (!isNullOrUndefined(this.tooltipObj)) {
                this.tooltipObj.destroy();
                this.tooltipObj = null;
            }
        }
    };
    Stepper.prototype.wireItemsEvents = function (itemElement, index) {
        var _this = this;
        EventHandler.add(itemElement, 'click', function (e) {
            if (_this.linear) {
                var linearModeValue = index - _this.activeStep;
                if (Math.abs(linearModeValue) === 1) {
                    _this.stepClickHandler(index, e, itemElement);
                }
            }
            else {
                _this.stepClickHandler(index, e, itemElement);
            }
        }, this);
        EventHandler.add(itemElement, 'mouseover', function () { return _this.openStepperTooltip(index); }, this);
        EventHandler.add(itemElement, 'mouseleave', function () { return _this.closeStepperTooltip(); }, this);
    };
    Stepper.prototype.openStepperTooltip = function (index) {
        var currentStep = this.steps[parseInt(index.toString(), 10)];
        if (this.showTooltip && (currentStep.label || currentStep.text)) {
            if (!this.tooltipOpen) {
                this.updateTooltipContent(index);
                this.tooltipObj.open(this.stepperItemElements[parseInt((index).toString(), 10)]);
                if (this.stepType.toLocaleLowerCase() !== 'label' && ((this.stepType.toLocaleLowerCase() === 'indicator') ||
                    (currentStep.label !== '' && currentStep.iconCss !== ''))) {
                    var tooltipPopupClass = currentStep.status.toLowerCase() === 'inprogress' ?
                        STEPPERTOOLTIP + " " + STEPPERIPROGRESSTIP + " " + (this.cssClass ? this.cssClass : '') : STEPPERTOOLTIP + " " + (this.cssClass ? this.cssClass : '');
                    this.tooltipObj.setProperties({ cssClass: tooltipPopupClass.trim() });
                }
                this.tooltipOpen = true;
            }
        }
    };
    Stepper.prototype.closeStepperTooltip = function () {
        if (this.tooltipOpen) {
            this.tooltipObj.close();
            this.tooltipOpen = false;
        }
    };
    Stepper.prototype.updateTooltipContent = function (index) {
        if (this.showTooltip) {
            if (this.isReact) {
                this.clearTemplate(['stepperTooltipTemplate']);
            }
            var content = void 0;
            var currentStep = this.steps[parseInt(index.toString(), 10)];
            if (this.tooltipTemplate) {
                content = this.createElement('span', { className: 'e-stepper-tooltip-content' });
                var templateFunction = this.getTemplateFunction(this.tooltipTemplate);
                append(templateFunction({ value: currentStep }, this, 'stepperTooltipTemplate', (this.element.id + 'tooltipTemplate'), this.isStringTemplate), content);
                this.tooltipObj.setProperties({ content: content }, true);
            }
            else {
                var content_1 = currentStep.label ? currentStep.label : currentStep.text;
                this.tooltipObj.setProperties({ content: initializeCSPTemplate(function () { return content_1; }) }, true);
            }
            this.renderReactTemplates();
        }
    };
    Stepper.prototype.stepClickHandler = function (index, e, itemElement) {
        var clickEventArgs = {
            element: itemElement, event: e, previousStep: this.activeStep,
            activeStep: index
        };
        this.trigger('stepClick', clickEventArgs);
        this.navigateToStep(index, e, itemElement, true);
    };
    Stepper.prototype.updateTemplateFunction = function () {
        this.templateFunction = this.template ? this.getTemplateFunction(this.template) : null;
    };
    Stepper.prototype.renderItemContent = function (index, isrerender) {
        var listItems = this.stepperItemList.querySelectorAll('li');
        if (isrerender) {
            this.removeItemContent(listItems[parseInt((index).toString(), 10)]);
        }
        if (this.template) {
            isrerender ? listItems[parseInt((index).toString(), 10)].classList.add(TEMPLATE) :
                this.stepperItemContainer.classList.add(TEMPLATE);
            var item = this.steps[parseInt(index.toString(), 10)];
            append(this.templateFunction({ step: item, currentStep: index }, this, 'stepperTemplate', (this.element.id + '_stepperTemplate'), this.isStringTemplate), isrerender ? listItems[parseInt((index).toString(), 10)] : this.stepperItemContainer);
        }
        this.renderReactTemplates();
    };
    Stepper.prototype.removeItemContent = function (ele) {
        ele.classList.remove(TEMPLATE);
        var firstChild = ele.firstElementChild;
        for (var i = 0; i < ele.childElementCount; i++) {
            firstChild.remove();
        }
    };
    Stepper.prototype.updateContent = function () {
        if (this.isReact) {
            this.clearTemplate(['stepperTemplate']);
        }
        for (var i = 0; i < this.steps.length; i++) {
            this.renderItemContent(i, true);
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    Stepper.prototype.getTemplateFunction = function (template) {
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return compile(content);
        }
        else {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    Stepper.prototype.navigateToStep = function (index, e, itemElement, isInteracted, isUpdated) {
        var _this = this;
        var eventArgs = {
            element: itemElement, event: e, isInteracted: isInteracted,
            previousStep: this.activeStep, activeStep: index, cancel: false
        };
        if (isUpdated != false) {
            var previousStep_1 = this.activeStep;
            this.trigger('stepChanging', eventArgs, function (args) {
                if (args.cancel) {
                    return;
                }
                _this.navigationHandler(index);
                var eventArgs = {
                    element: itemElement, event: e, isInteracted: isInteracted,
                    previousStep: previousStep_1, activeStep: _this.activeStep
                };
                _this.trigger('stepChanged', eventArgs);
            });
        }
        else {
            this.navigationHandler(index);
        }
    };
    Stepper.prototype.navigationHandler = function (index, stepStatus, isUpdated) {
        index = (index >= this.steps.length - 1) ? this.steps.length - 1 : index;
        var Itemslength = this.stepperItemElements.length;
        if (index >= 0 && index < Itemslength - 1) {
            index = this.stepperItemElements[parseInt(index.toString(), 10)].classList.contains(DISABLED) ? this.activeStep : index;
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.activeStep = parseInt(index.toString(), 10);
        this.isProtectedOnChange = prevOnChange;
        for (var i = 0; i < this.steps.length; i++) {
            var itemElement = this.stepperItemElements[parseInt(i.toString(), 10)];
            var item = this.steps[parseInt(i.toString(), 10)];
            itemElement.classList.remove(SELECTED, INPROGRESS, COMPLETED, NOTSTARTED);
            if (i === this.activeStep) {
                itemElement.classList.add(SELECTED);
            }
            if (this.activeStep >= 0 && this.progressbar) {
                if (this.element.classList.contains(HORIZSTEP)) {
                    if ((this.element.classList.contains(LABELBEFORE) || this.element.classList.contains(LABELAFTER)) && !this.element.classList.contains(STEPINDICATOR) &&
                        this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].classList.contains(STEPICON)) {
                        var progressPos = this.element.querySelector('.e-stepper-progressbar');
                        var selectedEle = this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].firstChild;
                        var value = this.activeStep === 0 ? 0 : (selectedEle.offsetLeft - progressPos.offsetLeft + (selectedEle.offsetWidth / 2)) / progressPos.offsetWidth * 100;
                        if (this.element.classList.contains(RTL)) {
                            value = (progressPos.getBoundingClientRect().right - selectedEle.getBoundingClientRect().right + (selectedEle.offsetWidth / 2)) / progressPos.offsetWidth * 100;
                            this.progressbar.style.setProperty(PROGRESSVALUE, (value) + '%');
                        }
                        else {
                            this.progressbar.style.setProperty(PROGRESSVALUE, (value) + '%');
                        }
                    }
                    else {
                        var totalLiWidth = 0;
                        var activeLiWidth = 0;
                        for (var j = 0; j < this.stepperItemElements.length; j++) {
                            totalLiWidth = totalLiWidth + this.stepperItemElements[parseInt(j.toString(), 10)].offsetWidth;
                            if (j <= this.activeStep) {
                                if (j < this.activeStep) {
                                    activeLiWidth = activeLiWidth + this.stepperItemElements[parseInt(j.toString(), 10)].offsetWidth;
                                }
                                else if (j == this.activeStep && j !== 0) {
                                    activeLiWidth = activeLiWidth + (this.stepperItemElements[parseInt(j.toString(), 10)].offsetWidth / 2);
                                }
                            }
                        }
                        var spaceWidth = (this.stepperItemList.offsetWidth - totalLiWidth) / (this.stepperItemElements.length - 1);
                        var progressValue = ((activeLiWidth + (spaceWidth * this.activeStep)) / this.stepperItemList.offsetWidth) * 100;
                        this.progressbar.style.setProperty(PROGRESSVALUE, (progressValue) + '%');
                    }
                }
                else {
                    this.progressbar.style.setProperty(PROGRESSVALUE, ((100 / (this.steps.length - 1)) * index) + '%');
                }
            }
            else if (this.activeStep < 0 && this.progressbar) {
                this.progressbar.style.setProperty(PROGRESSVALUE, 0 + '%');
            }
            if (i === this.activeStep) {
                itemElement.classList.add(INPROGRESS);
            }
            else if (this.activeStep > 0 && i < this.activeStep) {
                itemElement.classList.add(COMPLETED);
            }
            else {
                itemElement.classList.add(NOTSTARTED);
            }
            if (itemElement.classList.contains(INPROGRESS)) {
                attributes(itemElement, { 'tabindex': '0', 'aria-current': 'true' });
            }
            else {
                attributes(itemElement, { 'tabindex': '-1', 'aria-current': 'false' });
            }
            var prevOnChange_1 = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            if (isUpdated !== false) {
                if (i < this.activeStep || (this.steps.length - 1 === this.activeStep && item.status.toLowerCase() === "completed")) {
                    item.status = StepStatus.Completed;
                }
                else if (i === this.activeStep) {
                    item.status = StepStatus.InProgress;
                }
                else if (i > this.activeStep) {
                    item.status = StepStatus.NotStarted;
                }
                if (stepStatus && this.activeStep === i) {
                    item.status = stepStatus;
                }
                if (item.status.toLowerCase() === "completed") {
                    itemElement.classList.remove(SELECTED, INPROGRESS, NOTSTARTED);
                    itemElement.classList.add(COMPLETED);
                }
                if (item.status.toLowerCase() === "notstarted") {
                    itemElement.classList.remove(SELECTED, INPROGRESS, COMPLETED);
                    itemElement.classList.add(NOTSTARTED);
                }
            }
            this.isProtectedOnChange = prevOnChange_1;
            if (this.renderDefault(i) && this.element.classList.contains(STEPINDICATOR)) {
                if (itemElement.classList.contains(COMPLETED)) {
                    itemElement.firstChild.classList.remove('e-icons', 'e-step-indicator');
                    itemElement.firstChild.classList.add(ICONCSS, 'e-icons', 'e-check');
                }
                else if (itemElement.classList.contains(INPROGRESS) || itemElement.classList.contains(NOTSTARTED)) {
                    itemElement.firstChild.classList.remove(ICONCSS, 'e-icons', 'e-check');
                    itemElement.firstChild.classList.add('e-icons', 'e-step-indicator');
                }
            }
        }
    };
    Stepper.prototype.removeItemElements = function () {
        for (var i = 0; i < this.stepperItemElements.length; i++) {
            remove(this.stepperItemElements[parseInt(i.toString(), 10)]);
        }
        this.stepperItemElements = [];
    };
    Stepper.prototype.nextStep = function () {
        if (this.activeStep !== this.steps.length - 1) {
            this.navigateToStep(this.activeStep + 1, null, null, false);
        }
    };
    Stepper.prototype.previousStep = function () {
        if (this.activeStep > 0) {
            this.navigateToStep(this.activeStep - 1, null, null, false);
        }
    };
    Stepper.prototype.reset = function () {
        if (this.activeStep !== 0) {
            var isDisabled = this.stepperItemElements[0].classList.contains(DISABLED) ? true : false;
            this.navigateToStep(isDisabled ? -1 : 0, null, null, false);
        }
    };
    Stepper.prototype.updateElementClassArray = function () {
        var classArray = [RTL, READONLY, 'e-steps-focus', LABELAFTER, LABELBEFORE, 'e-label-top',
            'e-label-bottom', 'e-label-start', 'e-label-end', STEPINDICATOR, LABELINDICATOR, VERTICALSTEP, HORIZSTEP];
        removeClass([this.element], classArray);
    };
    Stepper.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        EventHandler.remove(window, 'resize', function () { if (_this.stepperItemList && _this.progressbar) {
            _this.setProgressPosition(_this.element, true);
        } });
        EventHandler.remove(window, 'click', function () { _this.updateStepFocus(); });
        // unwires the events and detach the li elements
        this.removeItemElements();
        this.clearTemplate();
        if (this.stepperItemList) {
            remove(this.stepperItemList);
        }
        this.stepperItemList = null;
        if (this.progressStep) {
            remove(this.progressStep);
        }
        this.progressStep = null;
        this.progressbar = null;
        this.progressBarPosition = null;
        this.stepperItemContainer = null;
        this.textContainer = null;
        this.labelContainer = null;
        this.updateElementClassArray();
        this.element.removeAttribute('aria-label');
        if (this.showTooltip) {
            this.tooltipObj.destroy();
            this.tooltipObj = null;
        }
        if (this.keyboardModuleStepper) {
            this.keyboardModuleStepper.destroy();
        }
        this.keyboardModuleStepper = null;
    };
    Stepper.prototype.wireKeyboardEvent = function () {
        this.keyboardModuleStepper = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    Stepper.prototype.keyActionHandler = function (e) {
        if (this.readOnly) {
            return;
        }
        switch (e.action) {
            case 'uparrow':
            case 'downarrow':
            case 'leftarrow':
            case 'rightarrow':
            case 'tab':
            case 'shiftTab':
                this.handleNavigation(this.enableRtl && this.element.classList.contains(HORIZSTEP) ? (e.action === 'leftarrow' || e.action === 'tab' || e.action === 'uparrow') : (e.action === 'rightarrow' || e.action === 'tab' || e.action === 'downarrow'), e);
                break;
            case 'space':
            case 'enter':
            case 'escape':
                this.handleNavigation(null, e);
                break;
            case 'home':
            case 'end':
                this.handleNavigation(null, e, this.enableRtl);
                break;
        }
    };
    Stepper.prototype.handleNavigation = function (isNextStep, e, isRTL) {
        this.isKeyNavFocus = true;
        this.element.classList.add('e-steps-focus');
        var focusedEle = this.element.querySelector('.' + FOCUS);
        if (!focusedEle) {
            focusedEle = this.element.querySelector('.' + SELECTED);
        }
        var stepItems = Array.prototype.slice.call(this.stepperItemList.children);
        var index = stepItems.indexOf(focusedEle);
        if (e.action === 'tab' || e.action === 'shiftTab' || e.action === 'downarrow' || e.action === 'uparrow' || e.action === 'space' || e.action === 'home' || e.action === 'end') {
            if ((e.action === 'tab' && index === stepItems.length - 1) || (e.action === 'shiftTab' && index === 0)) {
                if (focusedEle.classList.contains(FOCUS)) {
                    this.updateStepFocus();
                    return;
                }
            }
            else {
                e.preventDefault();
            }
        }
        if (e.action === 'escape') {
            stepItems[parseInt(index.toString(), 10)].classList.remove(FOCUS);
            this.element.classList.remove('e-steps-focus');
        }
        if (!(e.action === 'space' || e.action === 'enter')) {
            var prevIndex = index;
            index = isNextStep ? index + 1 : index - 1;
            while ((index >= 0 && index < stepItems.length) && stepItems[parseInt(index.toString(), 10)].classList.contains(DISABLED)) {
                index = isNextStep ? index + 1 : index - 1;
            }
            index = (index < 0) ? 0 : (index > stepItems.length - 1) ? stepItems.length - 1 : index;
            if (stepItems[parseInt(prevIndex.toString(), 10)].classList.contains(FOCUS)) {
                stepItems[parseInt(prevIndex.toString(), 10)].classList.remove(FOCUS);
            }
            if ((e.action === 'home' || e.action === 'end')) {
                if (e.action === 'home') {
                    isRTL ? index = stepItems.length - 1 : index = 0;
                }
                else {
                    isRTL ? index = 0 : index = stepItems.length - 1;
                }
            }
            if (index >= 0 && index < stepItems.length) {
                stepItems[parseInt(index.toString(), 10)].classList.add(FOCUS);
            }
        }
        else if ((e.action === 'space' || e.action === 'enter')) {
            var isupdateFocus = false;
            if (this.linear) {
                var linearModeValue = this.activeStep - index;
                if (Math.abs(linearModeValue) === 1) {
                    this.navigateToStep(index, null, null, true);
                    isupdateFocus = true;
                }
            }
            else {
                this.navigateToStep(index, null, null, true);
                isupdateFocus = true;
            }
            if (isupdateFocus) {
                this.updateStepFocus();
                this.stepperItemElements[index].focus();
            }
        }
    };
    Stepper.prototype.renderStepperItems = function (isUpdate, isStepType) {
        this.updateElementClassArray();
        this.removeItemElements();
        this.element.querySelector('.e-stepper-progressbar').remove();
        isUpdate ? this.updatePosition() : null;
        isStepType ? this.updateStepType() : null;
        this.readOnly ? (!this.element.classList.contains(READONLY)) ? this.element.classList.add(READONLY) : null : null;
        this.enableRtl ? (!this.element.classList.contains(RTL)) ? this.element.classList.add(RTL) : null : null;
        this.updateOrientaion(this.element);
        this.renderItems();
        this.renderProgressBar(this.element);
        this.checkValidStep();
        this.updateAnimation();
        this.navigateToStep(this.activeStep, null, this.stepperItemElements[this.activeStep], true);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {StepperModel} newProp - Specifies new properties
     * @param  {StepperModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Stepper.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'steps': {
                    if (!(newProp.steps instanceof Array && oldProp.steps instanceof Array)) {
                        var stepCounts = Object.keys(newProp.steps);
                        for (var i = 0; i < stepCounts.length; i++) {
                            var index = parseInt(Object.keys(newProp.steps)[i], 10);
                            var changedPropsCount = Object.keys(newProp.steps[index]).length;
                            for (var j = 0; j < changedPropsCount; j++) {
                                var property = Object.keys(newProp.steps[index])[j];
                                if (property === 'status') {
                                    if (this.activeStep === index) {
                                        this.navigationHandler(index, newProp.steps[index].status);
                                    }
                                    else {
                                        this.steps[index].status = oldProp.steps[index].status;
                                    }
                                }
                                else {
                                    this.removeItemElements();
                                    this.renderItems();
                                    this.updateStepperStatus();
                                }
                                this.checkValidStep();
                            }
                        }
                    }
                    else {
                        this.renderStepperItems(true, true);
                    }
                    break;
                }
                case 'orientation':
                    this.updateOrientaion(this.element);
                    this.renderStepperItems(true);
                    break;
                case 'activeStep':
                    this.activeStep = (newProp.activeStep > this.steps.length - 1 || newProp.activeStep < -1) ? oldProp.activeStep : this.activeStep;
                    if (this.activeStep >= 0 && this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].classList.contains(DISABLED)) {
                        this.activeStep = oldProp.activeStep;
                    }
                    if (this.linear) {
                        var linearModeValue = oldProp.activeStep - this.activeStep;
                        if (Math.abs(linearModeValue) === 1) {
                            this.navigateToStep(this.activeStep, null, null, true);
                        }
                    }
                    else {
                        this.navigateToStep(this.activeStep, null, this.stepperItemElements[this.activeStep], true);
                    }
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL);
                    break;
                case 'readOnly':
                    this.element.classList[this.readOnly ? 'add' : 'remove'](READONLY);
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.trim().split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.trim().split(' '));
                    }
                    if (this.tooltipObj) {
                        this.tooltipObj.setProperties({ cssClass: this.cssClass ? (STEPPERTOOLTIP + ' ' + this.cssClass) : STEPPERTOOLTIP });
                    }
                    break;
                case 'labelPosition':
                    this.renderStepperItems(true);
                    break;
                case 'showTooltip':
                    this.updateTooltip();
                    break;
                case 'stepType':
                    this.renderStepperItems(true, true);
                    break;
                case 'template':
                    this.updateTemplateFunction();
                    this.updateContent();
                    break;
                case 'animation':
                    this.updateAnimation();
                    break;
            }
        }
    };
    __decorate([
        Property(0)
    ], Stepper.prototype, "activeStep", void 0);
    __decorate([
        Complex({}, StepperAnimationSettings)
    ], Stepper.prototype, "animation", void 0);
    __decorate([
        Property(false)
    ], Stepper.prototype, "linear", void 0);
    __decorate([
        Property(false)
    ], Stepper.prototype, "showTooltip", void 0);
    __decorate([
        Property('')
    ], Stepper.prototype, "template", void 0);
    __decorate([
        Property('')
    ], Stepper.prototype, "tooltipTemplate", void 0);
    __decorate([
        Property(StepLabelPosition.Bottom)
    ], Stepper.prototype, "labelPosition", void 0);
    __decorate([
        Property(StepType.Default)
    ], Stepper.prototype, "stepType", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "stepChanged", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "stepChanging", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "stepClick", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "beforeStepRender", void 0);
    Stepper = __decorate([
        NotifyPropertyChanges
    ], Stepper);
    return Stepper;
}(StepperBase));
export { Stepper };
