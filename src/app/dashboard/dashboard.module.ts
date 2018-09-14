import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Modules
import { SharedModule } from "../shared/shared.module";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [DashboardRoutingModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
