"use strict";
exports.__esModule = true;
var HostManager_1 = require("../model/HostManager");
var AsgardSystemEvent_1 = require("../event/AsgardSystemEvent");
var StateManager_1 = require("./StateManager");
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
var CommunicationManager = (function () {
    function CommunicationManager(node_list) {
    }
    /**
     * 访问全部节点返回全部设备. 参数为空的时候寻找HostManager的信息
     * @param node_address
     */
    CommunicationManager.getDeviceFromNode = function (node_address) {
        if (node_address === void 0) { node_address = []; }
        if (node_address.length == 0) {
            node_address = HostManager_1["default"].node_address_list;
        }
        var node_list = [];
        for (var i = 0; i < node_address.length; i++) {
            var url = "http://" + node_address[i] + "/asgard_system/list_device";
            $.get(url, null, function (data, status) {
                if (status == 'success') {
                    node_list.push(data);
                    if (node_list.length == node_address.length) {
                        HostManager_1["default"].node_list = node_list;
                        HostManager_1["default"].event_dispatcher.dispatchEvent(new AsgardSystemEvent_1["default"](AsgardSystemEvent_1["default"].node_load_complete, node_list));
                    }
                }
                else {
                    console.log('CommunicationManager:load node failed', status);
                }
            });
        }
    };
    CommunicationManager.updateDeviceStates = function () {
        var node_address = HostManager_1["default"].node_address_list;
        for (var i = 0; i < node_address.length; i++) {
            var url = "http://" + node_address[i] + "/asgard_system/list_device";
            $.get(url, null, function (data, status) {
                if (status == 'success') {
                    for (var k in data.device) {
                        StateManager_1["default"].setDeviceState(data.device[k]['name'], data.device[k]['state']);
                    }
                }
                else {
                    console.log('CommunicationManager:updateDeviceStates failed', status);
                }
            });
        }
    };
    CommunicationManager.postCommand = function (remote_address, command_data) {
        var post_data = {
            password: HostManager_1["default"].remote_password,
            remote: command_data
        };
        $.post(remote_address, post_data, function (success_data) {
            console.log(success_data);
        });
    };
    return CommunicationManager;
}());
exports["default"] = CommunicationManager;
//# sourceMappingURL=CommunicationManager.js.map