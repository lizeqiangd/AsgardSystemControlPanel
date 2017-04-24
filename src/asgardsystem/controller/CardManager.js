"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./../../../node_modules/@types/react/index.d.ts" />
var React = require("react");
var ReactDOM = require("react-dom");
var HostManager_1 = require("../model/HostManager");
var AsgardSystemEvent_1 = require("../event/AsgardSystemEvent");
var ProjectionScreenRemote_1 = require("../view/device_card/ProjectionScreenRemote");
var UnknownDevice_1 = require("../view/device_card/UnknownDevice");
var DysonRemote_1 = require("../view/device_card/DysonRemote");
var CardManager = (function () {
    function CardManager() {
    }
    CardManager.createCard = function (device) {
        this.createCardView(device);
        this.renderCard();
    };
    CardManager.createCardView = function (device) {
        // console.log(device.module, this.ReactClass[device.module], this.ReactClass, this.ReactClass['ProjectionScreenRemote'])
        var module_name = device.module;
        var device_card;
        if (this.ReactClass[module_name]) {
            device_card = React.createElement(this.ReactClass[module_name], device);
        }
        else {
            device_card = React.createElement(this.ReactClass.UnknownDevice, device);
        }
        HostManager_1.default.card_list.push(device_card);
        HostManager_1.default.event_dispatcher.dispatchEvent(new AsgardSystemEvent_1.default(AsgardSystemEvent_1.default.add_new_card));
    };
    CardManager.renderCard = function (device_name) {
        if (device_name === void 0) { device_name = ""; }
        var renderCards;
        renderCards = HostManager_1.default.card_list;
        ReactDOM.render(React.createElement("div", { className: "row" }, renderCards), $(HostManager_1.default.card_container_jquery_selector_name)[0]);
        HostManager_1.default.event_dispatcher.dispatchEvent(new AsgardSystemEvent_1.default(AsgardSystemEvent_1.default.render_card));
    };
    return CardManager;
}());
CardManager.ReactClass = {
    UnknownDevice: UnknownDevice_1.default,
    ProjectionScreenRemote: ProjectionScreenRemote_1.default,
    DysonRemote: DysonRemote_1.default
};
exports.default = CardManager;
