
class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL_POWER';
    this.generatorWatts = 110;
  }
 receiveMessage(message) {
    let modeChange = {completed: false};
    let move = {completed: false};
    let statusCheck = {completed: false};
    let results = [];

    for (let i=0; i<message.commands.length; i++) {
      if (message.commands[i].commandType === 'MODE_CHANGE') {
        this.mode = message.commands[i].value;
        modeChange.completed = true;
        results[i]= modeChange;
      }
      if (message.commands[i].commandType === 'MOVE' && this.mode === 'NORMAL_POWER') {
        this.position = message.commands[i].value;
        move.completed = true;
        results[i] = move; 
      } else if (message.commands[i].commandType === 'MOVE' && this.mode === 'LOW_POWER') {
          results[i] = move;
        }
      if (message.commands[i].commandType === 'STATUS_CHECK') {
        statusCheck.completed = true;
        results[i] = statusCheck;
      }
    }

    let roverStatus = {
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position
    };
    statusCheck.roverStatus = roverStatus;

    let response = {
      message: message.message,
      results: results
    }
    
    return response;
  }
}//------------------------------------------------------------

module.exports = Rover;

  
  