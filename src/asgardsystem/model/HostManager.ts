import DeviceUtils from "../utils/DeviceUtils";
import EventDispatcher from "../utils/EventDispatcher";
import * as React from "react";

/**
 * Created by Lizeqiangd on 2017/3/22.
 */

export default class HostManager {
    //全部的节点地址信息
    static node_address_list: string[] = [];

    //全部的节点信息
    static node_list: any[] = [];

    //全部节点所链接的设备信息
    static readonly device_list: any[] = [];

    //所需要渲染的卡片信息
    static readonly card_list: React.ReactElement<{}>[] = [];

    //所有设备所产生的状态管理器
    static readonly state_list: any[] = [];


    static readonly event_dispatcher: EventDispatcher = new EventDispatcher();
    static readonly card_container_jquery_selector_name: string = '#card-container';
    static remote_password: string = '';

    static process_node_device(node_list) {
        for (let i: number = 0; i < node_list.length; i++) {
            let remote_address = node_list[i].remote_address;
            for (let d in  node_list[i].device) {
                node_list[i].device[d].module = d;
                node_list[i].device[d].key = node_list[i].device[d].udi = DeviceUtils.get_unique_device_index();
                node_list[i].device[d].remote_address = remote_address;
                this.state_list[node_list[i].device[d].name] = [];
                this.state_list[node_list[i].device[d].name] = node_list[i].device[d].state;
                delete node_list[i].device[d].state;
                this.device_list.push(node_list[i].device[d]);
            }
        }
    }
}
