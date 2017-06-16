/**
 * Created by Lizeqiangd on 2017/3/18.
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
exports.__esModule = true;
/// <reference path="./../../../../node_modules/@types/react/index.d.ts" />
var React = require("react");
var DeviceCardBase_1 = require("./DeviceCardBase");
var CommunicationManager_1 = require("../../controller/CommunicationManager");
var StateManager_1 = require("../../controller/StateManager");
var DeviceCardBase_2 = require("./DeviceCardBase");
var ProjectionScreenRemote = (function (_super) {
    __extends(ProjectionScreenRemote, _super);
    function ProjectionScreenRemote(props) {
        var _this = _super.call(this, props) || this;
        _this.state['button_disabled'] = false;
        return _this;
    }
    ProjectionScreenRemote.prototype.submit_command = function (command) {
        var _this = this;
        // console.log(this)
        //noinspection TypeScriptUnresolvedFunction
        this.setState({
            button_disabled: true
        });
        setTimeout(function () {
            //noinspection TypeScriptUnresolvedFunction
            _this.setState({
                button_disabled: false
            });
        }, 1500);
        switch (command) {
            case 'up':
                StateManager_1["default"].setDeviceState(this.device_name, { "projection_screen_state": 1 });
                break;
            case 'stop':
                StateManager_1["default"].setDeviceState(this.device_name, { "projection_screen_state": 2 });
                break;
            case 'down':
                StateManager_1["default"].setDeviceState(this.device_name, { "projection_screen_state": 3 });
                break;
        }
        var remote_data = [{
                "type": this.device_type,
                "target_device_name": this.device_name,
                "command": command
            }];
        CommunicationManager_1["default"].postCommand(this.remote_address, remote_data);
    };
    ProjectionScreenRemote.prototype.render = function () {
        var projection_screen_state = '未知';
        switch (this.state['projection_screen_state']) {
            case 1:
                projection_screen_state = '上升';
                break;
            case 2:
                projection_screen_state = '停止';
                break;
            case 3:
                projection_screen_state = '下降';
                break;
        }
        return (React.createElement(DeviceCardBase_2.DeviceCardHeader, { card_class_prefix: this.card_class_prefix, device_module: this.device_module },
            React.createElement("div", { className: "card-block" },
                React.createElement("div", { className: "btn-group " },
                    React.createElement("button", { className: (this.state['projection_screen_state'] == 1 ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "up", disabled: this.state['button_disabled'] }, "\u4E0A\u5347"),
                    React.createElement("button", { className: (this.state['projection_screen_state'] == 2 ? "active" : "") + " btn btn-outline-danger " + this.control_button_classname, value: "stop", disabled: this.state['button_disabled'] }, "\u505C\u6B62"),
                    React.createElement("button", { className: (this.state['projection_screen_state'] == 3 ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "down", disabled: this.state['button_disabled'] }, "\u4E0B\u964D"))),
            React.createElement("div", { className: "card-footer" },
                React.createElement("span", { className: "col-12" },
                    "\u5F53\u524D\u72B6\u6001: ",
                    projection_screen_state))));
    };
    return ProjectionScreenRemote;
}(DeviceCardBase_1["default"]));
exports["default"] = ProjectionScreenRemote;
//# sourceMappingURL=ProjectionScreenRemote.js.map