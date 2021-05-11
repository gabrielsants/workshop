import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
    },
    private mdDialogRef: MatDialogRef<DialogComponent>
  ) {}

  public cancel() {
    this.close(false);
  }

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
}

/* 
USAGE

1. IMPORT ON YOUR COMPONENT
private dialogService : DialogService
2. PASTE THIS FUNC
openDialog() {
    const options = {
      title: 'Aviso!',
      message: 'Realemente deseja proceder?',
      cancelText: 'Nao, cancele por favor',
      confirmText: 'confirmar'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      console.log(confirmed);
    })
  }
3. CREATE A BUTUTTON TO CALL THE FUNC
ENJOY 

*/
