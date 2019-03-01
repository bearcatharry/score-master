import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentTz from 'moment-timezone';

//  COMPONENT
class Dates extends Component {
  
  //  RENDER
  render() {

    const activeDate = this.props.activeDate;
    const timeScore = this.props.status;

    const dateDisplay = getDateDisplay(activeDate);
    // timeScore = getTimeDisplay(activeDate);

    return(
      <div className="datetime">
        <div className="row date">{dateDisplay}</div>
        <div className="row bg-light time">{timeScore}</div>
      </div>
    );
    // return (
    //   <nav className="dates-nav">
    //     <ul className="dates-nav__list">
    //       {Object.keys(dates).map(this.renderDate)}
    //     </ul>
    //   </nav>
    // );
  }
}


//
//  PROP TYPES
//––––––––––––––––––––––––––––––––––––––––––––––––––

Dates.propTypes = {
  activeDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
//   updateDate: PropTypes.func.isRequired
}

export default Dates;



//  GET TODAY'S DATE
export function getTodayDate() {

  var thisDate = {};

  // Local times.
  var localNow = new Date();
  localNow.setDate( localNow.getDate() );
  thisDate.local = localNow;
  thisDate.localString = getDateString( localNow );
  thisDate.localDisplay = getDateDisplay( localNow );

  // EST times.
  var estNow = getEstToday();
  estNow.setDate( estNow.getDate());
  thisDate.est = estNow;
  thisDate.estString = getDateString( estNow );
  thisDate.estDisplay = getDateDisplay( estNow );

  return thisDate;
} // getTodayDate()


export function addDays(date, days) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}


//  CREATE PAST DATES
export function createPastDates( date ) {
  const dates = [];
  var dateString = date.estString;
  // month is zero-indexed
  var currentMonth = parseInt(dateString.slice(4,6) - 1);
  var currentYear = parseInt(dateString.slice(0,4));
  var currentDay = parseInt(dateString.slice(6,8));
  var lastMonth = currentMonth - 1;
  var lastYear = currentYear;
  if (lastMonth === -1) {
    lastMonth = 12;
    lastYear = currentYear - 1;
  }

  var currentDate = new Date(lastYear, lastMonth, currentDay)
  var endDate = new Date(currentYear, currentMonth, currentDay)
  while (currentDate < endDate) {
    // Local times.
    var thisDate = {};

    var pastDate = new Date(currentDate);
    pastDate.setDate( pastDate.getDate() );
    thisDate.local = pastDate;
    thisDate.localString = getDateString( pastDate );
    thisDate.localDisplay = getDateDisplay( pastDate );

    // EST times.
    var estPast = getEstDate(pastDate);
    estPast.setDate( estPast.getDate());
    thisDate.est = estPast;
    thisDate.estString = getDateString( estPast );
    thisDate.estDisplay = getDateDisplay( estPast );
    dates.push(thisDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates.reverse();
}

// CREATE FUTURE DATES
export function createFutureDates( date ) {
  const dates = [];
  var dateString = date.estString;
  var currentDay = parseInt(dateString.slice(6,8));
  var currentMonth = parseInt(dateString.slice(4,6) - 1);
  var currentYear = parseInt(dateString.slice(0,4));
  var nextMonth = currentMonth + 1;
  var nextYear = currentYear;
  if (nextMonth >= 12) {
    nextMonth = 1;
    nextYear = currentYear + 1;
  }

  var currentDate = new Date(currentYear, currentMonth, currentDay)
  var endDate = new Date(nextYear, nextMonth, currentDay)

  while (currentDate <= endDate) {
    // Local times.
    var thisDate = {};

    var futureDate = new Date(currentDate);
    futureDate.setDate( futureDate.getDate() );
    thisDate.local = futureDate;
    thisDate.localString = getDateString( futureDate );
    thisDate.localDisplay = getDateDisplay( futureDate );

    // EST times.
    var estFuture = getEstDate(futureDate);
    estFuture.setDate( estFuture.getDate());
    thisDate.est = estFuture;
    thisDate.estString = getDateString( estFuture );
    thisDate.estDisplay = getDateDisplay( estFuture );

    dates.push(thisDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;

}


//  GET EST TODAY
export function getEstToday() {

  // Get equivalent EST time.
  // https://stackoverflow.com/questions/9070604/how-to-convert-datetime-from-the-users-timezone-to-est-in-javascript

  // EST offset.
  var offset;

  // If NY is in daylight savings time (uses moment.js).
  if ( momentTz.tz('America/New_York').isDST() ) {
    offset = -4.0;
  // If NY is NOT in daylight savings time.
  } else {
    offset = -5.0;
  }

  var clientDate = new Date();
  var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
  var estToday = new Date(utc + (3600000*offset));
  return estToday;
} // getEstToday()


//  GET EST TODAY
export function getEstDate(date) {

  // Get equivalent EST time.
  // https://stackoverflow.com/questions/9070604/how-to-convert-datetime-from-the-users-timezone-to-est-in-javascript

  // EST offset.
  var offset;

  // If NY is in daylight savings time (uses moment.js).
  if ( momentTz.tz('America/New_York').isDST() ) {
    offset = -4.0;
  // If NY is NOT in daylight savings time.
  } else {
    offset = -5.0;
  }

  var clientDate = new Date(date);
  var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
  var estDate = new Date(utc + (3600000*offset));
  return estDate;
} // getEstDate()

//  GET DATE STRING
export function getDateString( date ) {

  var dd = date.getDate();
  var mm = date.getMonth();
  var yyyy = date.getFullYear();

  mm = parseInt(mm, 10) + 1; // January is 0!

  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  }

  date = yyyy + '' + mm + '' + dd;

  return date;
} // getDateString()


//
//  GET DATE DISPLAY
//––––––––––––––––––––––––––––––––––––––––––––––––––

export function getDateDisplay( date ) {

  var dateDisplay;
  var day = date.getDate();

  var monthNames = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'May', 
    'Jun', 
    'Jul', 
    'Aug', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dec'
  ];

  var month = date.getMonth();
  var monthDisplay = monthNames[ month ];

  dateDisplay = monthDisplay + ' ' + day;
  return dateDisplay;
} // getDateDisplay


//  GET TIME DISPLAY
export function getTimeDisplay( date ) {

  var timeDisplay = '';
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var amOrPm;

  // Hours
  if ( hours < 12 ) {
    amOrPm = 'AM';
  
  } else if (hours === 12) {
    amOrPm = 'PM';

  } else {
    hours = hours - 12;
    amOrPm = 'PM';
  }

  timeDisplay += hours;
  timeDisplay += ':';
  // Minutes.
  if ( minutes === 0 ) {
    minutes = minutes + '' + 0;
  }
  timeDisplay += minutes;

  // AM or PM.
  timeDisplay += ' ' + amOrPm;

  return timeDisplay;
}



// WEBPACK FOOTER //
// ./src/date-helpers.js