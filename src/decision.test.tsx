import React from 'react';
import { shallow } from 'enzyme';
import { Decision } from './decision';
import { IOffer } from '../types/offer';
import { IDecision } from './api-decision';

describe('Компонен Decision', () => {
    it('should render', () => {
        const decision = { status: '' };
        const statusComponent = shallow(<Decision decision={ decision }/>);
        expect(statusComponent).toBeDefined();
    });

    it('должен отобразить статус решения', () => {
        const decision = { status: 'Lucky you are!' };
        const statusComponent = shallow(<Decision decision={ decision }/>);
        expect(statusComponent .findWhere(node => node.text() === 'Lucky you are!').exists()).toBeTruthy();
    });

    it('Если статус success мы показываем список офферов', () => {
        const offers: IOffer[] = [
            {} as IOffer, {} as IOffer
        ];
        const decision: IDecision = { status: 'SUCCESS', offers };
        const statusComponent = shallow(<Decision decision={ decision }/>);
        expect(statusComponent .find('Offer')).toHaveLength(2);
    });
});
