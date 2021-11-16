import { file_uploader } from "../../declarations/file_uploader";
const MAX_CHUNK_SIZE = 1024 * 500;

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

  var isNewFile = await file_uploader.isNewFile(fileName);
  if(isNewFile) {
    await saveFile(file, fileName, fileType);
    window.alert("Your file named '" + fileName + "' uploaded successfully!");
  } else {
    window.alert("A file named '" + fileName + "' already exist!"); 
  }
});

async function saveFile(file, fileName, fileType) {
  const buffer = await file.arrayBuffer();
  let chunkNumber = 1;
  let chunkPromises = [];
  for(let startByte = 0; startByte < file.size; startByte += MAX_CHUNK_SIZE, chunkNumber++) {
    chunkPromises.push(uploadChunk(buffer, startByte, fileName, file.size, chunkNumber));
  }
  await Promise.all(chunkPromises);
  await file_uploader.saveFileInfo(fileName, fileType, chunkNumber);
};

async function uploadChunk(buffer, startByte, fileName, fileSize, chunkNumber) {
  const bufferChunk = buffer.slice(startByte, Math.min(fileSize, startByte + MAX_CHUNK_SIZE));
  const bufferNat8Array = Array.from(new Uint8Array(bufferChunk));
  return await file_uploader.saveChunkData(fileName, chunkNumber, bufferNat8Array);
}

document.getElementById("downloadButton").addEventListener("click", async() => {
  const fileName = document.getElementById("downloadFile").value;
  
  var isFilePresent = await file_uploader.isNewFile(fileName);
  if(!isFilePresent) {
    await downloadFile(fileName);
  } else {
    window.alert("Your file named '" + fileName + "' does not exist!");
  }
});

async function downloadFile(fileName) {
  const fileInfo = await file_uploader.downloadFileInfo(fileName);
  const fileType = fileInfo[0]['fileType'];
  const chunkCount = fileInfo[0]['chunkCount'];
  let chunkPromises = [];
  let buffer = Array();
  for(let chunkNumber = 1; chunkNumber < chunkCount; chunkNumber++) {
    chunkPromises.push(file_uploader.downloadChunkData(fileName, chunkNumber));
  }
  await Promise.all(chunkPromises).then(chunkDatas => {
    chunkDatas.map(chunkData => {
      buffer = buffer.concat(chunkData[0]['data']);
    });
  });
  const nat8Array = new Uint8Array(buffer);
  saveByteArray(fileName, [nat8Array], fileType);
}