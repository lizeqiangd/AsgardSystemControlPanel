/**
 * Created by Lizeqiangd on 2017/3/18.
 */
export  default class AsgardSystemEvent {
    static readonly stage_change: string = "stage_change";
    static readonly state_update: string = "state_update";
    static readonly add_new_card: string = 'add_new_card';
    static readonly render_card: string = 'render_card';
    static readonly node_load_complete: string = 'node_load_complete';

    data: any
    type: string

    constructor(type: string, dispatchData: any = null) {
        this.type = type;
        this.data = dispatchData;
    }


}