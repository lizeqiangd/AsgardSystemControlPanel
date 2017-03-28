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
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
/// <reference path="./../../../../node_modules/@types/react/index.d.ts" />
var React = require("react");
var DeviceCardBase_1 = require("./DeviceCardBase");
var CommunicationManager_1 = require("../../controller/CommunicationManager");
var DysonRemote = (function (_super) {
    __extends(DysonRemote, _super);
    function DysonRemote(props) {
        return _super.call(this, props) || this;
    }
    DysonRemote.prototype.submit_command = function (command) {
        var command_obj = {};
        for (var d in this.state['fan']) {
            command_obj[d] = this.state['fan'][d];
        }
        switch (command) {
            case "ON":
            case "OFF":
            case "AUTO":
                command_obj.fmod = command;
                break;
            case "night_on":
                command_obj.nmod = 'ON';
                break;
            case "night_off":
                command_obj.nmod = 'OFF';
                break;
            case "oscillation_on":
                command_obj.oson = 'ON';
                break;
            case "oscillation_off":
                command_obj.oson = 'OFF';
                break;
            default:
                command_obj.fmod = 'FAN';
                command_obj.fnsp = command;
        }
        this.setState({ fan: command_obj });
        var remote_data = [{
                "type": this.device_type,
                "target_device_name": this.device_name,
                "command": command_obj
            }];
        CommunicationManager_1["default"].postCommand(this.remote_address, remote_data);
    };
    DysonRemote.prototype.componentDidMount = function () {
        var _this = this;
        _super.prototype.componentDidMount.call(this);
        $(function () {
            $("#dyson_remote_fanspeed_slider").slider({
                range: "min",
                value: _this.state['fan']['fnsp'] && _this.state['fan']['fnsp'] != 'AUTO' ? _this.state['fan']['fnsp'] : 1,
                min: 1,
                max: 10, step: 1,
                slide: function (event, ui) {
                    _this.submit_command(ui.value);
                }
            });
        });
    };
    DysonRemote.prototype.componentDidUpdate = function () {
    };
    DysonRemote.prototype.render = function () {
        var temp = this.state['env']['temp'] ? this.state['env']['temp'] + '°C' : '未知';
        var hr = this.state['env']['hr'] ? this.state['env']['hr'] * 100 + '%' : '未知';
        return (React.createElement("div", { className: this.card_class_prefix },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "card-header text-center" }, this.device_module),
                React.createElement("div", { className: "card-block" },
                    React.createElement("div", { className: "btn-group btn-group-justified col-12 mt-2" },
                        React.createElement("button", { className: (this.state['fan']['fmod'] == 'FAN' ? "active" : "") + " btn btn-outline-success " + this.control_button_classname, value: "FAN" }, "\u5F00\u673A"),
                        React.createElement("button", { className: (this.state['fan']['fmod'] == 'AUTO' ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "AUTO" }, "\u81EA\u52A8\u6A21\u5F0F"),
                        React.createElement("button", { className: (this.state['fan']['fmod'] == 'OFF' ? "active" : "") + " btn btn-outline-danger " + this.control_button_classname, value: "OFF" }, "\u5173\u673A")),
                    React.createElement("div", { className: "col-12" },
                        React.createElement("label", { htmlFor: 'dyson_remote_fanspeed_slider' },
                            "\u98CE\u901F:",
                            this.state['fan']['fnsp']),
                        React.createElement("div", { id: "dyson_remote_fanspeed_slider" })),
                    React.createElement("div", { className: "btn-group btn-group-justified col-12 mt-2" },
                        React.createElement("button", { className: (this.state['fan']['nmod'] == 'ON' ? "active" : " ") + " btn btn-outline-primary " + this.control_button_classname, value: "night_on" }, "\u6253\u5F00\u591C\u95F4\u6A21\u5F0F"),
                        React.createElement("button", { className: (this.state['fan']['nmod'] == 'OFF' ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "night_off" }, "\u5173\u95ED\u591C\u95F4\u6A21\u5F0F")),
                    React.createElement("div", { className: "btn-group btn-group-justified col-12 mt-2" },
                        React.createElement("button", { className: (this.state['fan']['oson'] == 'ON' ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "oscillation_on" }, "\u6253\u5F00\u6447\u5934\u6A21\u5F0F"),
                        React.createElement("button", { className: (this.state['fan']['oson'] == 'OFF' ? "active" : "") + " btn btn-outline-primary " + this.control_button_classname, value: "oscillation_off" }, "\u5173\u95ED\u6447\u5934\u6A21\u5F0F"))),
                React.createElement("div", { className: "card-footer text-center" },
                    "\u6E29\u5EA6:",
                    temp,
                    " \u6E7F\u5EA6:",
                    hr))));
    };
    return DysonRemote;
}(DeviceCardBase_1["default"]));
exports["default"] = DysonRemote;
//# sourceMappingURL=DysonRemote.js.map