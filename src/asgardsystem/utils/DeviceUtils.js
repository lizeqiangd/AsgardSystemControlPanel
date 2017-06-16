"use strict";
exports.__esModule = true;
/**
 * Created by Lizeqiangd on 2017/3/22.
 */
var DeviceUtils = (function () {
    function DeviceUtils() {
    }
    return DeviceUtils;
}());
DeviceUtils.get_unique_device_index = (function () {
    var device_index = 0;
    return function () {
        return ++device_index;
    };
})();
exports["default"] = DeviceUtils;
//# sourceMappingURL=DeviceUtils.js.map