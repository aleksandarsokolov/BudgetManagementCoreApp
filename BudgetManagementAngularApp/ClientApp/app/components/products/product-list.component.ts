import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from '../data/product.service';
// import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  errorMessage: string = "";

  constructor(private route: ActivatedRoute,
            private router: Router,
            private productService: ProductService) { }


  onBack(): void {
    this.router.navigate(['/bills']);
  }

  ngOnInit() {

      if (this.route.snapshot.paramMap.get('id') != null) {

          var id = <number>+this.route.snapshot.paramMap.get('id');

          this.productService.getProductsByBillID(id).subscribe(
              products => {
                  this.products = products;
              },
              error => this.errorMessage = <any>error
          );
      }
  }

}
