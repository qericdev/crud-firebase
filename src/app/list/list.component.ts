import { Component} from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona.model';
import { map } from 'rxjs/operators';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  personas? : Persona[];
  currentPersona? : Persona;
  currentIndex = -1;
  isModalOpen = false;

  constructor(private personaService: PersonaService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.retrievePersonas();
  }

  openModal(persona : Persona) {
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.persona = persona;
    modalRef.componentInstance.onClose.subscribe(() => {
      this.isModalOpen = false;
      modalRef.close();
    });
  }

  retrievePersonas(): void {
    try {
      this.personaService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key,...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.personas = data;
      });
    } catch (error) {
      console.error('Error retrieving personas', error);
    }
  }

  deletePersona(key: string): void {
    try {
      this.personaService.delete(key);
    } catch (error) {
      console.error('Error deleting persona', error);
    }
  }



}
