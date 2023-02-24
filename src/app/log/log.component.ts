import { Component} from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Persona } from '../models/persona.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})

export class LogComponent {
  personas: Persona[] = [];
  cambios: string[] = [];
  actionsArr: SnapshotAction<any>[] = [];

  constructor(private db: AngularFireDatabase) {
    this.db
      .list('/personas')
      .snapshotChanges(['child_added', 'child_changed', 'child_removed'])
      .subscribe((actions) => {
        
        if (this.actionsArr.length == 0) {
          this.actionsArr = actions;
        } else {
          var difference = this.actionsArr.filter(x => !actions.some(y => y.key === x.key));
          console.log(difference);
          difference.forEach((action) => {
              const persona = action.payload.val() as Persona;
              persona.key = action.payload.key;
              persona.accion = 'Eliminado';
              persona.timestamp = Date.now();
              
              this.personas.push(persona);
          
            });
        }
        this.actionsArr = actions;
        
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
            const index = this.personas.findIndex((p) => p.key === persona.key);
            this.personas.push(persona);
            action.type = 'value';
        }
        });
      });
  }
}
