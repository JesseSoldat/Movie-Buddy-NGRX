import { Component, OnInit } from "@angular/core";
// Rxjs
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
// Models
import { Msg } from "../../models/msg.model";
// NGRX
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { ShowMsg } from "../../shared/shared.actions";
import { selectMsg } from "../../shared/shared.selectors";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  msg$: Observable<Msg>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.msg$ = this.store.pipe(
      select(selectMsg),

      filter(msg => {
        console.log("Msg:", msg);
        return msg !== null;
      }),
      tap(msg => {
        if (msg.color !== "alert-danger") {
          setTimeout(() => {
            this.close();
          }, 3000);
        }
      })
    );
  }

  close() {
    this.store.dispatch(new ShowMsg({ msg: null, from: "ShowMsgMC" }));
  }
}
