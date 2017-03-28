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
var HostManager_1 = require("../../model/HostManager");
var AsgardSystemEvent_1 = require("../../event/AsgardSystemEvent");
var StateManager_1 = require("../../controller/StateManager");
var DeviceCardBase = (function (_super) {
    __extends(DeviceCardBase, _super);
    function DeviceCardBase(props) {
        var _this = _super.call(this, props) || this;
        _this.device_index = -1;
        _this.device_name = 'unknown_device_name';
        _this.device_type = 0;
        _this.device_module = 'card_base';
        _this.remote_address = '';
        _this.card_class_prefix = 'device-control-card col-xl-2 col-lg-4 col-md-6 col-sm-12';
        _this.control_button_classname = "";
        _this.device_index = _this.props['udi'];
        _this.device_module = _this.props['module'];
        _this.device_name = _this.props['name'];
        _this.device_type = _this.props['type'];
        _this.remote_address = _this.props['remote_address'];
        _this.control_button_classname = _this.device_name + "_controller";
        HostManager_1["default"].event_dispatcher.addEventListener(AsgardSystemEvent_1["default"].state_update, _this.onStateUpdate.bind(_this));
        _this.state = {};
        for (var i in HostManager_1["default"].state_list[_this.device_name]) {
            _this.state[i] = HostManager_1["default"].state_list[_this.device_name][i];
        }
        return _this;
    }
    DeviceCardBase.prototype.onStateUpdate = function (e) {
        if (e.data == this.device_name) {
            this.setState(StateManager_1["default"].getDeviceState(this.device_name));
            // console.log('onStateUpdate', StateManager.getDeviceState(this.device_name))
        }
    };
    DeviceCardBase.prototype.componentDidMount = function () {
        var _this = this;
        var buttons = $("." + this.control_button_classname);
        var _loop_1 = function (i) {
            buttons[i].onclick = function () {
                // $(buttons[i]).addClass('active').siblings().removeClass('active');
                _this.submit_command(buttons[i].value);
            };
        };
        for (var i = 0; i < buttons.length; i++) {
            _loop_1(i);
        }
    };
    DeviceCardBase.prototype.submit_command = function (command) {
    };
    return DeviceCardBase;
}(React.Component));
exports["default"] = DeviceCardBase;
//# sourceMappingURL=DeviceCardBase.js.map