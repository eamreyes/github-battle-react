var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css')

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <p>I'm coming to you live from my first React module!</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)