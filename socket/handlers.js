const { createDevice, processCommand, getPrompt } = require("../simulator");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    let device = createDevice();

    socket.emit("device:state", device);
    socket.emit("output", [{ t:"info", v:"Connected. Type ? for help." }]);

    socket.on("command", (cmd) => {
      const { output, device: newDevice } = processCommand(device, cmd);
      device = newDevice;
      socket.emit("output", output);
      socket.emit("prompt", getPrompt(device));
      socket.emit("device:state", device);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
