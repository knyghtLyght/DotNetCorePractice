// Angular HTTP request service
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Allows this class to be recognized as a DI object
import { Injectable } from '@angular/core';
// Similar to array.map used with Observable
import { map, retry } from 'rxjs/operators';
// Allows for the intercept and manipulation of http requests
import { Observable } from 'rxjs';
// Product model interface
import { Product } from './product';
// Order and orderItem interface
import { Order, OrderItem } from './order';

@Injectable()
export class DataService {

    // Inject and initialize a field for our Http request service
    constructor(private http: HttpClient) { }

    // Login support
    private token: string = "";
    private tokenExpiration: Date;

    public order: Order = new Order();

    public products: Product[] = [];

    // Call the api and get our products
    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            // Intercept the return so we can subscribe from the client call
            .pipe(
            // Map the return data to the products array
            map((data: any[]) => {
                this.products = data;
                return true;
            }));
    }

    // Dose the user have a currently valid login
    public get loginrequired(): boolean {
        return this.token.length == 0 || this.tokenExpiration > new Date();
    }

    // Login through angular app
    login(creds): Observable<boolean> {
        return this.http
            .post("/account/createtoken", creds)
            .pipe(
            map((data: any) => {
                this.token = data.token;
                this.tokenExpiration;
                return true;
            }));
    }

    // Post finished order
    public checkout() {
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
        }
        return this.http.post("/api/orders", this.order,
            { headers: new HttpHeaders().set("Authorization", "Bearer " + this.token) })
            .pipe(
            map(response => {
                this.order = new Order();
                return true;
            }));
    }

    public AddToOrder(product: Product) {

        let item: OrderItem = this.order.items.find(i => i.productId == product.id);

        if (item) {

            item.quantity++;

        } else {
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
    }
}