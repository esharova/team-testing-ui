import { fetchDecisionStatus, IDecision } from './api-decision';

export class Poller {
    constructor(private decisionCallback?: (decision: IDecision) => void) {}

    // @ts-ignore
    private timedId: NodeJS.Timeout;
    private run = () => {
        fetchDecisionStatus()
            .then((decision: IDecision) => {
                this.processDecision(decision);

            })
    }

    public start() {
        this.timedId = setInterval(this.run, 1000);
    }

    private processDecision(decision: IDecision) {
        if (decision.status !== 'IN_PROGRESS') {
            clearInterval(this.timedId);
            this.decisionCallback && this.decisionCallback(decision);
        }
    }

}
