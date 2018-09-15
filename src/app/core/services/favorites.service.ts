import { Injectable } from "@angular/core";
// Firebase
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

// NGRX
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";

@Injectable()
export class FavoritesService {
  constructor(
    private store: Store<AppState>,
    private afDb: AngularFireDatabase
  ) {}
}
