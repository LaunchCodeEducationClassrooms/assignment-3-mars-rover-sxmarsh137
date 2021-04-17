class Message {
  constructor(name,commands) {
    this.message = name;
     if (!name) {
       throw Error("Message name required.");
     }
    this.commands = commands;
  }
}

module.exports = Message;