import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from '../../../product/services/products.service';
import {ICategory, IProduct} from '../../../product/models/product';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  imports: [
    CarouselModule
  ],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent implements OnInit {
  categories: ICategory [] = [];

  private readonly productsService: ProductsService = inject(ProductsService);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 900,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  getGetCategories(): void{
    this.productsService.getCategories().subscribe({
      next: (response: any)=> {
        this.categories = response.data;
        console.log(this.categories);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: ()=> {
        console.log("Categories complete");
      }
    })
  }

  ngOnInit() {
    this.getGetCategories();
  }
}
