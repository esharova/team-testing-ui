import { Poller } from './poller';
import { fetchDecisionStatus } from './api-decision';

jest.mock('./api-decision');

jest.useFakeTimers();

describe('Тесты на поллер решения от банка', () => {
    afterEach(() => {
       jest.clearAllMocks();
       jest.clearAllTimers();
    });
    it('каждую секунду мы спрашиваем апишку, готово ли решение?', () => {
        fetchDecisionStatus.mockImplementation(() => ({
            then: (callback: Function) => { callback({ status: 'IN_PROGRESS' }); }
        }));
        const poller = new Poller();
        poller.start();
        jest.advanceTimersByTime(5000);
        expect(fetchDecisionStatus).toHaveBeenCalledTimes(5);
    });

    it('мы прекращаем полить в тот момент, когда возвращается какое-то решение', () => {
        fetchDecisionStatus.mockImplementation(() => ({
            then: (callback: Function) => { callback({ status: 'SUCCESS' }); }
        }));
        const poller = new Poller();
        poller.start();
        jest.advanceTimersByTime(5000);
        expect(fetchDecisionStatus).toHaveBeenCalledTimes(1);
    });

    it('уведомляем о решении', () => {
        const decision = { status: 'SUCCESS' };
        fetchDecisionStatus.mockImplementation(() => ({
            then: (callback: Function) => {
                callback(decision); }
        }));
        const decisionCallback = jest.fn();
        const poller = new Poller(decisionCallback);
        poller.start();
        jest.advanceTimersByTime(1000);
        expect(decisionCallback).toHaveBeenCalledWith(decision);
    });
});
