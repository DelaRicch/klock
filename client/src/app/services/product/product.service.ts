import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { AddProductProps } from '@type/types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient)
  url = environment.KLOCK_GRAPHQL_URI + "/add-product"

  addProduct(product: FormData) {
  return this.http.post(this.url, product)
  }
}
