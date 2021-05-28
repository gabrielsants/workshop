import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from '@app/feautures/common-views/models/product-model.model';
import { Product } from '@app/feautures/common-views/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-register-product-model',
  templateUrl: './register-product-model.component.html',
  styleUrls: ['./register-product-model.component.scss'],
})
export class RegisterProductModelComponent {
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {
    this.productForm = formBuilder.group({
      name: ['', Validators.required],
      product: ['', Validators.required],
    });
    this.loadData();
  }

  productModel: ProductModel = { id: null, name: '', product: null, isActive: true };
  productForm!: FormGroup;
  products: Product[] = [];
  isLoading = false;

  private loadData(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  public submit() {
    this.isLoading = true;
    if (this.productForm.valid) {
      this.productModel.name = this.productForm.controls['name'].value;
      this.productModel.product = this.productForm.controls['product'].value;
      this.productService.saveProductLine(this.productModel).subscribe((res) => {
        this.openSnackBar(res, 'close');
      });
    }
    this.isLoading = false;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
