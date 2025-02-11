import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {testingEnvironment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseUrl + 'products');
  }

  getProductDetails(idProduct: string | null): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseUrl + `products/${idProduct}`);
  }

  getCategories(): Observable <any> {
    return this.httpClient.get(testingEnvironment.baseUrl + 'categories');
  }
}
