import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../models/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productID!: string | null;
  productDetails : IProduct = {} as IProduct;

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly productsService: ProductsService = inject(ProductsService);

  getProductID(){
    this.productID = this.activatedRoute.snapshot.params['id'];
  }

  getProductDetails(productID: string | null): void {
    this.productsService.getProductDetails(productID).subscribe({
      next: (response: any) => {
        this.productDetails = response.data;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Product details complete");
      }
    })
  }

  ngOnInit(){
    this.getProductID();
    this.getProductDetails(this.productID);
  }
}
