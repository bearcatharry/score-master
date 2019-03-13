/*global chrome*/

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { getTodayDate, createPastDates, createFutureDates }  from './Date';
import Games from './Games'
var teamnames = [];

class App extends Component {

  constructor() {
    super();

    this.getGames = this.getGames.bind(this);
    this.getTeams = this.getTeams.bind(this);
    const activeDate = getTodayDate().estString;
    // const score = this.getScore();


    // Get initial state.
    this.state = {
      activeDate: activeDate,
      games: [],
      noGames: false,
      teams: [],
      team: ""
    };

  }

  getTeams(){
    // for (var i = 0; i < 1; i++) {}
    // chrome.storage.sync.get("basketballList", function (result) {
    //   if (!chrome.runtime.error) {
    //     // console.log("Succeed getting basketballList");
      
    //     teamnames = result.basketballList;
    //     // console.log(teamnames);
    //     // if (teamnames.length > 0) {
    //     // this.setState({
    //     //   teams: teamnames,
    //     //   team: teamnames[0]
    //     // })
    //     // console.log(this.state);
    //   }
    // });
    // for (i = 0; i < 1; i++) {}
    // // for (var i = 0; i < 10; i++) {}
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync" && "basketballList" in changes) {
        teamnames = changes.basketballList.newValue;
        var favTeam = this.state.team;
        if (this.state.team === "") {
          favTeam = teamnames[0]
        }

        if (teamnames.length > 0) {
          this.setState({
          teams: teamnames,
          team: favTeam
          })
          this.getGames(this.state.team);

        }
      }
      console.log('the updated teams are: ',teamnames);
      console.log(this.state);
    });

    
  }
  
  
  async getGames(team){
    // Get today's date.
    var today = new Date();
    var currentMonth = today.getMonth();

    let pastDates = createPastDates(getTodayDate());
    let futureDates = createFutureDates(getTodayDate());
    const pastGame = [];
    const futureGames = [];

    // Find most recent PAST game
    for (var i = 0; i < pastDates.length; i++) {
      let activeDate = pastDates[i].estString;
      let url;

      // If it's July... (note that January is 0)
      if (currentMonth === 6) {
        // Summer League API URL
        url =
          "http://site.api.espn.com/apis/site/v2/sports/basketball/nba-summer-league/scoreboard?lang=en&calendartype=blacklist&limit=100&league=nba-summer-las-vegas&dates=" +
          activeDate;

      // If it's not July
      } else {
        // NBA API URL.
        url =
          "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?lang=en&calendartype=blacklist&limit=100&dates=" +
          activeDate;
      }
      
      let res = await fetch(url);
      let json = await res.json();

      const tmpGames = json.events;
      for (var j = 0; j < tmpGames.length; j++) {
        let gameName = tmpGames[j].shortName;
        if (gameName.includes(team)) {
          pastGame.push(tmpGames[j]);
          break;
        }
      }
      if (pastGame.length === 1) {
        break;
      }   
    }

    // Find NEXT Games
    for (i = 0; i < futureDates.length; i++) {
      let activeDate = futureDates[i].estString;
      let url;
      // If it's July... (note that January is 0)
      if (currentMonth === 6) {
        // Summer League API URL
        url =
          "http://site.api.espn.com/apis/site/v2/sports/basketball/nba-summer-league/scoreboard?lang=en&calendartype=blacklist&limit=100&league=nba-summer-las-vegas&dates=" +
          activeDate;

      // If it's not July
      } else {
        // NBA API URL.
        url =
          "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?lang=en&calendartype=blacklist&limit=100&dates=" +
          activeDate;
      }
      let res = await fetch(url);
      let json = await res.json();

      const tmpGames = json.events;
      for (j = 0; j < tmpGames.length; j++) {
        let gameName = tmpGames[j].shortName;
        if (gameName.includes(team)) {
          futureGames.push(tmpGames[j]);
          break;
        }
      }

      if (futureGames.length === 2) {
        break;
      } 
    }


    var allGames = pastGame.concat(futureGames);
    if ((allGames.length) > 0) {
      // Search this team's game
      // Update state.
      this.setState({
        games: allGames,
        noGames: false
      });
      // If there are no games.
    } else {
      // Update state.
      this.setState({
        games: [],
        noGames: true
      });
    }
  }

  // This is not needed. Remember to delete
  // getScore() {
  //   let homeScore;
  //   let url;
  //   url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?lang=en&calendartype=blacklist&limit=100&dates=20190213";
  //   let home;

  //   fetch(url)
  //     .then(response => response.json())
  //     .then(response => {
  //       // console.log(response);

  //       let games = response.events;

  //       let home = games[6].competitions[0].competitors[0];

  //       homeScore = parseInt(home.score, 10);

  //       console.log(homeScore);

  //       this.setState({
  //           score: homeScore
  //       });
  //     });
  //     console.log(this.state.score);
  // }

  //
  //  COMPONENT WILL MOUNT
  //––––––––––––––––––––––––––––––––––––––––––––––––––
  componentWillMount() {
    this.getTeams();
    // this.getGames(this.state.team);
  }


  render() {
    return (
        <Games
          activeDate={this.state.activeDate}
          games={this.state.games}
          noGames={this.state.noGames}
        />
    );
  }
}

App.propTypes = {
  team: PropTypes.string.isRequired,
};

export default App;