import React, { Component } from 'react';
import { getTodayDate, createPastDates, createFutureDates }  from './Date';
// import DatesNav from "./Date";
import Games from './Games'
import michigan from './images/michigan.png';

class App extends Component {

  constructor() {
    super();

    this.getGames = this.getGames.bind(this);
    this.getScore = this.getScore.bind(this);
    const activeDate = getTodayDate().estString;
    // const score = this.getScore();


    // Get initial state.
    this.state = {
      activeDate: activeDate,
      games: [],
      noGames: false,
      team: "Houston Rockets"
    };

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
        let gameName = tmpGames[j].name;
        if (gameName.includes(this.state.team)) {
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
        let gameName = tmpGames[j].name;
        if (gameName.includes(this.state.team)) {
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


  getScore() {
    let homeScore;
    let url;
    url = "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?lang=en&calendartype=blacklist&limit=100&dates=20190213";
    let home;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        // console.log(response);

        let games = response.events;

        let home = games[6].competitions[0].competitors[0];

        homeScore = parseInt(home.score, 10);

        console.log(homeScore);

        this.setState({
            score: homeScore
        });
      });
      console.log(this.state.score);
  }

  //
  //  COMPONENT WILL MOUNT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  componentWillMount() {
    // Get games for activeDate.
    this.getGames(this.state.activeDate);
  }

  render() {
    return (
      <div id="games" className="c">
        <Games
          activeDate={this.state.activeDate}
          games={this.state.games}
          noGames={this.state.noGames}
        />
      </div>
    );
  }
}


export default App;