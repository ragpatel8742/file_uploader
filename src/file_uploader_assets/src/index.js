import { file_uploader } from "../../declarations/file_uploader";

function saveByteArray(fileName, byteArray, fileType) {
  var blob = new Blob(byteArray, { type: fileType });
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

document.getElementById("uploadFile").addEventListener("change", async() => {
  const file = document.getElementById("uploadFile").files[0];
  const fileName = file.name;
  const fileType = file.type;
  const buffer = await file.arrayBuffer();
  const nat8Array = Array.from(new Uint8Array(buffer));
  document.getElementById("uploadButton").addEventListener("click", async() => {
    const status = await file_uploader.saveFile(fileName, fileType, nat8Array);
    console.log(status);
    if(status) {
      window.alert("Your file named '" + fileName + "' uploaded successfully!");
    } else {
      window.alert("A file named '" + fileName + "' already exist!");
    }
  });
});

document.getElementById("downloadButton").addEventListener("click", async() => {
  const fileName = document.getElementById("downloadFile").value;
  const fileData = await file_uploader.downloadFile(fileName);
  const nat8Array = new Uint8Array(fileData[0]['data']);
  saveByteArray(fileName, [nat8Array], fileData[0]['fileType']);
});