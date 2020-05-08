const socket = io("http://localhost:9000");
const socket2 = io("http://localhost:9000/admin");

console.log(socket.io);
socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from the Client!" });
});

socket.on('joined', msg => {
  console.log(msg)
})

socket2.on("welcome", (data) => {
  console.log(data);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});
