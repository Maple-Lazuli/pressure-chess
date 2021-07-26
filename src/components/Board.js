import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './Board.css'

import { Grid } from 'semantic-ui-react';
import Square from './Square';
class Board extends React.Component {
    state = {
        active: false,
        selection: 0,
        squares: null,
        positions: [
            '1', '2', '3', '4', '5', '6', '2', '1',
            '9', '9', '9', '9', '9', '9', '9', '9',
            '0', '0', '0', '0', '0', '0', '0', '0',
            '0', '0', '0', '0', '0', '0', '0', '0',
            '0', '0', '0', '0', '0', '0', '0', '0',
            '0', '0', '0', '0', '0', '0', '0', '0',
            '10', '10', '10', '10', '10', '10', '10', '10',
            '11', '12', '13', '14', '15', '16', '12', '11'
        ]
    };

    onSelection = (event) => {
        const current = event.target.attributes.index.nodeValue
        if (!this.state.active) {
            this.setState({ active: true})
            this.setState({ selection: current })
            console.log(`active with ${current}`)
        } else if ((this.state.active) && (this.state.selection !== current)) {
            let temp = this.state.positions
            temp[current] = temp[this.state.selection]
            temp[this.state.selection] = '0'
            this.setState({ positions: temp }, () =>
            console.log(this.state.positions))
            console.log(`replace ${this.state.selection} with ${current}`)
            this.setState({ selection: 0, active: false })
        } else if ((this.state.active) && (this.state.selection === current)) {
            this.setState({ selection: 0, active: false })
            console.log(`deselected ${current}`)
        }

    }

    componentDidUpdate = () => {
        var rowOffset = 0
        const boardIDs = [...Array(64).keys()];
        const squares = boardIDs.map((index) => {
            if ((index) % 8 === 0) {
                rowOffset += 1;
                //${((index+1+rowOffset)%2 === 0)? 'empty': 'empty'}
            }
            return (
                <Grid.Column index={index} key={index + 1} onClick={this.onSelection} className={`cell `}>
                    <Square index={index} position={this.state.positions[index]} scolor={((index + 1 + rowOffset) % 2 === 0) ? 'notcolored' : 'colored'} />
                </Grid.Column>
            )
        });
    }

    help = () => {
        var rowOffset = 0
        const boardIDs = [...Array(64).keys()];
        const squares = boardIDs.map((index) => {
            if ((index) % 8 === 0) {
                rowOffset += 1;
                //${((index+1+rowOffset)%2 === 0)? 'empty': 'empty'}
            }
            return (
                <Grid.Column index={index} key={index + 1} onClick={this.onSelection} className={`cell`}>
                    <Square index={index} position={this.state.positions[index]} scolor={((index + 1 + rowOffset) % 2 === 0) ? 'notcolored' : 'colored'} />
                </Grid.Column>
            )
        });
        return squares
    }

    render() {
        return <Grid compact columns={8} className={'board'}>{this.help()}</Grid>
    }
}

export default Board;