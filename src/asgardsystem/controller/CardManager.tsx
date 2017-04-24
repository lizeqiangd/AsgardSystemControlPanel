/// <reference path="./../../../node_modules/@types/react/index.d.ts" />
import * as React from 'react';
import * as ReactDOM from "react-dom";
import HostManager from "../model/HostManager";
import AsgardSystemEvent from "../event/AsgardSystemEvent";
import ProjectionScreenRemote from "../view/device_card/ProjectionScreenRemote";
import UnknownDevice from "../view/device_card/UnknownDevice";
import DysonRemote from "../view/device_card/DysonRemote";
declare var $: any;

export default class CardManager {

    private static readonly ReactClass: any = {
        UnknownDevice: UnknownDevice,
        ProjectionScreenRemote: ProjectionScreenRemote,
        DysonRemote: DysonRemote

    }

    static createCard(device: any|any[]) {
        this.createCardView(device);
        this.renderCard();

    }

    private static createCardView(device: any) {
        // console.log(device.module, this.ReactClass[device.module], this.ReactClass, this.ReactClass['ProjectionScreenRemote'])

        let module_name: string = device.module;
        let device_card: any;

        if (this.ReactClass[module_name]) {
            device_card = React.createElement(this.ReactClass[module_name], device);
        } else {
            device_card = React.createElement(this.ReactClass.UnknownDevice, device);
        }
        HostManager.card_list.push(device_card)
        HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.add_new_card));
    }


    static renderCard(device_name: string = "") {
        let renderCards: React.ReactElement<{}>[];
        renderCards = HostManager.card_list;
        ReactDOM.render(
            <div className="row">{renderCards}</div>,
            $(HostManager.card_container_jquery_selector_name)[0]
        )
        HostManager.event_dispatcher.dispatchEvent(new AsgardSystemEvent(AsgardSystemEvent.render_card));
    }

}