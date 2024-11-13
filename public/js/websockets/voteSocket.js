const socket = new WebSocket('ws://localhost:3000');

socket.onmessage = function(event) {
  const data = JSON.parse(event.data);
  if (data.type === "voteUpdate") {
    const voteCountElement = document.querySelector(`#vote-count-${data.targetType}-${data.targetId}`);
    if (voteCountElement) {
      voteCountElement.innerText = data.voteCount;
    }
  }
};
