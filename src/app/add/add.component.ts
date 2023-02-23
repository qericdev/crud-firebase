import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../models/persona.model';
import { PersonaService} from '../services/persona.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  persona: Persona = new Persona();
  submitted = false;

  @Output() onClose = new EventEmitter<void>();

  constructor(private activeModal: NgbActiveModal, private personaService : PersonaService) {}
  closeModal() {
    this.onClose.emit();
  }

  agregarPersona(): void {
    this.personaService.create(this.persona).then(() => {
      console.log('Se agregó a la persona exitosamente!');
      this.submitted = true;
      if (this.submitted) {
        this.onClose.emit();
      }
    });
  }
}
