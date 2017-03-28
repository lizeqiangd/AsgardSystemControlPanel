"use strict";
exports.__esModule = true;
var DeviceUtils_1 = require("../utils/DeviceUtils");
var EventDispatcher_1 = require("../utils/EventDispatcher");
/**
 * Created by Lizeqiangd on 2017/3/22.
 */
var HostManager = (function () {
    function HostManager() {
    }
    HostManager.process_node_device = function (node_list) {
        for (var i = 0; i < node_list.length; i++) {
            var remote_address = node_list[i].remote_address;
            for (var d in node_list[i].device) {
                node_list[i].device[d].module = d;
                node_list[i].device[d].key = node_list[i].device[d].udi = DeviceUtils_1["default"].get_unique_device_index();
                node_list[i].device[d].remote_address = remote_address;
                this.state_list[node_list[i].device[d].name] = [];
                this.state_list[node_list[i].device[d].name] = node_list[i].device[d].state;
                delete node_list[i].device[d].state;
                this.device_list.push(node_list[i].device[d]);
            }
        }
    };
    return HostManager;
}());
//全部的节点地址信息
HostManager.node_address_list = [];
//全部的节点信息
HostManager.node_list = [];
//全部节点所链接的设备信息
HostManager.device_list = [];
//所需要渲染的卡片信息
HostManager.card_list = [];
//所有设备所产生的状态管理器
HostManager.state_list = [];
HostManager.event_dispatcher = new EventDispatcher_1["default"]();
HostManager.card_container_jquery_selector_name = '#card-container';
HostManager.remote_password = '';
exports["default"] = HostManager;
//# sourceMappingURL=HostManager.js.map