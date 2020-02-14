import openSocket from "socket.io-client";
const config = require("./config");
const commands = require("./commands");
const events = require("./events");

const socket = openSocket(
  `http://${config.socketIoServiceHost}:${config.oemSocketServicePort}`
);

function subscribeToEntityReceived(callback) {
  socket.on(events.EntityReceived, entity => callback(entity));
}

function pushEntity(entity) {
  console.log(
    ` socket ${socket.id} is  ${
      socket.connected ? "connected" : "disconnected"
    }`
  );

  console.log(JSON.stringify(entity));
  socket.emit(commands.SendEntity, entity);
}

export { subscribeToEntityReceived, pushEntity };
