/**
 * Created by Lizeqiangd on 2017/3/18.
 */
import AsgardSystemEvent from "../event/AsgardSystemEvent";
import HostManager from "../model/HostManager";
export default class StateManager {

    static readonly state: any = {};

    constructor() {
        // this.event_dispatcher.addEventListener(AsgardSystemEvent.stage_change, this.onStateChange);

    }


    static updateState() {
        HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.stage_change, this.state));
    }

    static getDeviceState(device_name: string) {
        if (this.state[device_name]) {
            return this.state[device_name];
        }
        console.log(`StateManager.getDeviceState:can not find device state:${device_name}`);
        return {};
    }

    static setDeviceState(device_name: string, device_state: any) {
        if (!this.state[device_name])this.state[device_name] = {};
        let needUpdate: boolean = false
        for (var key in device_state) {
            if (device_state[key] != this.state[device_name][key]) {
                this.state[device_name][key] = device_state[key];
                needUpdate = true;
            }
        }
        // console.log(device_name,device_state,needUpdate)
        if (needUpdate)
            HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.state_update, device_name))
    }


}
