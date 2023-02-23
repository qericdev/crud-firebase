import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private dbPath = '/personas';

  personasRef: AngularFireList<Persona>;

  constructor(private db: AngularFireDatabase) {
    this.personasRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Persona> {
    return this.personasRef;
  }

  create(persona: Persona): any {
    return this.personasRef.push(persona);
  }

  update(key: string, value: any): Promise<void> {
    return this.personasRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.personasRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.personasRef.remove();
  }
}