import AsgardSystemEvent from "../event/AsgardSystemEvent";
/**
 * Created by Lizeqiangd on 2017/3/22.
 * 简易的仿as3的事件处理
 */

interface listener{
    hander:Function
    run_once:boolean
    bind:any
}

export default class EventDispatcher {
    private listeners: any

    constructor() {
        this.listeners = {};
    }

    addEventListener(type: string, handler: Function) {

        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        for (let i in this.listeners[type]) {
            if (this.listeners[type][i] == handler) {
                console.log(`EventDispatch:type:${type} already has this handler`, handler)
                return
            }
        }
        this.listeners[type].push(handler);
        return handler
    }

    removeEventListener(type, handler) {
        if (this.listeners[type])
            for (let i in this.listeners[type])
                if (this.listeners[type][i] == handler) {
                    this.listeners[type].splice(i, 1);
                    if(this.listeners[type].length==0){
                        delete this.listeners[type];
                    }
                }
    }

    dispatchEvent(e: AsgardSystemEvent) {
        if (this.listeners[e.type])
            for (let i in this.listeners[e.type]) {
                this.listeners[e.type][i](e);
            }
    }
}