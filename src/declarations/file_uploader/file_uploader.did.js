export const idlFactory = ({ IDL }) => {
  const StorageType__1 = IDL.Vec(IDL.Nat8);
  const FileData = IDL.Record({
    'data' : StorageType__1,
    'fileType' : IDL.Text,
  });
  const StorageType = IDL.Vec(IDL.Nat8);
  return IDL.Service({
    'downloadFile' : IDL.Func([IDL.Text], [IDL.Opt(FileData)], []),
    'saveFile' : IDL.Func([IDL.Text, IDL.Text, StorageType], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
