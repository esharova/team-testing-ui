export interface IOffer {
    rate: number;
    monthlyPayment: number;
    term: number;
}

export interface IDecision {
    status: Status;
    offers?: IOffer[];
}

export enum Status {
    SUCCESS = 'SUCCESS',
    IN_PROGRESS = 'IN_PROGRESS'
}
