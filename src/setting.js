// Setting view
// For MVP1 only select teams in NBA
/*global chrome*/

import React, { Component } from 'react';
import * as data from './nbaTeams.json';
import Navbar from './Navbar';

class Selection extends Component {
  constructor() {
    super();

    let selectedTeams = [];
    // check the storage before restarting the chrome extension
      chrome.storage.sync.get("basketballList", (result) => {
        if (!chrome.runtime.error) {
          var teamnames = result.basketballList;
          if (teamnames === undefined || teamnames.length == 0) {
            // array empty or does not exist
            for (var i = 0; i < Object.keys(data).length-1; i++) {              
                selectedTeams.push(false);
            }
          } else {
            // user has selected a list of teamnames
            for (var i = 0; i < Object.keys(data).length-1; i++) {
              if (teamnames.includes(data[i].abbreviation)) {
                selectedTeams.push(true);
                // console.log('already existed!')
              } else {
                selectedTeams.push(false);
              }
            }
          }
          // console.log('previous teams are:',teamnames);

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
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.handleReStart = this.handleReStart.bind(this);


    // this.getTeams();
    // console.log(data[0].abbreviation);
  }
  forceUpdateHandler(){
    this.forceUpdate();
  };
  handleReStart() {
    // console.log(teamnames);
    // console.log(this.state);
    // this.setState({team: teamnames[0]});
    // console.log(teamnames);
    // console.log(this.state);
    // this.getGames(this.state.team);
    // this.forceUpdateHandler();
    console.log("restart, show previous selected");
}
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
    chrome.storage.sync.set({"basketballList": listOfObjects}, (result) => {
      // Notify that we saved.
      // console.log("Basketball list added");
    });
    chrome.storage.sync.set({"select": 1}, (result) => {
        console.log('select a team already:' ,1);
    });
    for (i = 0; i < 1; i++) {}
    // console.log('update list:', listOfObjects);
    
    
    
  });
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
          {data[i].abbreviation}
          <input
            // name={`make-${index}`}
            data-indexnumber = {i}
            type="checkbox"
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


showSelected() {
    var indents = [];
    var select_value;
    var teamnames;
    chrome.storage.sync.get("basketballList", (result) => {
      if (!chrome.runtime.error) {
        console.log(result);
        teamnames = result.basketballList;
        console.log('Teams have been selected');
        this.setState({
        isSelected: true,
        }, this.handleRestart)
      } else {
        console.log('not found select');   

      }
    })
    if (this.state.isSelected === true) {
      for (var i = 0; i < this.state.selectedTeams.length; i++) {
        indents.push(<div>{this.state.selectedTeams[i]}</div>);
      }

    } else {
          chrome.storage.onChanged.addListener((changes, area) => {
        if (area == "sync" && "basketballList" in changes) {
            var teamnames = changes.basketballList.newValue;
            // console.log('the updated teams are: ',teamnames);
            for (var i = 0; i < this.state.selectedTeams.length; i++) {
                indents.push(<div>{this.state.selectedTeams[i]}</div>);
              }
          }
       
      });

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
  // shouldComponentUpdate(nextState) {
  //     if (this.state.selectedTeams.length !== nextState.selectedTeams.length) {
  //       console.log('component update, teams',nextState.teams);
  //       return true;
  //     } else {
  //       console.log('setting component does not update');
  //       return false;
  //     }
  //     // if (this.state.teams.length === nextState.teams.length) {
  //     //   for(var i = 0; i < nextState.teams.length; i++) {
  //     //     if (this.state.teams[i] !== nextState.teams[i]) {
  //     //       console.log('component update, teams',this.state.teams, nextState.teams);
  //     //       return true;
  //     //     }
  //     //   }
  //     // }
      
  // }

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


export default Selection;