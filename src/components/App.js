import React from 'react';
// import unsplash from '../api/unsplash'
import Board from './Board';
import 'semantic-ui-css/semantic.min.css'
class App extends React.Component {


    
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
                    <p>
                        Consolelog
                    </p>
                </div>
                <div className="pusher">
                    <div className="ui basic segment">
                        <h3 className="ui header">Application Content</h3>
                        <div className="ui container" style={{ margin: '10px' }}>
                            <Board />
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default App;