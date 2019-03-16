// Setting view
// For MVP1 only select teams in NBA
<<<<<<< HEAD
=======
/*global chrome*/

>>>>>>> master
import React, { Component } from 'react';
import * as data from './nbaTeams.json';


class Selection extends Component {
  constructor() {
<<<<<<< HEAD
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
=======
    super();

    let selectedTeams = [];
    // check the storage before restarting the chrome extension
      chrome.storage.sync.get("basketballList", function (result) {
        if (!chrome.runtime.error) {
          var teamnames = result.basketballList;
          // console.log('previous teams are:',teamnames);
          for (var i = 0; i < Object.keys(data).length-1; i++) {
            if (teamnames.includes(data[i].abbreviation)) {
              selectedTeams.push(true);
              // console.log('already existed!')
            } else {
              selectedTeams.push(false);

            }
          }

        } else {
                  console.log("ffffff");

        }

        // result is the stored list
      });
    for (var i = 0; i < 1; i++) {}


    this.state = {
      selectedTeams: selectedTeams, //index of selected teams
      selectedTeamNames: [],
      isSelected: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
>>>>>>> master

    // this.getTeams();
    // console.log(data[0].abbreviation);
  }
<<<<<<< HEAD

=======
  handleUpdate () {
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
    // console.log('update list:', listOfObjects);
    
    
    
  });
}
>>>>>>> master
  handleInputChange(event, i) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    const selectedIndex = event.target.dataset.indexnumber

    // console.log(value);
    // console.log(selectedIndex);

    let selectedTeams = this.state.selectedTeams;
<<<<<<< HEAD
  	selectedTeams[selectedIndex] = value;


  	let selectedTeamNames = [];
  	for (var i = 0; i < Object.keys(data).length - 1; i++){
  		if (selectedTeams[i]){
  			selectedTeamNames.push(data[i].abbreviation);
  		}
  	}

  	// console.log(Object.keys(data).length - 1);
  	console.log("in handleinput", this.state);
  	//console.log(this.state.selectedTeamNames);

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
=======
    selectedTeams[selectedIndex] = value;


    let selectedTeamNames = [];
    for (var i = 0; i < Object.keys(data).length-1; i++){
      if (selectedTeams[i]){
        selectedTeamNames.push(data[i].abbreviation);
      }
    }
    var listOfObjects = [];
    this.setState({
      selectedTeams: selectedTeams,
      selectedTeamNames: selectedTeamNames}, this.handleUpdate)
}
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
  

  getAllTeams(){
    var indents = [];

  for (var i = 0; i < Object.keys(data).length - 1; i++) {
      indents.push(<form className='indent' key={i}>
      <label>
>>>>>>> master
          {data[i].abbreviation}
          <input
            // name={`make-${index}`}
            data-indexnumber = {i}
            type="checkbox"
<<<<<<< HEAD
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

  	console.log("in show", this.state);


	for (var i = 0; i < this.state.selectedTeamNames.length; i++) {
  		indents.push(<div>{this.state.selectedTeamNames[i]}</div>);
	}

	return indents;

  }

=======
            onChange={this.handleInputChange }
            checked={this.state.selectedTeams[i]} />
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
  // teamSel = [];
  //  chrome.storage.onChanged.addListener((changes, area) => {
  //     if (area == "sync" && "basketballList" in changes) {
  //         var teamnames = changes.basketballList.newValue;
  //         // console.log('the updated teams are: ',teamnames);
  //         for (var i = 0; i < teamnames.length; i++) {
  //             indents.push(<div>{teamnames[i]}</div>);
  //             teamSel.push(teamnames[i])
  //           }
  //       }
     
  //   });
  
  
  return indents;

  }


>>>>>>> master
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

<<<<<<< HEAD
  render() {

    return (
    	<div>
    	{this.showSelected()}
    	{this.getAllTeams()}
    	</div>
    	); 
	}

}

=======

  render() {

    return (
      <div>
        {this.showSelected()}
        {this.getAllTeams()}
        <button type="button" id="done" class="btn btn-primary">Done</button>

      </div>
      ); 
  }

}


>>>>>>> master
export default Selection;