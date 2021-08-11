import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './Board.css';
import Backend from '../api/backend';


import { Grid } from 'semantic-ui-react';
import Square from './Square';
import { positions } from '@material-ui/system';
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
        ],
        base: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        base_individual: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        base_relative: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        val: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        val_individual: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        val_relative: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
        weights: [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]
    };


    queryBackend = async (positionsArr) => {
        const response = await Backend.get(
            '/', {
            params: {
                positions: this.state.positions.toString()
            }
        });
        this.setState({ res: response.status}, () => {
            this.props.updateMessage(`Server Response: ${response.status}`)
            console.log(response)
            this.setState({
                base: response.data.base['0'],
                base_individual: response.data.base_individual['0'],
                base_relative: response.data.base_relative['0'],
                val: response.data.base['0'],
                val_individual: response.data.val_individual['0'],
                val_relative: response.data.val_relative['0'],
            }, () => {this.setState({weights: this.state.val_relative})})
        })
    }

    onSelection = (event) => {
        const current = event.target.attributes.index.nodeValue
        if (!this.state.active) {

            this.setState({ active: true, selection: current })
            this.props.updateMessage(`Selected cell: ${current}`)

        } else if ((this.state.active) && (this.state.selection !== current)) {

            let temp = this.state.positions
            temp[current] = temp[this.state.selection]
            temp[this.state.selection] = '0'

            this.setState({ positions: temp }, () => {
                this.props.updateMessage(`Sending Request To Server`);
                this.queryBackend(this.state.positions);
            }
            )

            this.props.updateMessage(`replace ${this.state.selection} with ${current}`)
            this.setState({ selection: 0, active: false })

        } else if ((this.state.active) && (this.state.selection === current)) {
            this.setState({ selection: 0, active: false })
            this.props.updateMessage(`Deselected cell: ${current}`)

        }

    }

    // componentDidUpdate = () => {
    //     return <Grid compact columns={8} className={'board'}>{this.help()}</Grid>
    // }



    help = () => {
        var rowOffset = 0
        var base = 0
        var weight = 0
        var colorval = ""
        const boardIDs = [...Array(64).keys()];
        const squares = boardIDs.map((index) => {
            if ((index) % 8 === 0) {
                rowOffset += 1;
                //${((index+1+rowOffset)%2 === 0)? 'empty': 'empty'}
            }
            base = this.state.base[index]
            weight = this.state.weights[index]
            colorval = `rgba(0,0,0,0)`
            console.log(`color starting`)
            if (base < 0) {
                colorval = `rgba(255,0,0,${weight})`
                console.log(`color red ${colorval}`)
            } if (base > 0) {
                colorval = `rgba(0,0,255,${weight})`
                console.log(`color blue ${colorval}`)
            } 
            return (
                <Grid.Column index={index} key={index + 1} onClick={this.onSelection} className={`cell`}>
                    <Square index={index} colorVal ={colorval} position={this.state.positions[index]} scolor={((index + 1 + rowOffset) % 2 === 0) ? 'notcolored' : 'colored'} />
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