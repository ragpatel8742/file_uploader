module { 

    public type StorageType = [Nat8];

    public type FileId = {
        fileName: Text;
    };

    public type FileData = {
        fileType: Text;
        data: StorageType;
    };

}