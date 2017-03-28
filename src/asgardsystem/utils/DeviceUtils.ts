/**
 * Created by Lizeqiangd on 2017/3/22.
 */
export default class DeviceUtils {

    static get_unique_device_index: Function = (()=> {
        var device_index = 0;
        return function () {
            return ++device_index;
        };
    })();

}


