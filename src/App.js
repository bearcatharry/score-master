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
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.handleReStart = this.handleReStart.bind(this);
    this.render= this.render.bind(this);

  }
  forceUpdateHandler(){
    this.forceUpdate();
  };
  handleReStart(teamnames) {
    // console.log(teamnames);
    // console.log(this.state);
    this.setState({team: teamnames[0]});
    // console.log(teamnames);
    // console.log(this.state);
    this.getGames(this.state.team);
    this.forceUpdateHandler();
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

    var select_value;
    var teamnames;

    chrome.storage.sync.get('select', (result) => {
      if (!chrome.runtime.error) {
        console.log(result);
        select_value = result.select;
        console.log('Select Value currently is ' + result.select);
        if (select_value === 1) {
        console.log('Show selected team score ');
        chrome.storage.sync.get("basketballList", (result) => {
          if (!chrome.runtime.error) {
            teamnames = result.basketballList;
            // this.getGames(teamnames[0]);
            console.log('found basketball list');   
            this.handleReStart(teamnames);

          } else {
            console.log('not found basketball list');   
          }
        });
    }
      } else {
        console.log('not found select');   
      }
      
    });    
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "sync" && "basketballList" in changes) {
        teamnames = changes.basketballList.newValue;
        var favTeam = teamnames[0];
        // console.log('favTeam', favTeam);
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
      this.getGames(teamnames[0]);

    });

    
  }
  
  async getGames(team){
    console.log('getGames', this.state.team);
    // Get today's date.
    var today = new Date();
    var currentMonth = today.getMonth();

    let pastDates = createPastDates(getTodayDate());
    let futureDates = createFutureDates(getTodayDate());
    var pastGame = [];
    var futureGames = [];
    var allGames = [];
    if (team !== "") {
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
          let namesSplit = gameName.split(" ");
          if (namesSplit.includes(team)) {
            pastGame.push(tmpGames[j]);
            break;
          }
        }
        if (pastGame.length === 3) {
          pastGame.reverse();
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
          let namesSplit = gameName.split(" ");
          if (namesSplit.includes(team)) {
            futureGames.push(tmpGames[j]);
            break;
          }
        }

        if (futureGames.length === 2) {
          break;
        } 
      }
      allGames = pastGame.concat(futureGames);

    }
    else { 
      // find three games, no team has been selected
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
        for (j = 0; j < 3; j++) {
          futureGames.push(tmpGames[j]);
        }

        if (futureGames.length === 3) {
          break;
        } 
      }
      allGames = futureGames;

    }
    // console.log(team, allGames);
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

    // console.log(this.state.team);
  }


  componentWillMount() {
    // console.log('1component update, teams',this.state);
    chrome.storage.sync.get("basketballList", (result) => {
      if (!chrome.runtime.error) {
        var teams = result.basketballList;
        this.setState({
          team: teams[0]
        });
        // console.log(result);

      } else {
          console.log("ffffff");

      }
    });
    // console.log('2component update, teams',this.state);
    this.getTeams();
    this.getGames(this.state.team);
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