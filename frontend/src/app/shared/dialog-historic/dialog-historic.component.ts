import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '@app/feautures/common/models/product-model.model';

@Component({
  selector: 'app-dialog-historic',
  templateUrl: './dialog-historic.component.html',
  styleUrls: ['./dialog-historic.component.scss'],
})
export class DialogHistoricComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      list: ProductModel[];
    },
    private mdDialogRef: MatDialogRef<DialogHistoricComponent>
  ) {}

  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }

  public formatDate(date: string | number | Date) {
    return new Date(date).toLocaleDateString();
  }
}
