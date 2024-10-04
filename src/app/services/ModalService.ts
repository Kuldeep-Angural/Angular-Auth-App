import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(data: { title: string; content: string }) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: data,
    });

    return dialogRef.afterClosed();
  }
}
