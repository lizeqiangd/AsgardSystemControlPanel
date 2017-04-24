"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
var AsgardSystemEvent = (function () {
    function AsgardSystemEvent(type, dispatchData) {
        if (dispatchData === void 0) { dispatchData = null; }
        this.type = type;
        this.data = dispatchData;
    }
    return AsgardSystemEvent;
}());
AsgardSystemEvent.stage_change = "stage_change";
AsgardSystemEvent.state_update = "state_update";
AsgardSystemEvent.add_new_card = 'add_new_card';
AsgardSystemEvent.render_card = 'render_card';
AsgardSystemEvent.node_load_complete = 'node_load_complete';
exports.default = AsgardSystemEvent;
