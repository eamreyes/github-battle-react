var React = require('react');
var PropTypes = require('prop-types');

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
                }, this)
            }
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}


class Popular extends React.Component{

    constructor(props) {
        super(props); // Always pass props to React.Componenet base
        this.state = {
            selectedLanguage: 'All'
        };

        // ensures that updateLanguage is always called with the correct this keyword
        // or with this being the correct context
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang){
        this.setState(function (){
            return {
                selectedLanguage: lang,
            };
        });
    }

    render() {


        return (
            
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />
            </div>
        )
    }
}

module.exports = Popular;