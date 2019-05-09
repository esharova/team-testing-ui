import React, { Component } from 'react';

interface IStatusProps {
    status: string;
}

export class Status extends Component<IStatusProps> {
    public render() {
        return ( <span>{ this.props.status }</span>)
    }
}
