"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
var HostManager_1 = require("./model/HostManager");
var CommunicationManager_1 = require("./controller/CommunicationManager");
var AsgardSystemEvent_1 = require("./event/AsgardSystemEvent");
var CardManager_1 = require("./controller/CardManager");
//需要从网页中获取配置信息.
HostManager_1.default.node_address_list = getDocumentConfigValue('node_address_list');
HostManager_1.default.remote_password = getDocumentConfigValue('remote_password');
function getDocumentConfigValue(key, default_value) {
    if (default_value === void 0) { default_value = ''; }
    if (document[key])
        return document[key];
    else
        console.log("AsgardSystem:can not load value [" + key + "]");
    return default_value;
}
CommunicationManager_1.default.getDeviceFromNode();
HostManager_1.default.event_dispatcher.addEventListener(AsgardSystemEvent_1.default.node_load_complete, onLoadNodeComplete);
function onLoadNodeComplete(e) {
    HostManager_1.default.event_dispatcher.removeEventListener(AsgardSystemEvent_1.default.node_load_complete, onLoadNodeComplete);
    HostManager_1.default.process_node_device(e.data);
    //initDevices,create base cards.
    // console.log(HostManager.device_list)
    for (var i = 0; i < HostManager_1.default.device_list.length; i++) {
        CardManager_1.default.createCard(HostManager_1.default.device_list[i]);
    }
}
$('#search_bar').on('input', function (event) {
    var search_text = $('#search_bar').val();
    CardManager_1.default.renderCard(search_text);
});
