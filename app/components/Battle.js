import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

function ResetPlayer ({onReset, id}) {
    return (
        <button
            className='reset'
            onClick={onReset.bind(null, id)}>
            Reset
        </button>
    )
}

ResetPlayer.propTypes = {
    onReset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState(() => ({ username: value }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        const {label, username } = this.state;
        return (
            <form className='column' onSubmit={e => this.handleSubmit(e)}>
                <label className='header' htmlFor='username'>
                    {label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={username}
                    onChange={e => this.handleChange(e)}>
                </input>
                <button
                    className='button'
                    type='submit'
                    disabled={!username}>
                        Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}


class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState( () => ({
            [id + 'Name']: username,
            [id + 'Image']: `https://github.com/${username}.png?size=200`,
        }));
    }

    handleReset(id) {
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Image']: null,
        }));
    }

    render() {
        const match = this.props.match;
        const {playerOneName, playerOneImage, playerTwoName, playerTwoImage} = this.state;

        return (
            <div>
                <div className='row'>
                    {!playerOneName && 
                        <PlayerInput 
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                        />}

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}>
                            <ResetPlayer onReset={this.handleReset} id='playerOne' />
                        </PlayerPreview>}

                    {!playerTwoName && 
                    <PlayerInput 
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit} />}

                    {playerTwoImage !== null &&
                    <PlayerPreview
                        avatar={playerTwoImage}
                        id='playerTwo'
                        username={playerTwoName}>
                        <ResetPlayer onReset={this.handleReset} id='playerTwo'/>
                    </PlayerPreview>}
                </div>
                {playerOneImage && playerTwoImage &&
                    <Link
                        className='button'
                        to={{
                            pathname: match.url + '/results',
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
                        }}>
                        Battle    
                    </Link>}
            </div>
        )
    }
}

export default Battle;