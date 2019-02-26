// Setting view
// For MVP1 only select teams in NBA
import React, { Component } from 'react';
import * as data from './nbaTeams.json';


class Selection extends Component {
  constructor() {
  	super();

  	let selectedTeams = [];

  	for (var i = 0; i < Object.keys(data).length - 1; i++) {
  		selectedTeams.push(false);
	}

  	this.state = {
      selectedTeams: selectedTeams, //index of selected teams
      selectedTeamNames: [],
      isSelected: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    // this.getTeams();
    // console.log(data[0].abbreviation);
  }

  handleInputChange(event, i) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    const selectedIndex = event.target.dataset.indexnumber

    console.log(value);
    console.log(selectedIndex);

    let selectedTeams = this.state.selectedTeams;
  	selectedTeams[selectedIndex] = value;


  	let selectedTeamNames = [];
  	for (var i = 0; i < Object.keys(data).length - 1; i++){
  		if (selectedTeams[i]){
  			selectedTeamNames.push(data[i].abbreviation);
  		}
  	}

  	this.setState({
    	selectedTeams: selectedTeams,
    	selectedTeamNames: selectedTeamNames
  	});


    // this.setState({
    //   selectedTeams[selectedIndex] : value
    // });
  }

  getAllTeams(){
  	var indents = [];

	for (var i = 0; i < Object.keys(data).length - 1; i++) {
  		indents.push(<form className='indent' key={i}>
  		<label>
          {data[i].abbreviation}
          <input
            // name={`make-${index}`}
            data-indexnumber = {i}
            type="checkbox"
            checked={this.state.selectedTeams[i]}
            onChange={this.handleInputChange } />
        </label>
        <br />
      </form>);
	}

	return indents;
  }

  showSelected(){

  	var indents = [];

  	console.log(this.state);


	for (var i = 0; i < this.state.selectedTeamNames.length; i++) {
  		indents.push(<div>{this.state.selectedTeamNames[i]}</div>);
	}

	return indents;

  }

  // render() {
  //   return (
  //     <form>
  //       <label>
          
  //         <input
  //           name="isGoing"
  //           type="checkbox"
  //           checked={this.state.isGoing}
  //           onChange={this.handleInputChange} />
  //       </label>
  //       <br />
  //       <label>
  //         Number of guests:
  //         <input
  //           name="numberOfGuests"
  //           type="number"
  //           value={this.state.numberOfGuests}
  //           onChange={this.handleInputChange} />
  //       </label>
  //     </form>
  //   );
  // }

  render() {

    return (
    	<div>
    	{this.showSelected()}
    	{this.getAllTeams()}
    	</div>
    	); 
	}

}

export default Selection;