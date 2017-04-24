/**
 * Created by Lizeqiangd on 2017/4/24.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./../../../../node_modules/@types/react/index.d.ts" />
var React = require("react");
var DeviceCardBase_1 = require("./DeviceCardBase");
var CommunicationManager_1 = require("../../controller/CommunicationManager");
var StateManager_1 = require("../../controller/StateManager");
var DeviceCardBase_2 = require("./DeviceCardBase");
var BedroomLocker = (function (_super) {
    __extends(BedroomLocker, _super);
    function BedroomLocker(props) {
        var _this = _super.call(this, props) || this;
        _this.state['button_disabled'] = false;
        return _this;
    }
    BedroomLocker.prototype.submit_command = function (command) {
        var _this = this;
        //noinspection TypeScriptUnresolvedFunction
        this.setState({
            button_disabled: true
        });
        setTimeout(function () {
            //noinspection TypeScriptUnresolvedFunction
            _this.setState({
                button_disabled: false
            });
        }, 5000);
        switch (command) {
            case 'lock':
                StateManager_1.default.setDeviceState(this.device_name, { "projection_screen_state": 1 });
                break;
            case 'unloock':
                StateManager_1.default.setDeviceState(this.device_name, { "projection_screen_state": 2 });
                break;
        }
        var remote_data = [{
                "type": this.device_type,
                "target_device_name": this.device_name,
                "command": command,
            }];
        CommunicationManager_1.default.postCommand(this.remote_address, remote_data);
    };
    BedroomLocker.prototype.render = function () {
        var projection_screen_state = '未知';
        switch (this.state['projection_screen_state']) {
            case 1:
                projection_screen_state = '锁定';
                break;
            case 2:
                projection_screen_state = '解锁';
                break;
        }
        return (React.createElement(DeviceCardBase_2.DeviceCardHeader, { card_class_prefix: this.card_class_prefix, device_module: this.device_module },
            React.createElement("div", { className: "card-block" },
                React.createElement("div", { className: "btn-group " },
                    React.createElement("button", { className: (this.state['projection_screen_state'] == 1 ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "lock", disabled: this.state['button_disabled'] }, "\u9501\u5B9A"),
                    React.createElement("button", { className: (this.state['projection_screen_state'] == 2 ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "unlock", disabled: this.state['button_disabled'] }, "\u89E3\u9501"))),
            React.createElement("div", { className: "card-footer" },
                React.createElement("span", { className: "col-12" },
                    "\u5F53\u524D\u72B6\u6001: ",
                    projection_screen_state))));
    };
    return BedroomLocker;
}(DeviceCardBase_1.default));
exports.default = BedroomLocker;
