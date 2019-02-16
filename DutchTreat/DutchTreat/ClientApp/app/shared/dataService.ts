import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Order, OrderItem } from './order';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {

    }

    public order: Order = new Order();

    public products: Product[] = [];

    // Call the api and get our products
    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            // Intercept the return  so we can subscribe from the client call
            .pipe(
            // Map the return data to the products array
            map((data: any[]) => {
                this.products = data;
                return true;
            }));
    }

    public AddToOrder(product: Product) {

        let item: OrderItem = this.order.items.find(i => i.productId == product.id);

        if (item) {

            item.quantity++;

        } else {

            item = new OrderItem();
            item.productId = product.id;
            item.productArtist = product.artist;
            item.productCategory = product.category;
            item.productArtId = product.artId;
            item.productTitle = product.title;
            item.productSize = product.size;
            item.unitPrice = product.price;
            item.quantity = 1;

            this.order.items.push(item);
        }
    }
}