import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from '@app/feautures/common/models/department.model';
import { Role } from '@app/feautures/common/models/role.model';
import { User } from '@app/feautures/common/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar) {
    this.init();
  }

  isLoading = false;
  mode: ProgressSpinnerMode = 'determinate';
  userForm!: FormGroup;
  matcher = new CustomErrorStateMatcher();
  user: User = { id: null, password: '', department: null, role: null, email: '', full_name: '', isActive: true };
  hide: boolean = true;
  roles: Role[] = [];
  departments: Department[] = [];

  private async init() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      full_name: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
    });
    this.loadData();
  }

  private async loadData() {
    this.userService.getRoles().subscribe((res) => {
      this.roles = res;
    });
    this.userService.getDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  public submit() {
    this.isLoading = true;
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.user.isActive = true;

      this.userService.saveUser(this.user).subscribe((res) => {
        this.openSnackBar(res, 'close');
      });
    }
    this.isLoading = false;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
