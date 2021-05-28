import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@app/feautures/common-views/models/user.model';
import { DialogService } from '@app/shared/service/dialog.service';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements AfterViewInit {
  constructor(private usersService: UserService, private dialogService: DialogService, private _snackBar: MatSnackBar) {
    this.init();
  }

  displayedColumns: string[] = ['id', 'full_name', 'department', 'isActive', '*'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  private async init() {
    this.usersService.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<User>(res);
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public removeUser(user: User) {
    const opttions = {
      title: 'Desabilitar usuário',
      message: `Deseja desabilitar o usuário ${user.full_name}?`,
      cancelText: 'Cancelar',
      confirmText: 'Confirmar',
    };
    this.dialogService.open(opttions);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        user.isActive = false;
        this.usersService.updateUser(user).subscribe((res) => {
          this.openSnackBar(res, 'close');
        });
      }
    });
  }

  public isActiveToNaturalLanguague(value: boolean): string {
    if (value == true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  disableButton(row: User): boolean {
    if (row.isActive == true) {
      return false;
    }
    return true;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
