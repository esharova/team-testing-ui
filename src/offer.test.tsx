import React from 'react';
import { Offer } from './offer';
import { shallow } from 'enzyme';
import { IOffer } from '../types/offer';

describe('компонент оффера', () => {
    reporter.epic("Получение решения от банков");
    reporter.feature("Отображение предложения от банка");

    it('должен отображать параметры оффера', () => {
        const offer: IOffer = {
            rate: 10.05,
            monthlyPayment: 52000,
            term: 20
        }
        const offerComponent = shallow(<Offer offer={offer}/>);
        expect (offerComponent.findWhere(node => node.text() === 'Ставка: 10.05 %').exists()).toBeTruthy();
        expect (offerComponent.findWhere(node => node.text() === 'Срок кредита: 20 лет').exists()).toBeTruthy();
        expect (offerComponent.findWhere(node => node.text() === 'Ежемесячный плвтёж: 52000 руб').exists()).toBeTruthy();

    });
});
