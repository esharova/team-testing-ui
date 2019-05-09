import { fetchDecisionStatus, IDecision } from './api-decision';

export class Poller {
    constructor(private decisionCallback: (decision: IDecision) => void) {}

    // @ts-ignore
    private timedId: NodeJS.Timeout;

    public start() {
        this.timedId = setInterval( () => {
            fetchDecisionStatus()
                .then((decision: IDecision) => {
                    this.processDecision(decision);
                })
        }, 1000);
    }

    private processDecision(decision: IDecision) {
        if (decision.status !== 'IN_PROGRESS') {
            this.decisionCallback(decision);
            clearInterval(this.timedId);
        }
    }

}
