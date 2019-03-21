/*global chrome*/
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Teambar from './Teambar';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            previousteams: [],
            team: "",
            update: ""
        };
        // Bind the context.
        this.renderTeams = this.renderTeams.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    }
    // url example
    // "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/cavs.png"
    forceUpdateHandler(){
      this.forceUpdate();
    }
    renderTeams() {
      console.log('render',this.state);
      var logos = [];
      var newteams = [];
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
          var oldteams = this.state.teams;
          newteams = result.basketballList;
            this.setState({
              teams: newteams
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
            // var teamName = this.state.teams[i];
            logos.push(teamLogo)
          }
      } 
    return this.state.teams.length ? (
      <div className="teams">
        {
          Object.keys(this.state.teams)
            .map(key => 
              <Teambar key={key} teamName={this.state.teams[key]} teamLogo={logos[key]}  teamNames = {this.state.teams}/>
            )
        }
        
      </div>
    ) : (
      <div className="no-teams-selected">
        No teams selected
      </div>
    );
    }


    render() {
      // console.log('render team!!!')
      return this.renderTeams();
    }

    shouldComponentUpdate(nextProps, nextState) {

      if (this.state.teams.length !== nextState.teams.length) {
        console.log('navbar:component update: teams',this.state.teams, nextState.teams);
        return true;
      }
      if (this.state.teams.length === nextState.teams.length) {
        for(var i = 0; i < nextState.teams.length; i++) {
          if (this.state.teams[i] !== nextState.teams[i]) {
            console.log('navbar:component update');
            return true;
          }
        }
      }

      
      // for (var i = 0; i < 5; i++) {
      //   chrome.storage.sync.get("basketballList", (result) => {
      //   if (!chrome.runtime.error) {
      //     var teams = result.basketballList;
      //     console.log(result.basketballList);
      //     if (teams.length !== this.state.previousteams.length) {
      //       console.log('new team selection is', teams)
      //       return true;
      //     } else {
      //       console.log('team selesction hasnot changed');
      //     }

      //   } else {
      //       console.log("ffffff");
      //   }
      // });
      // }
      console.log(nextProps);
      if (nextProps.name === "susan" && this.state.team === "") {
        console.log('gogogogogogo');
        this.setState({
          team:"dummy"
        })
        return true;
      }
      console.log('Navbar should not component update');
      return false;
    }    


}

Navbar.propTypes = {
  team: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Navbar;


