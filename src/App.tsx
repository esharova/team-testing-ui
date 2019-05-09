import React, { Component } from 'react';
import './App.css';
import { Poller } from './poller';
import { Decision } from './decision';
import { IDecision } from './api-decision';

interface IAppProps {
}

interface IAppState {
    inProgress: boolean;
    decision?: IDecision;
}

class App extends Component<IAppProps, IAppState>{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            inProgress: false
        }
    }

    private  handleClick = () => {
        this.setState({ inProgress: true});
        const poller = new Poller(this.updateDecision);
        poller.start();
    }

    private updateDecision = (decision: IDecision) => {
        this.setState({ decision, inProgress: false });
    }

    public render() {
        const { inProgress, decision } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    {
                        !inProgress && !decision && <button onClick={this.handleClick}>Хочу ипотеку</button>
                    }
                    {
                        inProgress && <span>Ждёмс...</span>
                    }
                    {
                        !!decision && <Decision decision={decision} />
                    }

                </header>
            </div>
        )
    }
}

export default App;
