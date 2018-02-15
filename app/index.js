var React = require('react');
var ReactDOM = require('react-dom');
require('./index.ss')

class App extends React.Component {
    render() {
        return (
            // Looks like HTML, but is actually transpiled into Javascript
            // JSX
            <div>
                Hello world!
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
)