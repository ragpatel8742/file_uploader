import Types "./Types";
import TrieMap "mo:base/TrieMap";
import Hash "mo:base/Hash";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";

actor FileDataBase {
    
    public type FileId = Types.FileId;
    public type FileData = Types.FileData;
    public type StorageType = Types.StorageType;

    private func isEqualFileId(fileId1 : FileId, fileId2 : FileId) : Bool{
        fileId1.fileName == fileId2.fileName
    };

    private func hashOfFileId(fileId : FileId) : Hash.Hash {
        Text.hash(fileId.fileName)
    };

    var Files : TrieMap.TrieMap<FileId, FileData> = TrieMap.TrieMap<FileId, FileData>(isEqualFileId, hashOfFileId);
    
    public func saveFile(fileName_ : Text, fileType_ : Text, data_ : StorageType) : async Bool {
        
        let fileId : FileId = {
            fileName = fileName_;
        };

        let fileData : FileData = {
            fileType = fileType_;
            data = data_;
        };
        
        if(isNewFile(fileId)) {
            Files.put(fileId, fileData);
            return true;
        };

        return false;
    };
    
    public func downloadFile(fileName_ : Text) : async ?FileData {

        let fileId : FileId = {
            fileName = fileName_;
        };

        let fileData = Files.get(fileId);

        switch(fileData) {
            case(null) {
                return null;
            };
            case(?fileData) {
                return ?fileData;
            };
        };
        
    };

    private func isNewFile(fileId : FileId) : Bool {
        
        let result = Files.get(fileId);

        switch(result) {
            case(null) {
                return true;
            };
            case(?result) {
                return false;
            };
        };
    };

}