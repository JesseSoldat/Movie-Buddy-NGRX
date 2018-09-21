import { Injectable } from "@angular/core";
// NGRX
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { Register, Login, Logout } from "../../auth/auth.actions";
// Firebase
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
// Models
import { User } from "../../models/user.model";
// Utils
import {
  errMsg,
  showOverlay,
  hideOverlay
} from "../../utils/ui.action.dispatchers";

@Injectable()
export class AuthService {
  user: AngularFireObject<{ User }>;
  fromMsg = "ShowMsgAS";
  fromOverlay = "ShowOverlayAS";

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private store: Store<AppState>
  ) {}

  handleErrors(err, type) {
    const msg = err.message
      ? err.message
      : `An error ocurred while trying to ${type}.`;

    errMsg(this.store, this.fromMsg, msg);
  }

  async saveUserToDb(credentials, username: string) {
    const user: User = {
      username: username.toLowerCase(),
      uid: credentials.user.uid,
      email: credentials.user.email
    };

    try {
      await this.afDb.object(`moviedb/users/${user.uid}`).set({ user });

      this.store.dispatch(new Register({ user }));

      hideOverlay(this.store, this.fromOverlay);
    } catch (err) {
      this.handleErrors(err, "register");
    }
  }

  async emailRegister(username: string, email: string, password: string) {
    showOverlay(this.store, this.fromOverlay);

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
    showOverlay(this.store, this.fromOverlay);

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

      hideOverlay(this.store, this.fromOverlay);
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
