// Complex calculation and operation library
import * as _ from "lodash";
var Order = /** @class */ (function () {
    function Order() {
        this.orderDate = new Date();
        this.items = new Array();
    }
    Object.defineProperty(Order.prototype, "subtotal", {
        get: function () {
            // Sum a map of the properties of items given
            return _.sum(_.map(this.items, function (i) { return i.unitPrice * i.quantity; }));
        },
        enumerable: true,
        configurable: true
    });
    return Order;
}());
export { Order };
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    return OrderItem;
}());
export { OrderItem };
//# sourceMappingURL=order.js.map