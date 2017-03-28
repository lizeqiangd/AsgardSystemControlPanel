/**
 * Created by Lizeqiangd on 2017/3/7.
 */
/**
 * 信息卡片的基础
 */
class C_base_device_card extends React.Component {
    constructor(props) {
        super(props);
        this.device_index = this.props.device_index;
        this.module_name = model_cards_data[this.device_index].module_name;

        console.log(this.device_index,model_cards_data)
        // console.log(this.module_name, AsgardSystemDeviceList,AsgardSystemDeviceList[this.module_name] )
    }

    render() {
        return (
            <div className="device-control-card col-xl-2 col-lg-4 col-md-6 col-sm-12">
            <div className="card">
            <div className="card-header">
            {this.module_name}
    </div>
        {
            AsgardSystemDeviceList[this.module_name] ?
                React.createElement(AsgardSystemDeviceList[this.module_name], {"device_index": this.device_index}) : "模块错误或者制作中:" + this.module_name
        }
        </div>
        </div>);
    }
}

/**
 * projection_screen_remote 执行模块
 */
class C_projection_screen_remote extends React.Component {
    constructor(props) {
        super(props);
        this.device_index = this.props.device_index;
        this.module_name = model_cards_data[this.device_index].device_module;
        this.device_name = model_cards_data[this.device_index].name;
        this.device_type = model_cards_data[this.device_index].type;
        this.device_state = model_cards_data[this.device_index].state;
        this.remote_address = model_cards_data[this.device_index].remote_address;
        this.state = {
            button_disabled: false,
            projection_screen_state: 0,
        }

    }

    submit_command(command) {
        this.setState({
            button_disabled: true
        })
        setTimeout(()=> {
            this.setState({
            button_disabled: false
        })
    }, 1500);
        var remote_data =
        {
            "type": this.device_type,
            "target_device_name": this.device_name,
            "command": command,
        }
        remote_device(this.remote_address, remote_data);
    }

    render() {
        return (
            <div className="card-block projection_screen_remote row">
            {/*<span className="col-12">当前投影幕状态:<span>在上面</span></span>*/}
            <button onClick={()=> {
            this.submit_command('up')
        }}
        className={"btn btn-outline-primary mt-2 col-3 ml-4 "}
        onclick="this.on_click_button()" disabled={this.state.button_disabled}>上升
        </button>
        <button onClick={()=> {
            this.submit_command('stop')
        }}
        className={"btn btn-outline-primary mt-2 col-3 ml-3 "}
        onclick="this.on_click_button()" disabled={this.state.button_disabled}>停止
        </button>
        <button onClick={()=> {
            this.submit_command('down')
        }}
        className={"btn btn-outline-primary mt-2 col-3 ml-3 "}
        onclick="this.on_click_button()" disabled={this.state.button_disabled}>下降
        </button>
        </div>
    )
    }
}


class C_asgard_system_cards_container extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            cards: []
        }

        global_callback.add_new_card = (card_data)=> {
            this.setState({cards: this.state.cards.concat(card_data)});
        };

        global_callback.refrush_card = (card_datas)=> {
            this.setState({cards: card_datas});
        }
    }

    render() {
        if (this.state.cards.length > 0) {
            return (
                <div className="row">
                {
                    this.state.cards.map((data)=> {
                    {/*console.log('length', this.state.cards.length)*/}
            return <C_base_device_card key={global_callback.getUniqueKey()} device_index={data.device_index}/>
        })
        }
        </div>)
        } else {
            return <div className="no_data_panel"><h1>no device.</h1></div>;
        }
    }
}


function remote_device(address, data) {
    var remote_json =
    {
        "password": "4076f096bf4c8b869ac8bb4e2ce64264",
        "remote": [data
//      {
//        "type": 475,
//        "target_device_name": "NK6-CN-HDA4753A",
//        "command": {
//          "fan_mode": "AUTO",
//          "fan_speed": 3,
//          "night_mode": "ON",
//          "swing": "ON"
//        }
//      }
        ]
    }
    $.post(address, remote_json, (data)=> {
        // console.log(data)
});
}


const AsgardSystemDeviceList = {
    "ProjectionScreenRemote": C_projection_screen_remote
};

const model_cards_data = [];
const global_callback = {
        now_key: 1000,
        getUniqueKey: ()=> {
        global_callback.now_key++;
return global_callback.now_key;
}
};
window.model_cards_data = model_cards_data;
window.global_callback = global_callback;


ReactDOM.render(
    React.createElement(C_asgard_system_cards_container, {}, null)
    , $("#card-container")[0]
);


var target_nodes = ["http://192.168.1.22:20010/asgard_system/list_device"];
$.get(target_nodes[0], (data)=> {
    var device_index = 0;
for (var d in data.device) {
    data.device[d].device_index = device_index;
    data.device[d].module_name = d;
    data.device[d].remote_address = data.remote_address;
    device_index++;
    model_cards_data.push(data.device[d]);
    console.log(data.device[d],d)

}
global_callback.add_new_card(model_cards_data);
})


