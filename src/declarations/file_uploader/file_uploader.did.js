export const idlFactory = ({ IDL }) => {
  const StorageType__1 = IDL.Vec(IDL.Nat8);
  const FileId__1 = IDL.Text;
  const ChunkData = IDL.Record({
    'chunkNumber' : IDL.Nat,
    'data' : StorageType__1,
    'fileId' : FileId__1,
  });
  const FileInfo = IDL.Record({
    'fileName' : IDL.Text,
    'fileType' : IDL.Text,
    'fileId' : FileId__1,
    'chunkCount' : IDL.Nat,
  });
  const FileId = IDL.Text;
  const StorageType = IDL.Vec(IDL.Nat8);
  return IDL.Service({
    'downloadChunkData' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Opt(ChunkData)],
        [],
      ),
    'downloadFileInfo' : IDL.Func([IDL.Text], [IDL.Opt(FileInfo)], []),
    'isNewFile' : IDL.Func([FileId], [IDL.Bool], []),
    'saveChunkData' : IDL.Func(
        [IDL.Text, IDL.Nat, StorageType],
        [IDL.Bool],
        [],
      ),
    'saveFileInfo' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
