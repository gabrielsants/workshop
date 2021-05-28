import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomErrorStateMatcher } from '@app/feautures/admin/components/register-user/register-user.component';
import { ProductService } from '@app/feautures/admin/services/product.service';
import { Parts } from '@app/feautures/common-views/models/parts.model';
import { ProductModel } from '@app/feautures/common-views/models/product-model.model';
import { PartsService } from '../../service/parts.service';

@Component({
  selector: 'app-register-parts',
  templateUrl: './register-parts.component.html',
  styleUrls: ['./register-parts.component.scss'],
})
export class RegisterPartsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private partsService: PartsService
  ) {}

  isLoading = false;
  mode: ProgressSpinnerMode = 'determinate';
  partsForm!: FormGroup;
  matcher = new CustomErrorStateMatcher();
  productModels: ProductModel[] = [];
  parts: Parts = { id: null, name: '', productModel: null };

  ngOnInit(): void {
    this.partsForm = this.formBuilder.group({
      name: ['', Validators.required],
      productModel: ['', Validators.required],
    });
    this.loadData();
  }

  private async loadData(): Promise<void> {
    this.productService.getProductsLine().subscribe((res) => {
      this.productModels = res;
    });
  }

  public async submit(): Promise<void> {
    console.log('submit');
    this.isLoading = true;

    if (this.partsForm.valid) {
      this.parts = await this.partsForm.value;

      await this.partsService.save(this.parts).subscribe((res) => {
        this.openSnackBar(res, 'close');
      });
    }

    this.isLoading = false;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
