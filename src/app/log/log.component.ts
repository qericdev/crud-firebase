import { Component, OnInit, OnDestroy} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  items!: Observable<any[]>;
  private itemsSubscription!: Subscription;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.items = this.db.list('/').valueChanges();
    this.itemsSubscription = this.items.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
  
}
