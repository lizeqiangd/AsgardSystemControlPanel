/**
 * Created by Lizeqiangd on 2017/3/18.
 */
import HostManager from "./model/HostManager";
import CommunicationManager from "./controller/CommunicationManager";
import AsgardSystemEvent from "./event/AsgardSystemEvent";
import CardManager from "./controller/CardManager";
import StateManager from "./controller/StateManager";
//需要从网页中获取配置信息.
HostManager.node_address_list = getDocumentConfigValue('node_address_list')
HostManager.remote_password = getDocumentConfigValue('remote_password')

function getDocumentConfigValue(key: string, default_value: string = ''): any {
    if (document[key])
        return document[key];
    else
        console.log(`AsgardSystem:can not load value [${key}]`);
    return default_value;
}


CommunicationManager.getDeviceFromNode()
HostManager.event_dispatcher.addEventListener(AsgardSystemEvent.node_load_complete, onLoadNodeComplete)

function onLoadNodeComplete(e: AsgardSystemEvent) {
    HostManager.event_dispatcher.removeEventListener(AsgardSystemEvent.node_load_complete, onLoadNodeComplete);
    HostManager.process_node_device(e.data);
    //initDevices,create base cards.
    // console.log(HostManager.device_list)
    for (let i: number = 0; i < HostManager.device_list.length; i++) {
        CardManager.createCard(HostManager.device_list[i]);
    }
    StateManager.startAutoUpdate(5);

}

/**
 * 搜索栏响应代码,用于搜索目标模块.
 */
$('#search_bar').on('input', ()=> {
    let search_text: string = $('#search_bar').val();
    let selector: string;
    if (search_text) {
        selector = ".device-control-card:not([id*='" + search_text + "'])";
        $(selector).fadeOut(300);
    } else {
        selector = ".device-control-card";
        $(selector).fadeIn(300);
    }
})