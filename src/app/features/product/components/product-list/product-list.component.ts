import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../models/product';
import {ProductCardComponent} from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    // ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
allProducts: IProduct [] = [];

  private readonly productsService = inject( ProductsService );

  /**
   * That Function to Fetch The API Data From Products Services
   */
  getAllProducts(): void{
    this.productsService.getAllProducts().subscribe({
      next: (response: any)=>{
        this.allProducts = response.data;
      },
      error: (error: any)=>{
        console.log(error);
      },
      complete: ()=>{
        console.log("Get All Products is Completed");
      }
    })
  }

  ngOnInit() {
    this.getAllProducts();
  }
}
