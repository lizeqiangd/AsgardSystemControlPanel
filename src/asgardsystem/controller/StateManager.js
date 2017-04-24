"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
var AsgardSystemEvent_1 = require("../event/AsgardSystemEvent");
var HostManager_1 = require("../model/HostManager");
var StateManager = (function () {
    function StateManager() {
        // this.event_dispatcher.addEventListener(AsgardSystemEvent.stage_change, this.onStateChange);
    }
    StateManager.updateState = function () {
        HostManager_1.default.event_dispatcher.dispatchEvent(new AsgardSystemEvent_1.default(AsgardSystemEvent_1.default.stage_change, this.state));
    };
    StateManager.getDeviceState = function (device_name) {
        if (this.state[device_name]) {
            return this.state[device_name];
        }
        console.log("StateManager.getDeviceState:can not find device state:" + device_name);
        return {};
    };
    StateManager.setDeviceState = function (device_name, device_state) {
        if (!this.state[device_name])
            this.state[device_name] = {};
        var needUpdate = false;
        for (var key in device_state) {
            if (device_state[key] != this.state[device_name][key]) {
                this.state[device_name][key] = device_state[key];
                needUpdate = true;
            }
        }
        // console.log(device_name,device_state,needUpdate)
        if (needUpdate)
            HostManager_1.default.event_dispatcher.dispatchEvent(new AsgardSystemEvent_1.default(AsgardSystemEvent_1.default.state_update, device_name));
    };
    return StateManager;
}());
StateManager.state = {};
exports.default = StateManager;
