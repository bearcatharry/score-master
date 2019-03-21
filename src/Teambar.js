/*global chrome*/
import React, { Component } from 'react';
import PropTypes from "prop-types";

class Teambar extends Component {
    constructor() {
        super();
        this.state = {
            team: "",
        };
        this.teamClicked = this.teamClicked.bind(this);

    }

    teamClicked(e) {

        console.log('element clicked', e.target.className);
        console.log(e.target.alt);

    }

    render() {
        var teamLogo = this.props.teamLogo;
        var teamName = this.props.teamName;
        return(
            <img src={teamLogo} alt={teamName} className="fav-team col-2"
            onClick={(e) => this.teamClicked(e)}/>
        )
    }
}

Teambar.propTypes = {
  teamLogo: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired
};

export default Teambar;