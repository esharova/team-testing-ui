export interface IDecision {
    status: string;
}

export function fetchDecisionStatus(): Promise<IDecision> {
    return Promise.resolve({ status: 'SUCCESS'});
}
