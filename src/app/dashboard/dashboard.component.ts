import { Component } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isModalOpen = false;

  constructor(private modalService : NgbModal) {}

  openModal() {
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;
    const modalRef = this.modalService.open(AddComponent);
    modalRef.componentInstance.onClose.subscribe(() => {
      this.isModalOpen = false;
      modalRef.close();
    });
  }

}
