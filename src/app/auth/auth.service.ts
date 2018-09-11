import { Injectable } from "@angular/core";

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
    private afDb: AngularFireDatabase
  ) {}

  async saveUserToDb(credentials, username: string) {
    console.log(credentials);
    const user: User = {
      username,
      uid: credentials.uid,
      email: credentials.email
    };

    const pathName = username.split(" ").join("");
    const ref = `moviedb/users/${user.uid}/${pathName}`;
    this.user = this.afDb.object(ref);
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
