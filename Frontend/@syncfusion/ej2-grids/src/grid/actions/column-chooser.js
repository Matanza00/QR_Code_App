import { classList, addClass, removeClass, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { EventHandler, closest } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { Dialog, calculateRelativeBasedPosition } from '@syncfusion/ej2-popups';
import { createCboxWithWrap, toogleCheckbox, parentsUntil, removeAddCboxClasses, setChecked } from '../base/util';
import { ResponsiveDialogAction } from '../base/enum';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { SearchBox } from '../services/focus-strategy';
import * as literals from '../base/string-literals';
/**
 * The `ColumnChooser` module is used to show or hide columns dynamically.
 */
var ColumnChooser = /** @class */ (function () {
    /**
     * Constructor for the Grid ColumnChooser module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     * @hidden
     */
    function ColumnChooser(parent, serviceLocator) {
        this.filterColumns = [];
        this.showColumn = [];
        this.hideColumn = [];
        this.changedColumns = [];
        this.unchangedColumns = [];
        this.isDlgOpen = false;
        this.initialOpenDlg = true;
        this.stateChangeColumns = [];
        this.changedStateColumns = [];
        this.isInitialOpen = false;
        this.isCustomizeOpenCC = false;
        this.searchOperator = 'startswith';
        this.prevShowedCols = [];
        this.hideDialogFunction = this.hideDialog.bind(this);
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
        this.cBoxTrue = createCheckBox(this.parent.createElement, false, { checked: true, label: ' ' });
        this.cBoxFalse = createCheckBox(this.parent.createElement, false, { checked: false, label: ' ' });
        this.cBoxTrue.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden e-cc e-cc-chbox', attrs: { type: 'checkbox' }
        }), this.cBoxTrue.firstChild);
        this.cBoxFalse.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden e-cc e-cc-chbox', attrs: { 'type': 'checkbox' }
        }), this.cBoxFalse.firstChild);
        this.cBoxFalse.querySelector('.e-frame').classList.add('e-uncheck');
        if (this.parent.enableRtl) {
            addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
        }
        if (this.parent.cssClass) {
            if (this.parent.cssClass.indexOf(' ') !== -1) {
                addClass([this.cBoxTrue, this.cBoxFalse], this.parent.cssClass.split(' '));
            }
            else {
                addClass([this.cBoxTrue, this.cBoxFalse], [this.parent.cssClass]);
            }
        }
        if (this.parent.enableAdaptiveUI) {
            this.setFullScreenDialog();
        }
    }
    ColumnChooser.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement.querySelector('.' + literals.gridContent) && (!gridElement.querySelector('.' + literals.gridHeader)) || !gridElement) {
            return;
        }
        this.removeEventListener();
        this.unWireEvents();
        if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.element && !this.dlgObj.isDestroyed) {
            this.dlgObj.destroy();
        }
    };
    ColumnChooser.prototype.setFullScreenDialog = function () {
        if (this.serviceLocator) {
            this.serviceLocator.registerAdaptiveService(this, this.parent.enableAdaptiveUI, ResponsiveDialogAction.isColumnChooser);
        }
    };
    ColumnChooser.prototype.rtlUpdate = function () {
        if (!isNullOrUndefined(this.innerDiv)) {
            if (this.parent.enableRtl) {
                addClass([].slice.call(this.innerDiv.getElementsByClassName('e-checkbox-wrapper')), ['e-rtl']);
            }
            else {
                removeClass([].slice.call(this.innerDiv.getElementsByClassName('e-checkbox-wrapper')), ['e-rtl']);
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.add(document, 'click', this.clickHandler, this);
        this.parent.on(events.uiUpdate, this.enableAfterRenderEle, this);
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.addEventListener(events.dataBound, this.hideDialogFunction);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.rtlUpdated, this.rtlUpdate, this);
        this.parent.on(events.resetColumns, this.onResetColumns, this);
        if (this.parent.enableAdaptiveUI) {
            this.parent.on(events.setFullScreenDialog, this.setFullScreenDialog, this);
            this.parent.on(events.renderResponsiveColumnChooserDiv, this.renderResponsiveColumnChooserDiv, this);
            this.parent.on(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction, this);
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.remove(document, 'click', this.clickHandler);
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.uiUpdate, this.enableAfterRenderEle);
        this.parent.off(events.rtlUpdated, this.rtlUpdate);
        this.parent.off(events.resetColumns, this.onResetColumns);
        this.parent.removeEventListener(events.dataBound, this.hideDialogFunction);
        this.parent.off(events.setFullScreenDialog, this.setFullScreenDialog);
        if (this.parent.enableAdaptiveUI) {
            this.parent.off(events.setFullScreenDialog, this.setFullScreenDialog);
            this.parent.off(events.renderResponsiveColumnChooserDiv, this.renderResponsiveColumnChooserDiv);
            this.parent.off(events.renderResponsiveChangeAction, this.renderResponsiveChangeAction);
        }
    };
    ColumnChooser.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        if (!this.parent.enableAdaptiveUI) {
            this.renderDlgContent();
        }
        this.getShowHideService = this.serviceLocator.getService('showHideService');
    };
    ColumnChooser.prototype.clickHandler = function (e) {
        var targetElement = e.target;
        if (!this.isCustomizeOpenCC) {
            if (!isNullOrUndefined(closest(targetElement, '.e-cc-toolbar')) || !isNullOrUndefined(closest(targetElement, '.e-cc'))) {
                if (targetElement.classList.contains('e-columnchooser-btn') || targetElement.classList.contains('e-cc-toolbar')) {
                    if ((this.initialOpenDlg && this.dlgObj.visible) || !this.isDlgOpen) {
                        this.isDlgOpen = true;
                        return;
                    }
                }
                else if (targetElement.classList.contains('e-cc-cancel')) {
                    targetElement.parentElement.querySelector('.e-ccsearch').value = '';
                    this.columnChooserSearch('');
                    this.removeCancelIcon();
                    this.refreshCheckboxButton();
                }
            }
            else {
                if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.visible && !targetElement.classList.contains('e-toolbar-items')) {
                    this.dlgObj.hide();
                    this.clearActions();
                    this.refreshCheckboxState();
                    // this.unWireEvents();
                    this.isDlgOpen = false;
                }
            }
            if (this.parent.detailTemplate || this.parent.childGrid) {
                this.targetdlg = e.target;
            }
        }
        if (this.isCustomizeOpenCC && e.target.classList.contains('e-cc-cancel')) {
            this.refreshCheckboxState();
        }
        if (!this.parent.enableAdaptiveUI) {
            this.rtlUpdate();
        }
        else {
            if (this.parent.enableRtl) {
                addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
            }
        }
    };
    ColumnChooser.prototype.hideDialog = function () {
        if (!isNullOrUndefined(this.dlgObj) && this.dlgObj.visible) {
            this.dlgObj.hide();
            // this.unWireEvents();
            this.isDlgOpen = false;
        }
    };
    /**
     * To render columnChooser when showColumnChooser enabled.
     *
     * @param {number} x - specifies the position x
     * @param {number} y - specifies the position y
     * @param {Element} target - specifies the target
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.renderColumnChooser = function (x, y, target) {
        if (!this.dlgObj.visible && (this.parent.detailTemplate || this.parent.childGrid)) {
            this.hideOpenedDialog();
        }
        if (!this.dlgObj.visible) {
            var args = this.beforeOpenColumnChooserEvent();
            if (args.cancel) {
                return;
            }
            if (target) {
                this.targetdlg = target;
            }
            this.refreshCheckboxState();
            this.dlgObj.dataBind();
            this.dlgObj.element.style.maxHeight = '430px';
            var elementVisible = this.dlgObj.element.style.display;
            this.dlgObj.element.style.display = 'block';
            var isSticky = this.parent.getHeaderContent().classList.contains('e-sticky');
            var toolbarItem = closest(target, '.e-toolbar-item');
            var newpos = void 0;
            if (isSticky) {
                newpos = toolbarItem.getBoundingClientRect();
                this.dlgObj.element.classList.add('e-sticky');
            }
            else {
                this.dlgObj.element.classList.remove('e-sticky');
                newpos = calculateRelativeBasedPosition(toolbarItem, this.dlgObj.element);
            }
            this.dlgObj.element.style.display = elementVisible;
            this.dlgObj.element.style.top = newpos.top + closest(target, '.e-cc-toolbar').getBoundingClientRect().height + 'px';
            var dlgWidth = 250;
            if (!isNullOrUndefined(closest(target, '.e-bigger'))) {
                this.dlgObj.width = 258;
            }
            if (Browser.isDevice) {
                this.dlgObj.target = document.body;
                this.dlgObj.position = { X: 'center', Y: 'center' };
                this.dlgObj.refreshPosition();
                this.dlgObj.open = this.mOpenDlg.bind(this);
            }
            else {
                if (this.parent.enableRtl) {
                    this.dlgObj.element.style.left = target.offsetLeft + 'px';
                }
                else {
                    this.dlgObj.element.style.left = ((newpos.left - dlgWidth) + closest(target, '.e-cc-toolbar').clientWidth) + 2 + 'px';
                }
            }
            this.removeCancelIcon();
            this.dlgObj.show();
            this.parent.notify(events.columnChooserOpened, { dialog: this.dlgObj });
        }
        else {
            // this.unWireEvents();
            this.hideDialog();
            this.addcancelIcon();
            this.clearActions();
            this.refreshCheckboxState();
        }
        this.rtlUpdate();
    };
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     *
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @return {void}
     */
    ColumnChooser.prototype.openColumnChooser = function (X, Y) {
        this.isCustomizeOpenCC = true;
        if (this.parent.enableAdaptiveUI) {
            this.renderDlgContent();
        }
        if (this.dlgObj.visible) {
            this.hideDialog();
            return;
        }
        var args = this.beforeOpenColumnChooserEvent();
        if (args.cancel) {
            return;
        }
        if (!this.isInitialOpen) {
            this.dlgObj.content = this.renderChooserList();
            this.updateIntermediateBtn();
        }
        else {
            this.refreshCheckboxState();
        }
        this.dlgObj.dataBind();
        this.dlgObj.position = { X: 'center', Y: 'center' };
        if (isNullOrUndefined(X)) {
            if (this.parent.enableAdaptiveUI) {
                this.dlgObj.position = { X: '', Y: '' };
            }
            this.dlgObj.refreshPosition();
        }
        else {
            this.dlgObj.element.style.top = '';
            this.dlgObj.element.style.left = '';
            this.dlgObj.element.style.top = Y + 'px';
            this.dlgObj.element.style.left = X + 'px';
        }
        this.dlgObj.beforeOpen = this.customDialogOpen.bind(this);
        this.dlgObj.show();
        this.isInitialOpen = true;
        this.dlgObj.beforeClose = this.customDialogClose.bind(this);
    };
    ColumnChooser.prototype.enableAfterRenderEle = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.render();
        }
    };
    ColumnChooser.prototype.keyUpHandler = function (e) {
        if (e.key === 'Escape') {
            this.hideDialog();
        }
        this.setFocus(parentsUntil(e.target, 'e-cclist'));
    };
    ColumnChooser.prototype.setFocus = function (elem) {
        var prevElem = this.dlgDiv.querySelector('.e-colfocus');
        if (prevElem) {
            prevElem.classList.remove('e-colfocus');
        }
        if (elem) {
            elem.classList.add('e-colfocus');
        }
    };
    ColumnChooser.prototype.customDialogOpen = function () {
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.add(searchElement, 'keyup', this.columnChooserManualSearch, this);
    };
    ColumnChooser.prototype.customDialogClose = function () {
        var searchElement = this.dlgObj.content.querySelector('input.e-ccsearch');
        EventHandler.remove(searchElement, 'keyup', this.columnChooserManualSearch);
    };
    ColumnChooser.prototype.getColumns = function () {
        var columns = this.parent.getColumns().filter(function (column) { return (column.type !== 'checkbox'
            && column.showInColumnChooser === true) || (column.type === 'checkbox' && column.field !== undefined); });
        return columns;
    };
    ColumnChooser.prototype.renderDlgContent = function () {
        var isAdaptive = this.parent.enableAdaptiveUI;
        this.dlgDiv = this.parent.createElement('div', { className: 'e-ccdlg e-cc', id: this.parent.element.id + '_ccdlg' });
        if (!isAdaptive) {
            this.parent.element.appendChild(this.dlgDiv);
        }
        this.dlgObj = new Dialog({
            header: this.parent.enableAdaptiveUI ? null : this.l10n.getConstant('ChooseColumns'),
            showCloseIcon: false,
            closeOnEscape: false,
            locale: this.parent.locale,
            visible: false,
            enableRtl: this.parent.enableRtl,
            target: document.getElementById(this.parent.element.id),
            content: this.renderChooserList(),
            width: 250,
            cssClass: this.parent.cssClass ? 'e-cc' + ' ' + this.parent.cssClass : 'e-cc',
            animationSettings: { effect: 'None' }
        });
        if (!isAdaptive) {
            this.dlgObj.buttons = [{
                    click: this.confirmDlgBtnClick.bind(this),
                    buttonModel: {
                        content: this.l10n.getConstant('OKButton'), isPrimary: true,
                        cssClass: this.parent.cssClass ? 'e-cc e-cc_okbtn' + ' ' + this.parent.cssClass : 'e-cc e-cc_okbtn'
                    }
                },
                {
                    click: this.clearBtnClick.bind(this),
                    buttonModel: {
                        cssClass: this.parent.cssClass ?
                            'e-flat e-cc e-cc-cnbtn' + ' ' + this.parent.cssClass : 'e-flat e-cc e-cc-cnbtn',
                        content: this.l10n.getConstant('CancelButton')
                    }
                }];
        }
        var isStringTemplate = 'isStringTemplate';
        this.dlgObj["" + isStringTemplate] = true;
        this.dlgObj.appendTo(this.dlgDiv);
        if (isAdaptive) {
            var responsiveCnt = document.querySelector('.e-responsive-dialog > .e-dlg-content > .e-mainfilterdiv');
            if (responsiveCnt) {
                responsiveCnt.appendChild(this.dlgDiv);
            }
            this.dlgObj.open = this.mOpenDlg.bind(this);
            this.dlgObj.target = document.querySelector('.e-rescolumnchooser > .e-dlg-content > .e-mainfilterdiv');
        }
        this.wireEvents();
    };
    ColumnChooser.prototype.renderChooserList = function () {
        this.mainDiv = this.parent.createElement('div', { className: 'e-main-div e-cc' });
        var searchDiv = this.parent.createElement('div', { className: 'e-cc-searchdiv e-cc e-input-group' });
        var ccsearchele = this.parent.createElement('input', {
            className: 'e-ccsearch e-cc e-input',
            attrs: { placeholder: this.l10n.getConstant('Search'), cssClass: this.parent.cssClass }
        });
        var ccsearchicon = this.parent.createElement('span', {
            className: 'e-ccsearch-icon e-icons e-cc e-input-group-icon',
            attrs: { title: this.l10n.getConstant('Search') }
        });
        var conDiv = this.parent.createElement('div', { className: 'e-cc-contentdiv' });
        this.innerDiv = this.parent.createElement('div', { className: 'e-innerdiv e-cc' });
        searchDiv.appendChild(ccsearchele);
        searchDiv.appendChild(ccsearchicon);
        this.searchBoxObj = new SearchBox(ccsearchele, this.serviceLocator);
        var innerDivContent = this.refreshCheckboxList(this.parent.getColumns());
        this.innerDiv.appendChild(innerDivContent);
        conDiv.appendChild(this.innerDiv);
        if (this.parent.enableAdaptiveUI) {
            var searchBoxDiv = this.parent.createElement('div', { className: 'e-cc-searchBox' });
            searchBoxDiv.appendChild(searchDiv);
            this.mainDiv.appendChild(searchBoxDiv);
        }
        else {
            this.mainDiv.appendChild(searchDiv);
        }
        this.mainDiv.appendChild(conDiv);
        return this.mainDiv;
    };
    ColumnChooser.prototype.confirmDlgBtnClick = function (args) {
        this.stateChangeColumns = [];
        this.changedStateColumns = [];
        this.changedColumns = (this.changedColumns.length > 0) ? this.changedColumns : this.unchangedColumns;
        this.changedColumnState(this.changedColumns);
        var uncheckedLength = this.ulElement.querySelector('.e-uncheck') &&
            this.ulElement.querySelectorAll('.e-uncheck:not(.e-selectall)').length;
        if (!isNullOrUndefined(args)) {
            if (uncheckedLength < this.parent.getColumns().length) {
                if (this.hideColumn.length) {
                    this.columnStateChange(this.hideColumn, false);
                }
                if (this.showColumn.length) {
                    this.columnStateChange(this.showColumn, true);
                }
                this.getShowHideService.setVisible(this.stateChangeColumns, this.changedStateColumns);
                this.clearActions();
                this.parent.notify(events.tooltipDestroy, { module: 'edit' });
                if (this.parent.getCurrentViewRecords().length === 0) {
                    var emptyRowCell = this.parent.element.querySelector('.e-emptyrow').querySelector('td');
                    emptyRowCell.setAttribute('colSpan', this.parent.getVisibleColumns().length.toString());
                }
            }
            if (this.parent.enableAdaptiveUI && this.parent.scrollModule) {
                this.parent.scrollModule.refresh();
            }
            if (this.parent.editSettings.showAddNewRow) {
                this.parent.notify(events.showAddNewRowFocus, {});
            }
        }
    };
    ColumnChooser.prototype.onResetColumns = function (e) {
        if (e.requestType === 'columnstate') {
            this.resetColumnState();
            return;
        }
    };
    ColumnChooser.prototype.renderResponsiveColumnChooserDiv = function (args) {
        if (args.action === 'open') {
            this.openColumnChooser();
        }
        else if (args.action === 'clear') {
            this.clearBtnClick();
        }
        else if (args.action === 'confirm') {
            this.confirmDlgBtnClick(true);
        }
    };
    ColumnChooser.prototype.resetColumnState = function () {
        this.showColumn = [];
        this.hideColumn = [];
        this.changedColumns = [];
        this.filterColumns = [];
        this.searchValue = '';
        this.hideDialog();
    };
    ColumnChooser.prototype.changedColumnState = function (changedColumns) {
        for (var index = 0; index < changedColumns.length; index++) {
            var colUid = changedColumns[parseInt(index.toString(), 10)];
            var currentCol = this.parent.getColumnByUid(colUid);
            this.changedStateColumns.push(currentCol);
        }
    };
    ColumnChooser.prototype.columnStateChange = function (stateColumns, state) {
        for (var index = 0; index < stateColumns.length; index++) {
            var colUid = stateColumns[parseInt(index.toString(), 10)];
            var currentCol = this.parent.getColumnByUid(colUid);
            if (currentCol.type !== 'checkbox') {
                currentCol.visible = state;
            }
            this.stateChangeColumns.push(currentCol);
        }
    };
    ColumnChooser.prototype.clearActions = function () {
        this.resetColumnState();
        this.addcancelIcon();
    };
    ColumnChooser.prototype.clearBtnClick = function () {
        this.clearActions();
        this.parent.notify(events.columnChooserCancelBtnClick, { dialog: this.dlgObj });
    };
    ColumnChooser.prototype.checkstatecolumn = function (isChecked, coluid, selectAll) {
        if (selectAll === void 0) { selectAll = false; }
        var currentCol = this.parent.getColumnByUid(coluid);
        if (isChecked) {
            if (this.hideColumn.indexOf(coluid) !== -1) {
                this.hideColumn.splice(this.hideColumn.indexOf(coluid), 1);
            }
            if (this.showColumn.indexOf(coluid) === -1 && !(currentCol && currentCol.visible)) {
                this.showColumn.push(coluid);
            }
        }
        else {
            if (this.showColumn.indexOf(coluid) !== -1) {
                this.showColumn.splice(this.showColumn.indexOf(coluid), 1);
            }
            if (this.hideColumn.indexOf(coluid) === -1 && (currentCol && currentCol.visible)) {
                this.hideColumn.push(coluid);
            }
        }
        if (selectAll) {
            if (!isChecked) {
                this.changedColumns.push(coluid);
            }
            else {
                this.unchangedColumns.push(coluid);
            }
        }
        else if (this.changedColumns.indexOf(coluid) !== -1) {
            this.changedColumns.splice(this.changedColumns.indexOf(coluid), 1);
        }
        else {
            this.changedColumns.push(coluid);
        }
    };
    ColumnChooser.prototype.columnChooserSearch = function (searchVal) {
        var clearSearch = false;
        var okButton;
        var buttonEle = this.dlgDiv.querySelector('.e-footer-content');
        var selectedCbox = this.ulElement.querySelector('.e-check') &&
            this.ulElement.querySelectorAll('.e-check:not(.e-selectall)').length;
        this.isInitialOpen = true;
        if (buttonEle) {
            okButton = buttonEle.querySelector('.e-btn').ej2_instances[0];
        }
        if (searchVal === '') {
            this.removeCancelIcon();
            this.filterColumns = this.getColumns();
            clearSearch = true;
        }
        else {
            this.filterColumns = new DataManager(this.getColumns()).executeLocal(new Query()
                .where('headerText', this.searchOperator, searchVal, true, this.parent.columnChooserSettings.ignoreAccent));
        }
        if (this.filterColumns.length) {
            this.innerDiv.innerHTML = ' ';
            this.innerDiv.classList.remove('e-ccnmdiv');
            this.innerDiv.appendChild(this.refreshCheckboxList(this.filterColumns));
            if (!clearSearch) {
                this.addcancelIcon();
                this.refreshCheckboxButton();
            }
            else {
                if (okButton && selectedCbox) {
                    okButton.disabled = false;
                }
                if (selectedCbox && this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                    this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: false });
                }
            }
        }
        else {
            var nMatchele = this.parent.createElement('span', { className: 'e-cc e-nmatch' });
            nMatchele.innerHTML = this.l10n.getConstant('Matchs');
            this.innerDiv.innerHTML = ' ';
            this.innerDiv.appendChild(nMatchele);
            this.innerDiv.classList.add('e-ccnmdiv');
            if (okButton) {
                okButton.disabled = true;
            }
            if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: true });
            }
        }
        this.flag = true;
        this.stopTimer();
    };
    ColumnChooser.prototype.wireEvents = function () {
        EventHandler.add(this.dlgObj.element, 'click', this.checkBoxClickHandler, this);
        EventHandler.add(this.searchBoxObj.searchBox, 'keyup', this.columnChooserManualSearch, this);
        EventHandler.add(this.dlgObj.element, 'keyup', this.keyUpHandler, this);
        this.searchBoxObj.wireEvent();
    };
    ColumnChooser.prototype.unWireEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        if (this.dlgObj && this.dlgObj.element) {
            EventHandler.remove(this.dlgObj.element, 'click', this.checkBoxClickHandler);
            EventHandler.remove(this.dlgObj.element, 'keyup', this.keyUpHandler);
        }
        if (this.searchBoxObj) {
            EventHandler.remove(this.searchBoxObj.searchBox, 'keyup', this.columnChooserManualSearch);
            this.searchBoxObj.unWireEvent();
        }
    };
    ColumnChooser.prototype.checkBoxClickHandler = function (e) {
        var checkstate;
        var elem = parentsUntil(e.target, 'e-checkbox-wrapper');
        if (elem) {
            var selectAll = elem.querySelector('.e-selectall');
            if (selectAll) {
                this.updateSelectAll(!elem.querySelector('.e-check'));
            }
            else {
                toogleCheckbox(elem.parentElement);
            }
            elem.querySelector('.e-chk-hidden').focus();
            if (elem.querySelector('.e-check')) {
                checkstate = true;
            }
            else if (elem.querySelector('.e-uncheck')) {
                checkstate = false;
            }
            this.updateIntermediateBtn();
            var columnUid = parentsUntil(elem, 'e-ccheck').getAttribute('uid');
            var column = (this.searchValue && this.searchValue.length) ? this.filterColumns : this.parent.getColumns();
            if (columnUid === this.parent.element.id + '-selectAll') {
                this.changedColumns = [];
                this.unchangedColumns = [];
                for (var i = 0; i < column.length; i++) {
                    if (column[parseInt(i.toString(), 10)].showInColumnChooser) {
                        this.checkstatecolumn(checkstate, column[parseInt(i.toString(), 10)].uid, true);
                    }
                }
            }
            else {
                this.checkstatecolumn(checkstate, columnUid);
            }
            this.refreshCheckboxButton();
            this.setFocus(parentsUntil(e.target, 'e-cclist'));
        }
    };
    ColumnChooser.prototype.updateIntermediateBtn = function () {
        var cnt = this.ulElement.children.length - 1;
        var className = [];
        var elem = this.ulElement.children[0].querySelector('.e-frame');
        var selected = this.ulElement.querySelectorAll('.e-check:not(.e-selectall)').length;
        var btn;
        if (!this.parent.enableAdaptiveUI) {
            btn = this.dlgObj.btnObj[0];
            btn.disabled = false;
        }
        else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
            this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: false });
        }
        var inputElem = elem.parentElement.querySelector('input');
        if (cnt === selected) {
            className = ['e-check'];
            setChecked(inputElem, true);
        }
        else if (selected) {
            className = ['e-stop'];
            inputElem.indeterminate = true;
        }
        else {
            className = ['e-uncheck'];
            setChecked(inputElem, false);
            if (!this.parent.enableAdaptiveUI) {
                btn.disabled = true;
            }
            else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: true });
            }
        }
        if (!this.parent.enableAdaptiveUI) {
            btn.dataBind();
        }
        removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
        addClass([elem], className);
    };
    ColumnChooser.prototype.updateSelectAll = function (checked) {
        var cBoxes = [].slice.call(this.ulElement.getElementsByClassName('e-frame'));
        for (var _i = 0, cBoxes_1 = cBoxes; _i < cBoxes_1.length; _i++) {
            var cBox = cBoxes_1[_i];
            removeAddCboxClasses(cBox, checked);
            var cBoxInput = cBox.parentElement.querySelector('input');
            if (cBox.classList.contains('e-check')) {
                setChecked(cBoxInput, true);
            }
            else if (cBox.classList.contains('e-uncheck')) {
                setChecked(cBoxInput, false);
            }
        }
    };
    ColumnChooser.prototype.refreshCheckboxButton = function () {
        var visibleCols = this.parent.getVisibleColumns();
        for (var i = 0; i < visibleCols.length; i++) {
            var columnUID = visibleCols[parseInt(i.toString(), 10)].uid;
            if (this.prevShowedCols.indexOf(columnUID) === -1 && visibleCols[parseInt(i.toString(), 10)].type !== 'checkbox') {
                this.prevShowedCols.push(columnUID);
            }
        }
        for (var i = 0; i < this.hideColumn.length; i++) {
            var index = this.prevShowedCols.indexOf(this.hideColumn[parseInt(i.toString(), 10)]);
            if (index !== -1) {
                this.prevShowedCols.splice(index, 1);
            }
        }
        var selected = this.showColumn.length !== 0 ? 1 : this.prevShowedCols.length;
        var btn;
        if (!this.parent.enableAdaptiveUI) {
            btn = this.dlgDiv.querySelector('.e-footer-content').querySelector('.e-btn').ej2_instances[0];
            btn.disabled = false;
        }
        else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
            this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: false });
        }
        var srchShowCols = [];
        var searchData = [].slice.call(this.parent.element.getElementsByClassName('e-cc-chbox'));
        for (var i = 0, itemsLen = searchData.length; i < itemsLen; i++) {
            var element = searchData[parseInt(i.toString(), 10)];
            var columnUID = parentsUntil(element, 'e-ccheck').getAttribute('uid');
            srchShowCols.push(columnUID);
        }
        var hideCols = this.showColumn.filter(function (column) { return srchShowCols.indexOf(column) !== -1; });
        if (selected === 0 && hideCols.length === 0) {
            if (!this.parent.enableAdaptiveUI) {
                btn.disabled = true;
            }
            else if (this.parent.enableAdaptiveUI && this.responsiveDialogRenderer) {
                this.parent.notify(events.refreshCustomFilterOkBtn, { disabled: true });
            }
        }
        if (!this.parent.enableAdaptiveUI) {
            btn.dataBind();
        }
    };
    ColumnChooser.prototype.refreshCheckboxList = function (gdCol) {
        this.ulElement = this.parent.createElement('ul', { className: 'e-ccul-ele e-cc' });
        var selectAllValue = this.l10n.getConstant('SelectAll');
        var cclist = this.parent.createElement('li', { className: 'e-cclist e-cc e-cc-selectall' });
        var selectAll = this.createCheckBox(selectAllValue, false, this.parent.element.id + '-selectAll');
        if (gdCol.length) {
            selectAll.querySelector('.e-checkbox-wrapper').firstElementChild.classList.add('e-selectall');
            selectAll.querySelector('.e-frame').classList.add('e-selectall');
            this.checkState(selectAll.querySelector('.e-icons'), true);
            cclist.appendChild(selectAll);
            this.ulElement.appendChild(cclist);
        }
        if (this.parent.cssClass) {
            if (this.parent.cssClass.indexOf(' ') !== -1) {
                addClass([selectAll], this.parent.cssClass.split(' '));
            }
            else {
                addClass([selectAll], [this.parent.cssClass]);
            }
        }
        for (var i = 0; i < gdCol.length; i++) {
            var columns = gdCol[parseInt(i.toString(), 10)];
            this.renderCheckbox(columns);
        }
        return this.ulElement;
    };
    ColumnChooser.prototype.refreshCheckboxState = function () {
        this.dlgObj.element.querySelector('.e-cc.e-input').value = '';
        this.columnChooserSearch('');
        var gridObject = this.parent;
        var currentCheckBoxColls = this.dlgObj.element.querySelectorAll('.e-cc-chbox:not(.e-selectall)');
        for (var i = 0, itemLen = currentCheckBoxColls.length; i < itemLen; i++) {
            var element = currentCheckBoxColls[parseInt(i.toString(), 10)];
            var columnUID = void 0;
            if (this.parent.childGrid || this.parent.detailTemplate) {
                columnUID = parentsUntil(this.dlgObj.element.querySelectorAll('.e-cc-chbox:not(.e-selectall)')[parseInt(i.toString(), 10)], 'e-ccheck').getAttribute('uid');
            }
            else {
                columnUID = parentsUntil(element, 'e-ccheck').getAttribute('uid');
            }
            var column = gridObject.getColumnByUid(columnUID);
            var uncheck = [].slice.call(element.parentElement.getElementsByClassName('e-uncheck'));
            if (column.visible && !uncheck.length) {
                element.checked = true;
                this.checkState(element.parentElement.querySelector('.e-icons'), true);
            }
            else {
                element.checked = false;
                this.checkState(element.parentElement.querySelector('.e-icons'), false);
            }
        }
    };
    ColumnChooser.prototype.checkState = function (element, state) {
        if (state) {
            classList(element, ['e-check'], ['e-uncheck']);
        }
        else {
            classList(element, ['e-uncheck'], ['e-check']);
        }
    };
    ColumnChooser.prototype.createCheckBox = function (label, checked, uid) {
        var cbox = checked ? this.cBoxTrue.cloneNode(true) : this.cBoxFalse.cloneNode(true);
        var cboxLabel = cbox.querySelector('.e-label');
        var inputcbox = cbox.querySelector('input');
        setChecked(inputcbox, checked);
        cboxLabel.setAttribute('id', uid + 'label');
        cboxLabel.innerHTML = label;
        inputcbox.setAttribute('aria-labelledby', cboxLabel.id);
        return createCboxWithWrap(uid, cbox, 'e-ccheck');
    };
    ColumnChooser.prototype.renderCheckbox = function (column) {
        var cclist;
        var hideColState;
        var showColState;
        if (column.showInColumnChooser) {
            cclist = this.parent.createElement('li', { className: 'e-cclist e-cc', styles: 'list-style:None', id: 'e-ccli_' + column.uid });
            hideColState = this.hideColumn.indexOf(column.uid) === -1 ? false : true;
            showColState = this.showColumn.indexOf(column.uid) === -1 ? false : true;
            var cccheckboxlist = this.createCheckBox(column.headerText, (column.visible && !hideColState) || showColState, column.uid);
            cclist.appendChild(cccheckboxlist);
            if (this.parent.cssClass) {
                if (this.parent.cssClass.indexOf(' ') !== -1) {
                    addClass([cccheckboxlist], this.parent.cssClass.split(' '));
                }
                else {
                    addClass([cccheckboxlist], [this.parent.cssClass]);
                }
            }
            this.ulElement.appendChild(cclist);
        }
        if (this.isInitialOpen) {
            this.updateIntermediateBtn();
        }
    };
    ColumnChooser.prototype.columnChooserManualSearch = function (e) {
        this.addcancelIcon();
        this.searchValue = e.target.value;
        this.stopTimer();
        this.startTimer(e);
    };
    ColumnChooser.prototype.startTimer = function (e) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var interval = !proxy.flag && e.keyCode !== 13 ? 500 : 0;
        this.timer = window.setInterval(function () { proxy.columnChooserSearch(proxy.searchValue); }, interval);
    };
    ColumnChooser.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    ColumnChooser.prototype.addcancelIcon = function () {
        this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').classList.add('e-cc-cancel');
        this.dlgDiv.querySelector('.e-cc-cancel').setAttribute('title', this.l10n.getConstant('Clear'));
    };
    ColumnChooser.prototype.removeCancelIcon = function () {
        this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').classList.remove('e-cc-cancel');
        this.dlgDiv.querySelector('.e-cc.e-ccsearch-icon').setAttribute('title', this.l10n.getConstant('Search'));
    };
    ColumnChooser.prototype.mOpenDlg = function () {
        if (Browser.isDevice) {
            this.dlgObj.element.querySelector('.e-cc-searchdiv').classList.remove('e-input-focus');
            this.dlgObj.element.querySelectorAll('.e-cc-chbox')[0].focus();
        }
        if (this.parent.enableAdaptiveUI) {
            this.dlgObj.element.querySelector('.e-cc-searchdiv').classList.add('e-input-focus');
        }
    };
    // internally use
    ColumnChooser.prototype.getModuleName = function () {
        return 'columnChooser';
    };
    ColumnChooser.prototype.hideOpenedDialog = function () {
        var openCC = [].slice.call(document.getElementsByClassName('e-ccdlg')).filter(function (dlgEle) {
            return dlgEle.classList.contains('e-popup-open');
        });
        for (var i = 0, dlgLen = openCC.length; i < dlgLen; i++) {
            if (this.parent.element.id + '_ccdlg' !== openCC[parseInt(i.toString(), 10)].id || openCC[parseInt(i.toString(), 10)].classList.contains('e-dialog')) {
                openCC[parseInt(i.toString(), 10)].ej2_instances[0].hide();
            }
        }
    };
    ColumnChooser.prototype.beforeOpenColumnChooserEvent = function () {
        var args1 = {
            requestType: 'beforeOpenColumnChooser', element: this.parent.element,
            columns: this.getColumns(), cancel: false,
            searchOperator: this.parent.columnChooserSettings.operator
        };
        this.parent.trigger(events.beforeOpenColumnChooser, args1);
        this.searchOperator = args1.searchOperator;
        return args1;
    };
    ColumnChooser.prototype.renderResponsiveChangeAction = function (args) {
        this.responsiveDialogRenderer.action = args.action;
    };
    /**
     * To show the responsive custom sort dialog
     *
     * @param {boolean} enable - specifes dialog open
     * @returns {void}
     * @hidden
     */
    ColumnChooser.prototype.showCustomColumnChooser = function (enable) {
        this.responsiveDialogRenderer.isCustomDialog = enable;
        this.responsiveDialogRenderer.showResponsiveDialog();
    };
    return ColumnChooser;
}());
export { ColumnChooser };
