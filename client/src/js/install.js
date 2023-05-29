const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler for the `beforeinstallprompt` event
let deferPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (deferPrompt) {
    deferPrompt.prompt();

    const { outcome } = await deferPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("App installed successfully!");
    } else {
      console.log("Installation was canceled or rejected.");
    }

    deferPrompt = null;
  }
});

// TODO: Add an event handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed successfully!");
});
