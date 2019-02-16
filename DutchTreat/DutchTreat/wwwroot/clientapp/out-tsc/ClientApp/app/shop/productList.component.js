import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataService } from '../shared/dataService';
var ProductList = /** @class */ (function () {
    function ProductList(data) {
        this.data = data;
        this.products = [];
        this.products = data.products;
    }
    ProductList = tslib_1.__decorate([
        Component({
            selector: "product-list",
            templateUrl: "productlist.component.html",
            styleUrls: []
        }),
        tslib_1.__metadata("design:paramtypes", [DataService])
    ], ProductList);
    return ProductList;
}());
export { ProductList };
//# sourceMappingURL=productList.component.js.map