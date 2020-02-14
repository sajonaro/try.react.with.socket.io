const config = require("./config.js");
const events = require("./events.js");
const commands = require("./commands.js");

//VEDaaS socket
const vedaasSocketServer = require("socket.io")();
vedaasSocketServer.origins("*:*");
//OEM socket
const oemSocketServer = require("socket.io")();
oemSocketServer.origins("*:*");

vedaasSocketServer.on("connection", socket => {
  socket.on(events.EntityReceived, entity => {
    console.log(
      "VEDaaS sent following entity to OEM :",
      JSON.stringify(entity)
    );

    oemSocketServer.emit(commands.SendEntity, JSON.stringify(entity));
  });
});

oemSocketServer.on("connection", socket => {
  socket.on(events.EntityReceived, entity => {
    console.log(
      "OEM sent following entity to VEDaaS :",
      JSON.stringify(entity)
    );
    vedaasSocketServer.emit(commands.SendEntity, JSON.stringify(entity));
  });
});

oemSocketServer.listen(config.oemSocketServicePort);
vedaasSocketServer.listen(config.vedaasSocketServicePort);
console.log(
  "VEdaaS socket service is listening on port ",
  config.vedaasSocketServicePort
);
console.log(
  "OEM socket service is listening on port ",
  config.oemSocketServicePort
);
