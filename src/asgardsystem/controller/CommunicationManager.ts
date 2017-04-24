import HostManager from "../model/HostManager";
import AsgardSystemEvent from "../event/AsgardSystemEvent";
import StateManager from "./StateManager";
/// <reference path="../../../bin/js/jquery.d.ts" />
declare var $: any;
/**
 * Created by Lizeqiangd on 2017/3/18.
 */
export default class CommunicationManager {

    constructor(node_list: string[]) {
    }


    /**
     * 访问全部节点返回全部设备. 参数为空的时候寻找HostManager的信息
     * @param node_address
     */
    static getDeviceFromNode(node_address: string[] = []) {
        if (node_address.length == 0) {
            node_address = HostManager.node_address_list;
        }
        let node_list: any[] = [];
        for (var i: number = 0; i < node_address.length; i++) {
            let url: string = `http://${node_address[i]}/asgard_system/list_device`;
            $.get(url, null, (data, status)=> {
                if (status == 'success') {
                    node_list.push(data);
                    if (node_list.length == node_address.length) {
                        HostManager.node_list = node_list;
                        HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.node_load_complete, node_list))
                    }
                } else {
                    console.log('CommunicationManager:load node failed', status)
                }

            })
        }
    }

    static updateDeviceStates() {
        let node_address = HostManager.node_address_list;
        for (var i: number = 0; i < node_address.length; i++) {
            let url: string = `http://${node_address[i]}/asgard_system/list_device`;
            $.get(url, null, (data, status)=> {
                if (status == 'success') {
                    for (let k in data.device) {
                        StateManager.setDeviceState(data.device[k]['name'], data.device[k]['state']);
                    }
                } else {
                    console.log('CommunicationManager:updateDeviceStates failed', status)
                }
            })
        }
    }


    static postCommand(remote_address: string, command_data: any) {
        var post_data: any = {
            password: HostManager.remote_password,
            remote: command_data
        }
        $.post(remote_address, post_data, (success_data)=> {
            console.log(success_data);
        })
    }


}