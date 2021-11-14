import { file_uploader } from "../../declarations/file_uploader";

const b64toUInt8 = (b64Data, contentType='', sliceSize=512) => {
      
  const byteCharacters = atob(b64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return Array.from(new Uint8Array(byteNumbers));
}

function saveByteArray(fileName, byte) {
  var blob = new Blob(byte);
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

document.getElementById("uploadButton").addEventListener("click", async() => {
  const file = document.getElementById("uploadFile").files[0];
  const fileName = file.name;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    if (reader.result === null) {
      throw new Error('file empty...');
    }
    let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
      encoded += '='.repeat(4 - (encoded.length % 4));
    }
    const UInt8 = b64toUInt8(encoded, file.type);
    var status = await file_uploader.saveFile(fileName, UInt8);
    if(status) {
      window.alert("Your file named: " + fileName + " uploaded successfully!");
    } else {
      window.alert("A file named: " + fileName + " already exist!");
    }
  };  
});

document.getElementById("downloadButton").addEventListener("click", async() => {
  const fileName = document.getElementById("downloadFile").value;
  const UInt8 = await file_uploader.downloadFile(fileName);
  saveByteArray(fileName, Array.from(UInt8));
});