import React, { Component } from 'react';
import './App.css';

interface IAppProps {
}

interface IAppState {

}

class App extends Component<IAppProps, IAppState>{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            inProgress: false
        }
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Здесь будет контент</h1>
                </header>
            </div>
        )
    }
}

export default App;
