import React, { Component } from 'react';
import { IDecision } from './api-decision';
import { Offer } from './offer';

interface IDecisionProps {
    decision: IDecision;
}

export class Decision extends Component<IDecisionProps> {
    public render() {
        return (
            <div>
                <span>{ this.props.decision.status }</span>
                { this.props.decision.status === 'SUCCESS' && this.renderOffers() }
            </div>
        );
    }

    private renderOffers() {
        const { decision } = this.props;
        return decision.offers
            ?  decision.offers.map((offer, index) => (<Offer key={index} offer={offer}/>))
            : null;
    }
}
