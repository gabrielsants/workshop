import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@app/feautures/common/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent {
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private _snackBar: MatSnackBar) {
    this.productForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  product: Product = { id: null, name: '' };
  productForm!: FormGroup;
  isLoading = false;

  submit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.product.name = this.productForm.controls['name'].value;

      // console.log(this.product)
      this.productService.saveProduct(this.product).subscribe((res) => {
        this.openSnackBar(res, 'close');
        this.isLoading = false;
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
