import {Component, OnInit, OnDestroy} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";


@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  watcher: Subscription;
  items: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase, media: ObservableMedia) {
    this.items = db.list('/pokemon');
    console.log(this.items);

    this.watcher = media.subscribe((change: MediaChange) => {
      console.log(change);
      if (change.mqAlias == 'xs') {
        console.log('mobile');
      }
    });

    media.asObservable()
      .filter((change: MediaChange) => change.mqAlias == 'xs')
      .subscribe(() => console.log('mobile from observable'));

  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnInit() {
  }

}
