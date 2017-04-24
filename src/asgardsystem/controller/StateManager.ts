/**
 * Created by Lizeqiangd on 2017/3/18.
 */
import AsgardSystemEvent from "../event/AsgardSystemEvent";
import HostManager from "../model/HostManager";
import CommunicationManager from "./CommunicationManager";
export default class StateManager {

    static update_timer: number = 0;

    constructor() {
        // this.event_dispatcher.addEventListener(AsgardSystemEvent.stage_change, this.onStateChange);

    }

    static startAutoUpdate(delayInSecond: number = 60) {
        CommunicationManager.updateDeviceStates();
        this.update_timer = setInterval(()=> {
            CommunicationManager.updateDeviceStates();
        }, delayInSecond * 1000);
    }

    static stopAutoUpdate() {
        clearInterval(this.update_timer);
    }

    static updateState() {
        HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.stage_change, HostManager.state_list));
    }

    static getDeviceState(device_name: string) {
        if (HostManager.state_list[device_name]) {
            return HostManager.state_list[device_name];
        }
        console.log(`StateManager.getDeviceState:can not find device state:${device_name}`);
        return {};
    }

    static setDeviceState(device_name: string, device_state: any) {
        if (!HostManager.state_list[device_name]) {
            console.log('error,not find device_name:' + device_name)
        }
        console.log(device_name, HostManager.state_list[device_name], device_state);
        $.extend(true, HostManager.state_list[device_name], device_state);
        HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.state_update, device_name))
    }


}
