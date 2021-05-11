import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClient } from '@app/app.component';
import { ProductModel } from '@app/feautures/common/models/product-model.model';
import { Product } from '@app/feautures/common/models/product.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  endpoint = environment.server;

  constructor(private httpClient: HttpClient) {
    this.httpClient = AppHttpClient;
  }

  public getProductAndModels(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'product/getProductAndModels').pipe(retry(1));
  }

  public getProducts(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'product').pipe(retry(1));
  }

  public getProductsLine(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'product-line').pipe(retry(1));
  }

  public saveProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.endpoint + 'product/save', product, { responseType: 'text' }).pipe(retry(1));
  }

  public saveProductLine(product: ProductModel): Observable<any> {
    return this.httpClient.post(this.endpoint + 'product-line/save', product, { responseType: 'text' }).pipe(retry(1));
  }

  public updateProductLine(product: ProductModel): Observable<any> {
    return this.httpClient.put(this.endpoint + 'product-line/update', product, { responseType: 'text' }).pipe(retry(1));
  }

  public updateProduct(product: Product): Observable<any> {
    return this.httpClient.put(this.endpoint + 'product/update', product, { responseType: 'text' }).pipe(retry(1));
  }

  public getProductsLineHistoric(productLine: ProductModel): Observable<any> {
    return this.httpClient.get(this.endpoint + 'product-line/historic/' + productLine.id).pipe(retry(1));
  }
}
