import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Poller } from './poller';

jest.mock('./poller');

describe('Хочу ипотеку', () => {
  reporter.epic("Получение решения от банков");
  reporter.feature("Отправка запроса на ипотеку");

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders without crashing', () => {
    const renderComponent = shallow(<App />);
    const button = renderComponent.find('button');
    expect(button.text()).toEqual('Хочу ипотеку');
  });

  it('жмя -  и ждун предложений; кнопка хочу пропадает', () => {
    const renderComponent = shallow(<App />);
    const button = renderComponent.find('button');
    button.simulate('click');
    const waitText = renderComponent.find('span');
    expect(waitText.text()).toEqual('Ждёмс...');
    expect(renderComponent.find('button').exists()).toBeFalsy();
  });

  it('после жмя, начинаем ждать решения', () => {
    const renderComponent = shallow(<App />);
    const button = renderComponent.find('button');
    button.simulate('click');
    expect(Poller).toHaveBeenCalledTimes(1);
    const pollerInstance = Poller.mock.instances[0];
    expect(pollerInstance.start).toHaveBeenCalled();
  });

  it('когда решение получено, его надо показать и закончить ожидание; при этом кнопки хочу тоже нет', (done) => {
    const renderComponent = shallow(<App />);
    renderComponent.setState({ decision: 'SUCCESS'}, () => {
      const statusComponent = renderComponent.find('Decision');
      expect(statusComponent.exists()).toBeTruthy();
      expect(renderComponent.find('span').exists()).toBeFalsy();
      expect(renderComponent.find('button').exists()).toBeFalsy();
      done();
    })
  });
});
