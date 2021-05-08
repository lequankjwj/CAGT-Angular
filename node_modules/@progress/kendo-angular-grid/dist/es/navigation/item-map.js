/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var ItemMap = /** @class */ (function () {
    function ItemMap() {
        this.count = 0;
        this.items = {};
    }
    Object.defineProperty(ItemMap.prototype, "first", {
        get: function () {
            if (this.count > 0) {
                var result_1;
                this.forEach(function (item) {
                    result_1 = item;
                    return true;
                });
                return result_1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemMap.prototype, "last", {
        get: function () {
            if (this.count > 0) {
                var keys = Object.keys(this.items);
                return this.items[keys[keys.length - 1]];
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemMap.prototype.removeItem = function (key) {
        if (this.items[key]) {
            delete this.items[key];
            this.count--;
        }
    };
    ItemMap.prototype.setItem = function (key, item) {
        if (!this.items[key]) {
            this.count++;
        }
        this.items[key] = item;
    };
    ItemMap.prototype.getItem = function (key) {
        return this.items[key];
    };
    ItemMap.prototype.toArray = function () {
        var result = [];
        this.forEach(function (item) {
            result.push(item);
        });
        return result;
    };
    ItemMap.prototype.forEach = function (callback) {
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key) && callback(this.items[key])) {
                return this.items[key];
            }
        }
    };
    ItemMap.prototype.find = function (callback) {
        return this.forEach(callback);
    };
    return ItemMap;
}());
export { ItemMap };
