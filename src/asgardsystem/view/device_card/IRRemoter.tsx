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
export default class IRRemoter extends DeviceCardBase {
    constructor(props) {
        super(props);
        this.state['button_disabled'] = false;
    }

    submit_command(command: string) {
        // console.log(this)
        //noinspection TypeScriptUnresolvedFunction
        this.setState({
            button_disabled: true
        })
        setTimeout(()=> {
            //noinspection TypeScriptUnresolvedFunction
            this.setState({
                button_disabled: false
            })
        }, 1500);

        switch (command) {
            case 'up':
                StateManager.setDeviceState(this.device_name, {"projection_screen_state": 1});
                break;
            case 'stop':
                StateManager.setDeviceState(this.device_name, {"projection_screen_state": 2});
                break;
            case 'down':
                StateManager.setDeviceState(this.device_name, {"projection_screen_state": 3});
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
                projection_screen_state = '上升';
                break;
            case 2:
                projection_screen_state = '停止';
                break;
            case 3:
                projection_screen_state = '下降';
                break;
        }
        return (
            <DeviceCardHeader card_class_prefix={this.card_class_prefix} device_module={this.device_module}>
                <div className="card-block">
                    <div className="btn-group ">
                        <button
                            className={(this.state['projection_screen_state']==1?"active":"") +" btn btn-outline-primary "+this.control_button_classname}
                            value="up"
                            disabled={this.state['button_disabled']}>上升
                        </button>
                        <button
                            className={(this.state['projection_screen_state']==2?"active":"") +" btn btn-outline-danger "+this.control_button_classname}
                            value="stop"
                            disabled={this.state['button_disabled']}>停止
                        </button>
                        <button
                            className={(this.state['projection_screen_state']==3?"active":"")  +" btn btn-outline-primary "+this.control_button_classname}
                            value="down"
                            disabled={this.state['button_disabled']}>下降
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
