import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {App} from './components/app/app';
import {About} from "./components/about/about";
import {PlanNode} from "./components/plan-node/plan-node";
import {PlanView} from "./components/plan-view/plan-view";
import {ColorService} from "./services/color-service";
import {HelpService} from "./services/help-service";
import {PlanService} from "./services/plan-service";
import {SyntaxHighlightService} from "./services/syntax-highlight-service";
import {DurationPipe, DurationUnitPipe, MomentDatePipe} from "./pipes";


const routes: Routes = [
  { path: '', component: PlanView },
  { path: 'about', component: About }
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: [
    App,
    About,
    PlanNode,
    PlanView,
    DurationPipe,
    DurationUnitPipe,
    MomentDatePipe,
  ],
  bootstrap: [
    App,
  ],
  providers: [
    ColorService,
    HelpService,
    PlanService,
    SyntaxHighlightService,
  ],
})
export class AppModule { }
