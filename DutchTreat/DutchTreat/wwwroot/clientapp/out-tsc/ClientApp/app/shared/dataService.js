import * as tslib_1 from "tslib";
// Angular HTTP request service
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Allows this class to be recognized as a DI object
import { Injectable } from '@angular/core';
// Similar to array.map used with Observable
import { map } from 'rxjs/operators';
// Order and orderItem interface
import { Order, OrderItem } from './order';
var DataService = /** @class */ (function () {
    // Inject and initialize a field for our Http request service
    function DataService(http) {
        this.http = http;
        // Login support
        this.token = "";
        this.order = new Order();
        this.products = [];
    }
    // Call the api and get our products
    DataService.prototype.loadProducts = function () {
        var _this = this;
        return this.http.get("/api/products")
            // Intercept the return so we can subscribe from the client call
            .pipe(
        // Map the return data to the products array
        map(function (data) {
            _this.products = data;
            return true;
        }));
    };
    Object.defineProperty(DataService.prototype, "loginrequired", {
        // Dose the user have a currently valid login
        get: function () {
            return this.token.length == 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    // Login through angular app
    DataService.prototype.login = function (creds) {
        var _this = this;
        return this.http
            .post("/account/createtoken", creds)
            .pipe(map(function (data) {
            _this.token = data.token;
            _this.tokenExpiration;
            return true;
        }));
    };
    // Post finished order
    DataService.prototype.checkout = function () {
        var _this = this;
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }
        return this.http.post("/api/orders", this.order, { headers: new HttpHeaders().set("Authorization", "Bearer " + this.token) })
            .pipe(map(function (response) {
            _this.order = new Order();
            return true;
        }));
    };
    DataService.prototype.AddToOrder = function (product) {
        var item = this.order.items.find(function (i) { return i.productId == product.id; });
        if (item) {
            item.quantity++;
        }
        else {
            // Build our order item based on product added
            item = new OrderItem();
            item.productId = product.id;
            item.productArtist = product.artist;
            item.productCategory = product.category;
            item.productArtId = product.artId;
            item.productTitle = product.title;
            item.productSize = product.size;
            item.unitPrice = product.price;
            item.quantity = 1;
            // Add the item to the order
            this.order.items.push(item);
        }
    };
    DataService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=dataService.js.map