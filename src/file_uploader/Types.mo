module { 

    public type FileId = Text;
    public type StorageType = [Nat8];
    public type ChunkId = Text;

    public type FileInfo = {
        fileId: FileId;
        fileName: Text;
        fileType: Text;
        chunkCount: Nat;
    };

    public type ChunkData = {
        fileId: FileId;
        chunkNumber: Nat;
        data: StorageType;
    };

}