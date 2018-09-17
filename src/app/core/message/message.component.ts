import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Msg } from "../../models/msg.model";
// NGRX
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { ShowMsg } from "../../shared/shared.actions";
import {
  selectMsg,
  selectShowMsg,
  selectHideMsg
} from "../../shared/shared.selectors";

const emptyMsg = {
  title: "",
  msg: "",
  color: ""
};

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  showMsg$: Observable<boolean>;
  hideMsg$: Observable<boolean>;
  msg$: Observable<Msg>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showMsg$ = this.store.pipe(select(selectShowMsg));
    this.hideMsg$ = this.store.pipe(select(selectHideMsg));
    this.msg$ = this.store.pipe(select(selectMsg));

    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.store.dispatch(new ShowMsg({ msg: emptyMsg }));
  }
}
