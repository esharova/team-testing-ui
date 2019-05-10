import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { registerAllureReporter } from '../register-allure-reporter';

configure({ adapter: new Adapter() });

registerAllureReporter();
