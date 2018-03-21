import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../utils/api';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';


function Profile({ info }) {
    const { avatar_url, login, name, location, company, followers, following, public_repos, blog } = info;
    return (
        <PlayerPreview avatar={avatar_url} username={login}>
            <ul className='space-list-items'>
                {name && <li>{name}</li>}
                {location && <li>{location}</li>}
                {company && <li>{company}</li>}
                <li>Followers: {followers}</li>
                <li>Following: {following}</li>
                <li>Public Repos: {public_repos}</li>
                {blog && <li><a href={blog}>{blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

function Player({ label, score, profile }) {
    return (
        <div>
            <h1 className='header'>{label}</h1>
            <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
            <Profile info={profile} />
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired,
};

class Results extends React.Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    }
    componentDidMount() {
        const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

        api.battle([playerOneName, playerTwoName])
            .then((results) => {
                results === null
                    ? this.setState(() => ({
                        error: 'Looks like there was an error. Check that both users exist on Github',
                        loading: false,
                    }))
                    : this.setState(() => ({
                        error: null,
                        winner: results[0],
                        loser: results[1],
                        loading: false,
                    }));
            });
    }

    render() {

        const {error, winner, loser, loading} = this.state;

        if (loading === true) {
            return <Loading />
        }

        if (error !== null) {
            return (
                <div>
                    <p>Error: {error} </p>
                    <Link to='/battle'>Try again</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results;