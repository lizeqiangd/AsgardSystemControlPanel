/**
 * Created by Lizeqiangd on 2017/4/24.
 */

/// <reference path="./../../../../node_modules/@types/react/index.d.ts" />
import * as React from 'react';
import DeviceCardBase from "./DeviceCardBase";
import CommunicationManager from "../../controller/CommunicationManager";
import StateManager from "../../controller/StateManager";
import AsgardSystemEvent from "../../event/AsgardSystemEvent";
import HostManager from "../../model/HostManager";
import {DeviceCardHeader} from "./DeviceCardBase";
declare module JSX {
    interface IntrinsicElements {
        "DeviceCardHeader": DeviceCardHeader
    }
}
export default class BedroomLocker extends DeviceCardBase {
    constructor(props) {
        super(props);
        this.state['button_disabled'] = false;
    }

    submit_command(command: string) {
        //noinspection TypeScriptUnresolvedFunction
        this.setState({
            button_disabled: true
        })
        setTimeout(()=> {
            //noinspection TypeScriptUnresolvedFunction
            this.setState({
                button_disabled: false
            })
        }, 5000);

        switch (command) {
            case 'lock':
                StateManager.setDeviceState(this.device_name, {"projection_screen_state": 1});
                break;
            case 'unloock':
                StateManager.setDeviceState(this.device_name, {"projection_screen_state": 2});
                break;
        }
        let remote_data: any =
            [{
                "type": this.device_type,
                "target_device_name": this.device_name,
                "command": command,
            }]
        CommunicationManager.postCommand(this.remote_address, remote_data)
    }

    render() {
        let projection_screen_state: string = '未知';
        switch (this.state['projection_screen_state']) {
            case 1:
                projection_screen_state = '锁定';
                break;
            case 2:
                projection_screen_state = '解锁';
                break;
        }
        return (
            <DeviceCardHeader card_class_prefix={this.card_class_prefix} device_module={this.device_module}>
                <div className="card-block">
                    <div className="btn-group ">
                        <button
                            className={(this.state['projection_screen_state']==1?"active":"") +" btn btn-outline-primary "+this.control_button_classname}
                            value="lock"
                            disabled={this.state['button_disabled']}>锁定
                        </button>
                        <button
                            className={(this.state['projection_screen_state']==2?"active":"") +" btn btn-outline-primary "+this.control_button_classname}
                            value="unlock"
                            disabled={this.state['button_disabled']}>解锁
                        </button>
                    </div>

                </div>
                <div className="card-footer">
                    <span className="col-12">当前状态: {projection_screen_state}</span>
                </div>
            </DeviceCardHeader>
        );
    }
}
