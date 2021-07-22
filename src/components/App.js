import React from 'react';
// import unsplash from '../api/unsplash'
import Board from './Board';
import 'semantic-ui-css/semantic.min.css'
class App extends React.Component {

    render() {
        return (
            <div className="ui container" style={{ margin: '10px' }}>
                <Board />
            </div>
        )
    }
}

export default App;