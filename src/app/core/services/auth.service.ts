import { Injectable } from "@angular/core";

// NGRX
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { Register, Login, Logout } from "../../auth/auth.actions";
import { ShowOverlay, ShowMsg } from "../../shared/shared.actions";

// Firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

// Models
import { User } from "../../models/user.model";

@Injectable()
export class AuthService {
  user: AngularFireObject<{ User }>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private store: Store<AppState>
  ) {}

  handleStart() {
    this.store.dispatch(new ShowOverlay({ showOverlay: true }));
  }

  handleSuccess() {
    this.store.dispatch(new ShowOverlay({ showOverlay: false }));
  }

  handleErrors(err, type) {
    let error = err.message
      ? err.message
      : `An error ocurred while trying to ${type}.`;
    const msg = { title: null, msg: error, color: "red" };
    this.store.dispatch(new ShowMsg({ msg }));
    this.store.dispatch(new ShowOverlay({ showOverlay: false }));
  }

  async saveUserToDb(credentials, username: string) {
    const user: User = {
      username: username.toLowerCase(),
      uid: credentials.user.uid,
      email: credentials.user.email
    };

    const ref = `moviedb/users/${user.uid}`;
    try {
      await this.afDb.object(ref).set({ user });

      this.store.dispatch(new Register({ user }));
      this.handleSuccess();
    } catch (err) {
      this.handleErrors(err, "register");
    }
  }

  async emailRegister(username: string, email: string, password: string) {
    this.handleStart();

    try {
      const credentials = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await credentials.user.updateProfile({
        displayName: username.toLowerCase(),
        photoURL: ""
      });

      this.saveUserToDb(credentials, username);
    } catch (err) {
      this.handleErrors(err, "register");
    }
  }

  async emailLogin(email: string, password: string) {
    this.handleStart();
    try {
      const credentials = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );

      const user = {
        username: credentials.user.displayName,
        uid: credentials.user.uid,
        email: credentials.user.email
      };

      this.store.dispatch(new Login({ user }));
      this.handleSuccess();
    } catch (err) {
      this.handleErrors(err, "login");
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
      this.store.dispatch(new Logout());
    } catch (err) {
      this.handleErrors(err, "logout");
    }
  }
}
