var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css')

var Avatar = require('./avatar')

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <p>I'm coming to you live from my first React module!</p>
                <Avatar username='mrhobbles' name='Eddie' img='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)