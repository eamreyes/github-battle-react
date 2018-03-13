var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');


function Profile (props) {
    var info = props.info;
    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                
            </ul>
        </PlayerPreview>
    )
}

function Player (props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile} />
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired,
};





class Results extends React.Component {
    constructor(params) {
        super(params);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        };

    }
    componentDidMount() {
        var players = queryString.parse(this.props.location.search);

        api.battle([players.playerOneName, players.playerTwoName])
            .then(function(results){
                if (results === null) {
                    console.log('Promise has completed');
                    return this.setState(function () {
                        return {
                            error: 'Looks like there was an error. Check that both users exist on Github',
                            loading: false,
                        };
                    });
                }
                
                this.setState(function () {
                    return {
                        error: null,
                        winner: results[0],
                        loser: results[1],
                        loading: false,
                    }
                })
            }.bind(this));
    }

    render() {
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;

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

module.exports = Results;