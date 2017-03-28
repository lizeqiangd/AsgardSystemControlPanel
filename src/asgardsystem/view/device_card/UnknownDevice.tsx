/**
 * Created by Lizeqiangd on 2017/3/25.
 */
import * as React from 'react';
import DeviceCardBase from "./DeviceCardBase";

export default class UnknownDevice extends DeviceCardBase {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.card_class_prefix}>
                <div className="card">
                    <div className="card-header">
                        {this.device_module}
                    </div>
                    {
                        "模块错误或者制作中:" + this.device_module
                    }
                </div>
            </div>);
    }
}