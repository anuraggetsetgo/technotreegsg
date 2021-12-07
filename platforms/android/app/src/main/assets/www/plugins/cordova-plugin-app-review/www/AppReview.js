cordova.define("cordova-plugin-app-review.AppReview", function(require, exports, module) {
var exec = require("cordova/exec");
var PLUGIN_NAME = "AppReview";

module.exports = {
    requestReview: function() {
        return new Promise(function(resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "requestReview", []);
        });
    },
    openStoreScreen: function(packageName) {
        return new Promise(function(resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "openStoreScreen", [packageName || null]);
        });
    }
};

});
