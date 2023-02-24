import { Component} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Persona } from '../models/persona.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})

export class LogComponent {
  personas: Persona[] = [];
  cambios: string[] = [];

  constructor(private db: AngularFireDatabase) {
    this.db
      .list('/personas')
      .snapshotChanges(['child_added', 'child_changed', 'child_removed'])
      .subscribe((actions) => {
        console.log(actions);
        actions.forEach((action) => {
          const persona = action.payload.val() as Persona;
          if (action.type === 'child_added') {
            const persona = action.payload.val() as Persona;
            persona.key = action.payload.key;
            persona.accion = 'Agregado';
            persona.timestamp = Date.now();
            const index = this.personas.findIndex((p) => p.key === persona.key);
            if(index < 0) {
              this.personas.push(persona);
            }
          }
          if (action.type === 'child_changed') {
            const persona = action.payload.val() as Persona;
            persona.key = action.payload.key;
            persona.accion = 'Modificado';
            persona.timestamp = Date.now();
            this.personas.push(persona);
        }
          
          if (action.type === 'child_removed') {
            const persona = action.payload.val() as Persona;
            persona.nombre += ' ' + persona.edad + ' Eliminado';
            persona.edad = 0;
            persona.accion = 'Eliminado';
            this.personas.unshift(persona);
          }
        });
      });
  }
}
