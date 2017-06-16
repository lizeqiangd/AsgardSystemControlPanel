"use strict";
exports.__esModule = true;
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
var HostManager_1 = require("./model/HostManager");
var CommunicationManager_1 = require("./controller/CommunicationManager");
var AsgardSystemEvent_1 = require("./event/AsgardSystemEvent");
var CardManager_1 = require("./controller/CardManager");
var StateManager_1 = require("./controller/StateManager");
//需要从网页中获取配置信息.
HostManager_1["default"].node_address_list = getDocumentConfigValue('node_address_list');
HostManager_1["default"].remote_password = getDocumentConfigValue('remote_password');
function getDocumentConfigValue(key, default_value) {
    if (default_value === void 0) { default_value = ''; }
    if (document[key])
        return document[key];
    else
        console.log("AsgardSystem:can not load value [" + key + "]");
    return default_value;
}
CommunicationManager_1["default"].getDeviceFromNode();
HostManager_1["default"].event_dispatcher.addEventListener(AsgardSystemEvent_1["default"].node_load_complete, onLoadNodeComplete);
function onLoadNodeComplete(e) {
    HostManager_1["default"].event_dispatcher.removeEventListener(AsgardSystemEvent_1["default"].node_load_complete, onLoadNodeComplete);
    HostManager_1["default"].process_node_device(e.data);
    //initDevices,create base cards.
    // console.log(HostManager.device_list)
    for (var i = 0; i < HostManager_1["default"].device_list.length; i++) {
        CardManager_1["default"].createCard(HostManager_1["default"].device_list[i]);
    }
    StateManager_1["default"].startAutoUpdate(5);
}
/**
 * 搜索栏响应代码,用于搜索目标模块.
 */
$('#search_bar').on('input', function () {
    var search_text = $('#search_bar').val();
    var selector;
    if (search_text) {
        selector = ".device-control-card:not([id*='" + search_text + "'])";
        $(selector).fadeOut(300);
    }
    else {
        selector = ".device-control-card";
        $(selector).fadeIn(300);
    }
});
//# sourceMappingURL=asgardsystem.js.map