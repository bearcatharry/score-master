
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
    constructor() {
    super();

    // Bind the context.
        this.renderTeams = this.renderTeams.bind(this);
    }
    // url example
    // "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/cavs.png"

    renderTeams() {

        var teams = ['HOU', 'BOS'];
        var url = "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/";

        // map team name with team logo url 


        return 0
        // <img src={teamLogo} alt={teamName} class="fav-team col-2">

    }

    render() {
        {
          Object.keys(this.state.games)
            .map(key => 
              <Game key={key} game={this.props.games[key]} />
            )
        }
    }

}



