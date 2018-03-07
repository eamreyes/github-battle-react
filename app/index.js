var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css')

var Avatar = require('./avatar')

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)