var React = require('react');
var Popular = require('./Popular')
class App extends React.Component {
    render() {
        return (
            <div className='container'> {/*'class' is a reserved JS operator, so use className instead*/}
                <Popular />
            </div>
        )
    }
}

module.exports = App; // common js