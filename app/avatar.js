var React = require('react');
var PropTypes = require('prop-types')
require('./index.css')

class Avatar extends React.Component {
    render () {
        return (
            <div>
                <img 
                    src={this.props.img}
                    alt='Avatar'/>
                <h1>Name: {this.props.name}</h1>
                <h3>username: {this.props.username}</h3>
            </div>
        )
    }
}

Avatar.propTypes = {
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

module.exports = Avatar;
