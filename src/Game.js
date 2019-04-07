//
//  GAME
//––––––––––––––––––––––––––––––––––––––––––––––––––

import React, { Component } from "react";
import PropTypes from "prop-types";

import Team from "./Team";
import Dates from "./Date"
//
//  COMPONENT
//––––––––––––––––––––––––––––––––––––––––––––––––––

class Game extends Component {
  constructor() {
    super();

    // Bind the context.
    this.renderGame = this.renderGame.bind(this);
  }

  //
  //  RENDER GAME
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  renderGame(game) {
    // Game ID.
    // const { id: gameId } = game;

    // for now just implementing NBA league
    if (game) {
      // console.log('renderGame', game);
      let sport = "nba";
      let timeScore;
      // let gameStatusClass;
      // console.log('GAME',game);
      const status = game.status.type.state; // pre, in, post.

      // Get start date.
      const startDateString = game.competitions[0].startDate;
      const startDate = new Date( startDateString );

      const away = game.competitions[0].competitors[1];
      const home = game.competitions[0].competitors[0];
      const gameLink = game.links[0].href;

      const awayScore = parseInt(away.score, 10);
      const homeScore = parseInt(home.score, 10);
      let winner = "";
      // let game__status = ""
      
      // Get today's date.
      const today = new Date();

      // Get the current month.
      const currentMonth = today.getMonth();

      if (sport === "nba") { 
      // If it's July... (note that January is 0)
          if (currentMonth === 6) {
            sport = "nba-summer-league";
            // If it's any other month.
          } else {
            sport = "nba";
          }
      }
      

      // If game is yet to start.
      if (status === "pre") {
        winner = "";
        // gameStatusClass = "game--pre";

        // Use EST start time from API.
        timeScore = game.status.type.shortDetail;

        // Get the time without the day.
        // Original format: "10/21 - 8:30 PM EDT"
        timeScore = timeScore.substring(
          timeScore.indexOf(" - ") + 3,
          timeScore.length
        );

        // If game is live.
      } else if (status === "in") {
        winner = "";
        // gameStatusClass = "game--live";
        timeScore = game.status.type.shortDetail;

        // If game is over.
      } else if (status === "post") {
        // gameStatusClass = "game--post";
        timeScore = game.status.type.shortDetail;

        // If the home team is the winner.
        if (homeScore > awayScore) {
          // Set the home team as the winner.
          winner = "home";

          // If the away team is the winner.
        } else {
          // Set the away team as the winner.
          winner = "away";
        }
      }

      return (
        <div>
          <Dates activeDate={startDate}/>
          <a href={gameLink} class="a-games" target="_blank">
          <div className="row bg-light time">{timeScore}</div>
          <Team data={away} homeOrAway="away" winner={winner} status={status} />
          <Team data={home} homeOrAway="home" winner={winner} status={status} />
          </a>
        </div>
      );
    }
  }

  //
  //  RENDER
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  render() {

    const { game } = this.props;
    return (
        <div className="game col-12">{this.renderGame(game)}</div>
    );

  }
}

//
//  PROP TYPES
//––––––––––––––––––––––––––––––––––––––––––––––––––

Game.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Game;

