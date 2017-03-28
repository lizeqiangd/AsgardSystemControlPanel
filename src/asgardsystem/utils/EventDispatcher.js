"use strict";
exports.__esModule = true;
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = {};
    }
    EventDispatcher.prototype.addEventListener = function (type, handler) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        for (var i in this.listeners[type]) {
            if (this.listeners[type][i] == handler) {
                console.log("EventDispatch:type:" + type + " already has this handler", handler);
                return;
            }
        }
        this.listeners[type].push(handler);
        return handler;
    };
    EventDispatcher.prototype.removeEventListener = function (type, handler) {
        if (this.listeners[type])
            for (var i in this.listeners[type])
                if (this.listeners[type][i] == handler) {
                    this.listeners[type].splice(i, 1);
                    if (this.listeners[type].length == 0) {
                        delete this.listeners[type];
                    }
                }
    };
    EventDispatcher.prototype.dispatchEvent = function (e) {
        if (this.listeners[e.type])
            for (var i in this.listeners[e.type]) {
                this.listeners[e.type][i](e);
            }
    };
    return EventDispatcher;
}());
exports["default"] = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map