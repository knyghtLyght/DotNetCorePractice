import { Component } from "@angular/core";
import { DataService } from '../shared/dataService';
import { Router } from '@angular/router';

@Component({
    selector: "the-cart",
    templateUrl: "cart.component.html",
    styleUrls: []
})
export class Cart {
    // Inject and initialize a field fir our data service
    constructor(private data: DataService, private router: Router) { }

    onCheckout() {
        if (this.data.loginrequired) {
            // Force login
            this.router.navigate(["login"]);
        } else {
            // Go to checkout
            this.router.navigate(["checkout"]);
        }
    }
}