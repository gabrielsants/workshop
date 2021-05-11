import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from '@app/feautures/common/models/department.model';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-department',
  templateUrl: './register-department.component.html',
  styleUrls: ['./register-department.component.scss'],
})
export class RegisterDepartmentComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar) {
    this.departmentForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  departmentForm!: FormGroup;
  isLoading = false;

  public submit() {
    this.isLoading = true;

    if (this.departmentForm.valid) {
      let department: Department = this.departmentForm.value;
      this.userService.saveDepartment(department).subscribe((res) => {
        this.openSnackBar(res, 'close');
      });
    }
    this.isLoading = false;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
