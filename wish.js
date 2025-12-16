const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', function(event) {
  event.preventDefault();

  const timestamp = new Date().toLocaleString();

  alert("Your wish is being carried by a star!✨\nTimestamp: " + timestamp);

  window.location.href = sendBtn.href;
});