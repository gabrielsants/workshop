import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from '@app/feautures/common/models/product-model.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogHistoricComponent } from '../dialog-historic/dialog-historic.component';

@Injectable({
  providedIn: 'root',
})
export class DialogHistoricService {
  constructor(private dialog: MatDialog) {}

  dialogRef: MatDialogRef<DialogHistoricComponent>;

  public open(options: { title: string; list: ProductModel[] }) {
    this.dialogRef = this.dialog.open(DialogHistoricComponent, {
      data: {
        title: options.title,
        list: options.list,
      },
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
