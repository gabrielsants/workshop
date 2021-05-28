import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '@app/feautures/common-views/models/department.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.scss'],
})
export class ListDepartmentsComponent implements AfterViewInit {
  constructor(private userService: UserService, public dialog: MatDialog) {
    this.init();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', '*'];
  dataSource = new MatTableDataSource<Department>();
  department: Department = null;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private init() {
    this.userService.getDepartments().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Department>(res);
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(department: Department): void {
    const dialogRef = this.dialog.open(EditDepartment, { width: 'auto', data: department });
    dialogRef.afterClosed().subscribe((res) => {
      this.department = res;
    });
  }

  public reload() {
    this.init();
  }
}

@Component({
  selector: 'edit-department',
  templateUrl: './edit-department.html',
})
export class EditDepartment {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditDepartment>,
    @Inject(MAT_DIALOG_DATA) public data: Department
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(name: string) {
    this.data.name = name;
    this.userService.updateDepartment(this.data).subscribe((res) => {
      this.openSnackBar(res, 'close');
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
