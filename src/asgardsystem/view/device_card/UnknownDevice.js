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
/**
 * Created by Lizeqiangd on 2017/3/25.
 */
var React = require("react");
var DeviceCardBase_1 = require("./DeviceCardBase");
var UnknownDevice = (function (_super) {
    __extends(UnknownDevice, _super);
    function UnknownDevice(props) {
        return _super.call(this, props) || this;
    }
    UnknownDevice.prototype.render = function () {
        return (React.createElement("div", { className: this.card_class_prefix },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "card-header" }, this.device_module),
                "模块错误或者制作中:" + this.device_module)));
    };
    return UnknownDevice;
}(DeviceCardBase_1.default));
exports.default = UnknownDevice;
