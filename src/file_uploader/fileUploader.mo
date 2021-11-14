import TrieMap "mo:base/TrieMap";
import Hash "mo:base/Hash";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";

actor FileDataBase {
    
    private func isEqualFileId(fileId1 : FileId, fileId2 : FileId) : Bool{
        fileId1.name == fileId2.name
    };

    private func hashOfFileId(fileId : FileId) : Hash.Hash {
        Text.hash(fileId.name);
    };

    type FileId = {
        name: Text;
    };

    type Error = {
        #NotFound;
    };

    var Files : TrieMap.TrieMap<FileId, Blob> = TrieMap.TrieMap<FileId, Blob>(isEqualFileId, hashOfFileId);
    
    public func saveFile(fileName : Text, fileData : Blob) : async Bool {
        
        let fileId : FileId = {
            name = fileName;
        };
        
        if(isNewFile(fileId)) {
            Files.put(fileId, fileData);
            return true;
        };

        return false;
    };
    
    public func downloadFile(fileName : Text) : async Result.Result<Blob, Error> {

        let fileId : FileId = {
            name = fileName;
        };
        
        return Result.fromOption(Files.get(fileId), #NotFound);
    };

    private func isNewFile(fileId : FileId) : Bool {
        
        let result = Files.get(fileId);

        switch(result) {
            case(null) {
                return true;
            };
            case(fileId) {
                return false;
            };
        };
    };

}