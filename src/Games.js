//
//  GAMES

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components.
import Game from './Game';


//
//  COMPONENT
//––––––––––––––––––––––––––––––––––––––––––––––––––
class Games extends Component {

  render() {

    return this.props.games.length ? (
      <div className="games">
        {
          Object.keys(this.props.games)
            .map(key => 
              <Game key={key} game={this.props.games[key]} />
            )
        }
        
      </div>
    ) : (
      <div className="no-games">
        No games available
      </div>
    )
  }

  // render() {
  //   return (
  //     <GamesPreloader />
  //   )
  // }
}


//
//  PROP TYPES
//––––––––––––––––––––––––––––––––––––––––––––––––––

Games.propTypes = {
  activeDate: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  noGames: PropTypes.bool.isRequired
}

export default Games;



// WEBPACK FOOTER //
// ./src/components/Games.js