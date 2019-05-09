import { IOffer } from '../types/offer';

export interface IDecision {
    status: string;
    offers?: IOffer[];
}

export function fetchDecisionStatus(): Promise<IDecision> {
    return Promise.resolve({
        status: 'SUCCESS',
        offers: [
            {
                rate: 10.05,
                monthlyPayment: 52000,
                term: 20
            },
            {
                rate: 11.05,
                monthlyPayment: 62000,
                term: 20
            }
        ]
    });
}
