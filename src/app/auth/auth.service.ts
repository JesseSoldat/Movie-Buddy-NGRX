import { Injectable } from "@angular/core";

// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Register } from "./auth.actions";

// Firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

// Models
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
  user: AngularFireObject<{ User }>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private store: Store<AppState>
  ) {}

  async saveUserToDb(credentials, username: string) {
    console.log(credentials);
    const user: User = {
      username,
      uid: credentials.user.uid,
      email: credentials.user.email
    };

    const pathName = username
      .split(" ")
      .join("")
      .toLowerCase();

    const ref = `moviedb/users/${user.uid}/${pathName}`;
    this.afDb.object(ref).set({ user });

    this.store.dispatch(new Register({ user }));
  }

  async emailRegister(username: string, email: string, password: string) {
    try {
      const credentials = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.saveUserToDb(credentials, username);
    } catch (err) {
      console.log(err);
    }
  }

  async emailLogin(email: string, password: string) {
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
    } catch (err) {
      console.log(err);
    }
  }
}
