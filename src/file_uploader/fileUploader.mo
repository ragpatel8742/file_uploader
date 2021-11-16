import Types "./Types";
import TrieMap "mo:base/TrieMap";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";

actor FileDataBase {
    
    public type FileId = Types.FileId;
    public type FileInfo = Types.FileInfo;
    public type ChunkData = Types.ChunkData;
    public type ChunkId = Types.ChunkId;
    public type StorageType = Types.StorageType;

    var FileInfo : TrieMap.TrieMap<FileId, FileInfo> = TrieMap.TrieMap<FileId, FileInfo>(Text.equal, Text.hash);
    var FileData : TrieMap.TrieMap<ChunkId, ChunkData> = TrieMap.TrieMap<ChunkId, ChunkData>(Text.equal, Text.hash);

    public func isNewFile(fileId : FileId) : async Bool {
        
        let result = FileInfo.get(fileId);
        switch(result) {
            case(null) {
                return true;
            };
            case(?result) {
                return false;
            };
        };
    };

    public func saveFileInfo(fileName_ : Text, fileType_ : Text, chunkCount_ : Nat) : async Bool {
        
        let fileInfo : FileInfo = {
            fileId = fileName_;
            fileName = fileName_;
            fileType = fileType_;
            chunkCount = chunkCount_;
        };
        FileInfo.put(fileName_, fileInfo);
        return true; 
    };
    
    public func saveChunkData(fileName_ : Text, chunkNumber_ : Nat, data_ : StorageType) : async Bool {
        
        let chunkData : ChunkData = {
            fileId = fileName_;
            chunkNumber = chunkNumber_;
            data = data_;
        };
        FileData.put(getChunkId(fileName_, chunkNumber_), chunkData);
        return true;
    };

    public func downloadFileInfo(fileName : Text) : async ?FileInfo {

        return FileInfo.get(fileName);
    };

    public func downloadChunkData(fileName : Text, chunkNumber : Nat) : async ?ChunkData {

        return FileData.get(getChunkId(fileName, chunkNumber));
    };

    private func getChunkId(fileName : Text, chunkNumber : Nat) : Text {
        
        return fileName # "_" # Nat.toText(chunkNumber);
    };

}