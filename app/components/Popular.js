var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props){
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {
                languages.map(function(lang){
                    return (
                        <li key={lang} onClick={props.onSelect.bind(null, lang)}  style={lang === props.selectedLanguage ? {color: '#d0021b'} : null} >
                            {lang}
                        </li>
                    )
                })
            }
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
        {
            props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })
        }
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}


class Popular extends React.Component{

    constructor(props) {
        super(props); // Always pass props to React.Componenet base
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        // ensures that updateLanguage is always called with the correct this keyword
        // or with this being the correct context
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang){
        this.setState(function (){
            return {
                selectedLanguage: lang,
                repos: null
            };
        });

        // Do the AJAX
        api.fetchPopularRepos(lang)
            .then(function(response) {
                this.setState(function(){
                    return {
                        repos: response,
                    }
                });
            }.bind(this));
    }

    componentWillMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    render() {
        return (
            
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />
                {
                    !this.state.repos
                    ? <p>LOADING</p>
                    : <RepoGrid repos={this.state.repos} />
                }
                
            </div>
        )
    }
}

module.exports = Popular;