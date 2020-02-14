import openSocket from "socket.io-client";
const config = require("../config");
const conmmands = require("./commands");
const events = require("./events");

const socket = openSocket(
  `http://${config.socketIoServiceHost}:${config.vedaasSocketServicePort}`
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

  console.log(` ${conmmands.SendEntity} -   ${JSON.stringify(entity)}`);
  socket.emit(conmmands.SendEntity, entity);
}

export { subscribeToEntityReceived, pushEntity };
