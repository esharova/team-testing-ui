import { fetchDecisionStatus, IDecision } from './api-decision';

export class Poller {
    constructor(private decisionCallback?: (decision: IDecision) => void) {}

    // @ts-ignore
    private timedId: NodeJS.Timeout;
    private run = () => {
        fetchDecisionStatus()
            .then((decision: IDecision) => {
                clearTimeout(this.timedId);
                this.processDecision(decision);

            })
            .catch(() => {
                clearTimeout(this.timedId);
                this.timedId = setTimeout(this.run, 1000);
            })
    }

    public start() {
        this.timedId = setTimeout(this.run, 20);
    }

    private processDecision(decision: IDecision) {
        if (decision.status !== 'IN_PROGRESS') {
            this.decisionCallback && this.decisionCallback(decision);
        } else {
            this.timedId = setTimeout(this.run, 1000);
        }
    }

}
