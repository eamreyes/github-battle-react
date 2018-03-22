import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px',
    }
};

class Loading extends React.Component {
    state = {
        text: this.props.text,
    }
    static defaultProps = {
        text: 'Loading',
        speed: 300,
    }
    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,
    }
    componentDidMount() {
        const { text, speed } = this.props;
        const { text: currentText } = this.state;
        const stopper = text + '...';
        this.interval = window.setInterval(() => {
            currentText === stopper
                ? this.setState(() => ({ text }))
                : this.setState((prevState) => ({ text: prevState.text + '.' }));
            
        }, speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }
    render() {
        const { text } = this.state;
        return (
            <p style={styles.content}>
                {text}
            </p>
        )
    }
}

export default Loading;