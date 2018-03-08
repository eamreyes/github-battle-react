var React = require('react');


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
        var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            
            <ul className='languages'>
                {
                    languages.map(function(lang){
                        // New function creates a new context where this is now undefined...look at ES6 to see how this is improved upon
                        /* 
                            Wrapping in params so Javascript doesn't insert a ';' and ignore the rest of the 'statement
                            Or you can put the first JSX element on the same line as the return statement.
                            */
                        return (
                            <li key={lang} onClick={this.updateLanguage.bind(null, lang)}  style={lang === this.state.selectedLanguage ? {color: '#d0021b'} : null} >
                                {lang}
                            </li>
                        )
                    }, this)
                }
            </ul>
        )
    }
}

module.exports = Popular;