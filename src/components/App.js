import React from 'react';
// import unsplash from '../api/unsplash'
import Board from './Board';
import 'semantic-ui-css/semantic.min.css'
class App extends React.Component {
    state = {
        message1: '',
        message2: '',
        message3: '',
        message4: ''
    }

    updateMessage = (text) => {
        this.setState({
            message1: this.state.message2,
        }, () => {
            this.setState({
                message2: this.state.message3
            }, () => {
                this.setState({
                    message3: this.state.message4
                }, () => {
                    this.setState({ message4: text })
                })
            })
        })
    }

    render() {
        return (

            <div className="ui bottom attached segment pushable">
                <div className="ui visible inverted left vertical sidebar menu">
                    <a className="item">
                        <i className="home icon"></i>
                        Home
                    </a>
                    <a className="item">
                        <i className="block layout icon"></i>
                        Topics
                    </a>
                    <a className="item">
                        <i className="smile icon"></i>
                        Friends
                    </a>
                    <a className="item">
                        <i className="calendar icon"></i>
                        History
                    </a>
                    <br />
                    <p style={{ color: "lightblue" }}>
                        {this.state.message4}
                    </p>
                    <p style={{ color: "lightgrey" }}>
                        {this.state.message3}
                    </p>
                    <p style={{ color: "darkgrey" }}>
                        {this.state.message2}
                    </p>
                    <p style={{ color: "grey" }}>
                        {this.state.message1}
                    </p>

                </div>
                <div className="pusher">
                    <div className="ui basic segment">
                        <h3 className="ui header">Chess Pressure Tool</h3>
                        <div className="ui container" style={{ margin: '10px' }}>
                            <Board updateMessage={this.updateMessage} />
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default App;