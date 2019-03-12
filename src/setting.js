// Setting view
// For MVP1 only select teams in NBA
/*global chrome*/

import React, { Component } from 'react';
import * as data from './nbaTeams.json';

var teamnames = [];

class Selection extends Component {
  constructor() {
  	super();

  	let selectedTeams = [];

  	for (var i = 0; i < Object.keys(data).length-1; i++) {
  		selectedTeams.push(false);
	}

  	this.state = {
      selectedTeams: selectedTeams, //index of selected teams
      selectedTeamNames: [],
      isSelected: false,
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

    // console.log(value);
    // console.log(selectedIndex);

    let selectedTeams = this.state.selectedTeams;
  	selectedTeams[selectedIndex] = value;


  	let selectedTeamNames = [];
  	for (var i = 0; i < Object.keys(data).length-1; i++){
  		if (selectedTeams[i]){
  			selectedTeamNames.push(data[i].abbreviation);
  		}
  	}

  	this.setState({
    	selectedTeams: selectedTeams,
    	selectedTeamNames: selectedTeamNames
  	});
    var listOfObjects = [];
    var a = this.state.selectedTeamNames;
    // console.log(a);

    a.map(function(entry) {

    // var singleObj = {};
    // singleObj['name'] = entry;
    listOfObjects.push(entry);
    // console.log(entry)
    var i;
    for (i = 0; i < 1; i++) {}
      chrome.storage.sync.set({"basketballList": listOfObjects}, function() {
      // Notify that we saved.
      // console.log("Basketball list added");
    });
    for (i = 0; i < 1; i++) {}

    
    
    
});
    // var j;
    // for (j = 0; j < 1; j++) {
    //   chrome.storage.sync.get("basketballList", function (result) {
    //     if (!chrome.runtime.error) {
    //       // console.log("Succeed getting basketballList");
    //       // console.log(result);

    //     } else {
    //               console.log("ffffff");

    //     }

    //     // result is the stored list
    // });
    // }
    



    // // this.setState({
    // //   selectedTeams[selectedIndex] : value
    // // });
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


 //  console.log(this.state);
 //  for (var i = 0; i < this.state.selectedTeamNames; i++) {
 //                indents.push(<div>{this.state.selectedTeamNames}</div>);
 //  }
 //  // var listNames = []


	

	// return indents;

 //  }
showSelected(){

    var indents = [];

  for (var i = 0; i < this.state.selectedTeamNames.length; i++) {
      indents.push(<div>{this.state.selectedTeamNames[i]}</div>);
   }
  var i = 0;
  var teamnames = [];
  for (i = 0; i < 1; i++) {}
  chrome.storage.sync.get("basketballList", function (result) {
          if (!chrome.runtime.error) {
            // console.log("Succeed getting basketballList");
          
          teamnames = result.basketballList;
          // console.log(teamnames);
          var name;
          for (var j = 0; j < teamnames.length; j++) {
            name = teamnames[j];
            indents.push(<div>{name}</div>);
          }

          // console.log(teamnames.length);


          }
  });
  for (i = 0; i < 1; i++) {}
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