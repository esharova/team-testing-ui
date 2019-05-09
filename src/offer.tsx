import React, { Component } from 'react';
import { IOffer } from '../types/offer';

interface IOfferProps {
    offer: IOffer;
}

class Offer extends Component<IOfferProps> {
    render() {
        const { offer } = this.props;
        return (
            <div>
                <p>{ `Ставка: ${offer.rate} %` }</p>
                <p>{ `Срок кредита: ${offer.term} лет` }</p>
                <p>{ `Ежемесячный плвтёж: ${offer.monthlyPayment} руб` }</p>
            </div>
        );
    }
}

export { Offer };
