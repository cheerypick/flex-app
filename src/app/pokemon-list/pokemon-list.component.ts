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
  activeMediaQuery = "";
  items: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase, media: ObservableMedia) {
    this.items = db.list('/pokemon');
    console.log(this.items);

    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
      console.log(change);
      if (change.mqAlias == 'xs') {
        console.log('mobile');
      }
    });

  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnInit() {
  }

}
