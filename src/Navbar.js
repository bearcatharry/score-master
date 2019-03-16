/*global chrome*/
import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

class Navbar extends PureComponent {
    constructor() {
        super();
        this.state = {
            teams: [],
            team: "",
        };
        // Bind the context.
        this.renderTeams = this.renderTeams.bind(this);
    }
    // url example
    // "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/cavs.png"

    renderTeams() {
      var logos = [];
      var teams = [];
      // if (this.state.prevlen !== teamnames.length) {
      //   this.setState({
      //     teams: teamnames,
      //     team: teamnames[0],
      //     prevlen: teamnames.length
      //   });

      // }
      var url = "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/";
      chrome.storage.sync.get("basketballList", (result) => {
        if (!chrome.runtime.error) {
          teams = result.basketballList;
            this.setState({
              teams: teams
            });
          
          // console.log(result);

        } else {
            console.log("ffffff");

        }
      });
      // map team name with team logo url 
      if (this.state.teams) {
          for (var i = 0; i < this.state.teams.length; i++) {
            var teamLogo = url + this.state.teams[i] + '.png';
            var teamName = this.state.teams[i];
            logos.push(<img src={teamLogo} alt={teamName} id={i} className="fav-team col-2"/>)
          }
      }
      if (logos.length === 0) {
        logos.push(<img alt="" id="0" className="fav-team col-2" />)
      }

      return logos;
    }


    render() {
      return this.renderTeams();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('component update, teams',this.state.teams, nextState.teams);
    //   if (this.state.teams.length !== nextState.teams.length) {
    //     return true;
    //   }
    //   if (this.state.teams.length === nextState.teams.length) {
    //     for(var i = 0; i < nextState.teams.length; i++) {
    //       if (this.state.teams[i] !== nextState.teams[i]) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // }

}

Navbar.propTypes = {
  team: PropTypes.string.isRequired,
};

export default Navbar;


