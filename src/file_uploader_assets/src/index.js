import { file_uploader } from "../../declarations/file_uploader";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with file_uploader actor, calling the greet method
  const greeting = await file_uploader.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
