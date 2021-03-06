import  React from 'react'
import  PropTypes from 'prop-types'
import  Loading from './Loading'
import  api from '../utils/api'

function SelectLanguage({onSelect, selectedLanguage}){
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {
                languages.map((lang)=>{
                    return (
                        <li key={lang} onClick={() => onSelect(lang)}  style={lang === selectedLanguage ? {color: '#d0021b'} : null} >
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

function RepoGrid({repos}) {
    return (
        <ul className='popular-list'>
        {
            repos.map(({name, owner, html_url, stargazers_count}, index) => {
                return (
                    <li key={name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={owner.avatar_url}
                                    alt={'Avatar for ' + owner.login}
                                />
                            </li>
                            <li>
                                <a href={html_url}>{name}</a>
                            </li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
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
    state = {
        selectedLanguage: 'All',
        repos: null,
    }
    

    updateLanguage = async (lang) => {
        this.setState(() => ({
                selectedLanguage: lang,
                repos: null
            }));

        const repos = await api.fetchPopularRepos(lang);
        this.setState(() => ({repos}));
    }

    componentWillMount = () => {
        this.updateLanguage(this.state.selectedLanguage);
    }

    render() {
        const {selectedLanguage, repos} = this.state;
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage} />
                {
                    !repos
                    ? <Loading text='Fetching results' speed={100}/>
                    : <RepoGrid repos={repos} />
                }
                
            </div>
        )
    }
}

export default Popular;