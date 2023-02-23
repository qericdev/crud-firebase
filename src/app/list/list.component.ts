import { Component} from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  personas? : Persona[];
  currentPersona? : Persona;
  currentIndex = -1;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.retrievePersonas();
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
