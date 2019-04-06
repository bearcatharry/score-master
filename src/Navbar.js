/*global chrome*/
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Teambar from './Teambar';

class Navbar extends React.PureComponent {
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

    }
    // url example
    // "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/cavs.png"
    renderTeams() {
      // console.log('render',this.state);
      var logos = [];
      var newteams = [];
      var url = "https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/";
      // chrome.storage.sync.get("basketballList", (result) => {
      //   if (!chrome.runtime.error) {
      //     var oldteams = this.state.teams;
      //     newteams = result.basketballList;
      //       this.setState({
      //         teams: newteams
      //       });
          
      //     // //console.log(result);

      //   } else {
      //       //console.log("ffffff");

      //   }
      // });
      // map team name with team logo url 
      if (this.props.team) {
          // console.log("props is:",this.props.team);
          var new_team = this.props.team;

          for (var i = 0; i < this.props.team.length; i++) {
            var teamLogo = url + this.props.team[i] + '.png';
            // var teamName = this.state.teams[i];
            logos.push(teamLogo)
          }
          // console.log("props done");
      } 
    return this.props.team.length ? (
      <div className="teams">
        {
          Object.keys(this.props.team).map((key, index) => 
            index ? 
              <Teambar key={key} teamName={this.props.team[key]} teamLogo={logos[key]}  formatName = {"fav-team col-2 btn btn-outline-secondary"} teamNames = {this.props.team}/>
              :
              <Teambar key={key} teamName={this.props.team[key]} teamLogo={logos[key]}  formatName = {"fav-team-selected col-2 btn btn-outline-secondary"} teamNames = {this.props.team}/>
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
      // //console.log('render team!!!')
      return this.renderTeams();
    }  
}

Navbar.propTypes = {
  team: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Navbar;


