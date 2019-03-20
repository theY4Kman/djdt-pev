import {Component} from '@angular/core';

import {IPlan} from '../../interfaces/iplan';
import {HighlightType, ViewMode} from '../../enums';
import {PlanService} from '../../services/plan-service';
import {SyntaxHighlightService} from '../../services/syntax-highlight-service';

declare global {
  interface Window {
    DJDT_PLAN_CONTENT: string,
    DJDT_PLAN_NAME: string,
    DJDT_PLAN_QUERY: string,
  }
}

@Component({
    selector: 'plan-view',
    templateUrl: './plan-view.html',
    providers: [PlanService, SyntaxHighlightService],
})
export class PlanView {
    plan: IPlan;
    rootContainer: any;
    hideMenu: boolean = true;

    viewOptions: any = {
        showPlanStats: true,
        showHighlightBar: true,
        showPlannerEstimate: false,
        showTags: true,
        highlightType: HighlightType.NONE,
        viewMode: ViewMode.FULL
    };

    showPlannerEstimate: boolean = true;
    showMenu: boolean = false;

    highlightTypes = HighlightType; // exposing the enum to the view
    viewModes = ViewMode;

    constructor(private _planService: PlanService) {}

    getPlan() {
        const planContent = this.getDomText('djdt-pev-plan-content');
        const planName = this.getDomText('djdt-pev-plan-name');
        const planQuery = this.getDomText('djdt-pev-plan-query');

        this.plan = this._planService.createPlan(planName, planContent, planQuery);
        this.rootContainer = this.plan.content;
        this.plan.planStats = {
            executionTime: this.rootContainer['Execution Time'] || this.rootContainer['Total Runtime'],
            planningTime: this.rootContainer['Planning Time'] || 0,
            maxRows: this.rootContainer[this._planService.MAXIMUM_ROWS_PROP] || 0,
            maxCost: this.rootContainer[this._planService.MAXIMUM_COSTS_PROP] || 0,
            maxDuration: this.rootContainer[this._planService.MAXIMUM_DURATION_PROP] || 0
        };
    }

    getDomText(id: string) {
      return document.getElementById(id).innerText;
    }

    ngOnInit() {
        this.getPlan();
    }

    toggleHighlight(type: HighlightType) {
        this.viewOptions.highlightType = type;
    }

    analyzePlan() {
        this._planService.analyzePlan(this.plan);
    }
}
