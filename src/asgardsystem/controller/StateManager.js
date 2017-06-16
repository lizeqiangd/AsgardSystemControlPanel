"use strict";
exports.__esModule = true;
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
var AsgardSystemEvent_1 = require("../event/AsgardSystemEvent");
var HostManager_1 = require("../model/HostManager");
var CommunicationManager_1 = require("./CommunicationManager");
var StateManager = (function () {
    function StateManager() {
        // this.event_dispatcher.addEventListener(AsgardSystemEvent.stage_change, this.onStateChange);
    }
    StateManager.startAutoUpdate = function (delayInSecond) {
        if (delayInSecond === void 0) { delayInSecond = 60; }
        CommunicationManager_1["default"].updateDeviceStates();
        this.update_timer = setInterval(function () {
            CommunicationManager_1["default"].updateDeviceStates();
        }, delayInSecond * 1000);
    };
    StateManager.stopAutoUpdate = function () {
        clearInterval(this.update_timer);
    };
    StateManager.updateState = function () {
        HostManager_1["default"].event_dispatcher.dispatchEvent(new AsgardSystemEvent_1["default"](AsgardSystemEvent_1["default"].stage_change, HostManager_1["default"].state_list));
    };
    StateManager.getDeviceState = function (device_name) {
        if (HostManager_1["default"].state_list[device_name]) {
            return HostManager_1["default"].state_list[device_name];
        }
        console.log("StateManager.getDeviceState:can not find device state:" + device_name);
        return {};
    };
    StateManager.setDeviceState = function (device_name, device_state) {
        if (!HostManager_1["default"].state_list[device_name]) {
            console.log('error,not find device_name:' + device_name);
        }
        console.log(device_name, HostManager_1["default"].state_list[device_name], device_state);
        $.extend(true, HostManager_1["default"].state_list[device_name], device_state);
        HostManager_1["default"].event_dispatcher.dispatchEvent(new AsgardSystemEvent_1["default"](AsgardSystemEvent_1["default"].state_update, device_name));
    };
    return StateManager;
}());
StateManager.update_timer = 0;
exports["default"] = StateManager;
//# sourceMappingURL=StateManager.js.map