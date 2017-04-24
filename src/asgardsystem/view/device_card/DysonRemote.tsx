/**
 * Created by Lizeqiangd on 2017/3/18.
 */
/// <reference path="./../../../../node_modules/@types/react/index.d.ts" />
import * as ReactDOM from "react-dom";
import * as React from 'react';
import DeviceCardBase from "./DeviceCardBase";
import CommunicationManager from "../../controller/CommunicationManager";
import StateManager from "../../controller/StateManager";
import AsgardSystemEvent from "../../event/AsgardSystemEvent";
import HostManager from "../../model/HostManager";

declare var $: any;
export default class DysonRemote extends DeviceCardBase {

    constructor(props) {
        super(props);
    }

    submit_command(command: any) {

        let command_obj: any = {}
        for (var d in this.state['fan']) {
            command_obj[d] = this.state['fan'][d]
        }
        switch (command) {
            case "ON":
            case "OFF":
            case "AUTO":
                command_obj.fmod = command;
                break;
            case "night_on":
                command_obj.nmod = 'ON';
                break;
            case "night_off":
                command_obj.nmod = 'OFF';
                break;
            case "oscillation_on":
                command_obj.oson = 'ON';
                break;
            case "oscillation_off":
                command_obj.oson = 'OFF';
                break;
            default:
                command_obj.fmod = 'FAN'
                command_obj.fnsp = command;
        }
        this.setState({fan: command_obj})
        let remote_data: any =
            [{
                "type": this.device_type,
                "target_device_name": this.device_name,
                "command": command_obj
            }];

        CommunicationManager.postCommand(this.remote_address, remote_data);
    }

    componentDidMount() {
        super.componentDidMount()
        $(()=> {
            $("#dyson_remote_fanspeed_slider").slider({
                range: "min",
                value: this.state['fan']['fnsp'] && this.state['fan']['fnsp'] != 'AUTO' ? this.state['fan']['fnsp'] : 1,
                min: 1,
                max: 10, step: 1,
                slide: (event, ui)=> {
                    this.submit_command(ui.value);
                }
            });
        });
    }

    componentDidUpdate() {

    }


    render() {
        let temp: string = this.state['env']['temp'] ? this.state['env']['temp'] + '°C' : '未知';
        let hr: string = this.state['env']['hr'] ? this.state['env']['hr'] * 100 + '%' : '未知';
        return (
            <div className={this.card_class_prefix}>
                <div className="card">
                    <div className="card-header text-center">
                        {this.device_module}
                    </div>
                    <div className="card-block">

                        <div className="btn-group btn-group-justified col-12 mt-2">
                            <button
                                className={(this.state['fan']['fmod']=='FAN'?"active":"")+" btn btn-outline-success "+this.control_button_classname}
                                value="FAN">
                                开机
                            </button>
                            <button
                                className={(this.state['fan']['fmod']=='AUTO'?"active":"")+" btn btn-outline-primary "+this.control_button_classname}
                                value="AUTO">
                                自动模式
                            </button>
                            <button
                                className={(this.state['fan']['fmod']=='OFF'?"active":"")+" btn btn-outline-danger "+this.control_button_classname}
                                value="OFF">
                                关机
                            </button>
                        </div>

                        <div className="col-12">
                            <label htmlFor='dyson_remote_fanspeed_slider'>风速:{this.state['fan']['fnsp']}</label>
                            <div id="dyson_remote_fanspeed_slider"></div>
                        </div>

                        <div className="btn-group btn-group-justified col-12 mt-2">
                            <button
                                className={(this.state['fan']['nmod']=='ON'?"active":" ")+" btn btn-outline-primary "+this.control_button_classname}
                                value="night_on">
                                打开夜间模式
                            </button>
                            <button
                                className={(this.state['fan']['nmod']=='OFF'?"active":"")+" btn btn-outline-primary "+this.control_button_classname}
                                value="night_off">
                                关闭夜间模式
                            </button>
                        </div>
                        <div className="btn-group btn-group-justified col-12 mt-2">
                            <button
                                className={(this.state['fan']['oson']=='ON'?"active":"")+" btn btn-outline-primary "+this.control_button_classname}
                                value="oscillation_on">
                                打开摇头模式
                            </button>
                            <button
                                className={(this.state['fan']['oson']=='OFF'?"active":"")+" btn btn-outline-primary "+this.control_button_classname}
                                value="oscillation_off">
                                关闭摇头模式
                            </button>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        温度:{temp} 湿度:{hr}
                    </div>
                </div>
            </div>);
    }
}
