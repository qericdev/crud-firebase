import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService} from '../services/persona.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  @Input() persona?: Persona;
  @Output() onClose = new EventEmitter<void>();
  submitted = false;

  constructor(private activeModal: NgbActiveModal, private personaService : PersonaService) {}
  closeModal() {
    this.onClose.emit();
  }

  updatePersona(): void {
    if (this.persona) {
      try {
        this.personaService.update(this.persona.key??"", this.persona).then(() => {
          console.log('Se actualizó la persona correctamente');
          this.submitted = true;
          if (this.submitted) {
            this.onClose.emit();
          }
        });
      } catch(error) {
        console.error('Error al actualizar la persona:', error);
      }
    }
  }

}
