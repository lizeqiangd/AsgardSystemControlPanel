/**
 * Created by Lizeqiangd on 2017/3/18.
 */
/// <reference path="./../../../../node_modules/@types/react/index.d.ts" />
import * as React from 'react';
import HostManager from "../../model/HostManager";
import AsgardSystemEvent from "../../event/AsgardSystemEvent";
import StateManager from "../../controller/StateManager";

declare var $: any;
export default class DeviceCardBase extends React.Component<{},{}> {

    public device_index: number = -1;
    public device_name: string = 'unknown_device_name';
    public device_type: number = 0;
    public device_module: string = 'card_base';
    public remote_address: string = '';

    protected card_class_prefix: string = 'device-control-card col-xl-2 col-lg-4 col-md-6 col-sm-12'

    protected control_button_classname: string = "";

    constructor(props) {
        super(props);
        this.device_index = this.props['udi'];
        this.device_module = this.props['module'];
        this.device_name = this.props['name'];
        this.device_type = this.props['type'];
        this.remote_address = this.props['remote_address'];

        this.control_button_classname = this.device_name + "_controller";
        HostManager.event_dispatcher.addEventListener(AsgardSystemEvent.state_update, this.onStateUpdate.bind(this));

        this.state = {};
        for (var i in HostManager.state_list[this.device_name]) {
            this.state[i] = HostManager.state_list[this.device_name][i];
        }
    }

    onStateUpdate(e: AsgardSystemEvent) {
        if (e.data == this.device_name) {
            //noinspection TypeScriptUnresolvedFunction
            this.setState(StateManager.getDeviceState(this.device_name))
            // console.log('onStateUpdate', StateManager.getDeviceState(this.device_name))
        }
    }

    componentDidMount() {
        let buttons: any = $("." + this.control_button_classname);
        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].onclick = ()=> {
                // $(buttons[i]).addClass('active').siblings().removeClass('active');
                this.submit_command(buttons[i].value);
            }
        }
    }

    submit_command(command: string) {

    }


}


interface DeviceCardHeaderProps {
    card_class_prefix: string,
    device_module: string,
}


export  class DeviceCardHeader extends React.Component<DeviceCardHeaderProps, {}> {
    constructor(props ) {
        super(props);
    }

    public render() {
        return (
            <div className={this.props.card_class_prefix} id={"device_card_"+this.props.device_module}>
                <div className="card">
                    <div className="card-header text-center">
                        {this.props.device_module}
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}