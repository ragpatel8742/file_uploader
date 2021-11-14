export const idlFactory = ({ IDL }) => {
  const Error = IDL.Variant({ 'NotFound' : IDL.Null });
  const Result = IDL.Variant({ 'ok' : IDL.Vec(IDL.Nat8), 'err' : Error });
  return IDL.Service({
    'downloadFile' : IDL.Func([IDL.Text], [Result], []),
    'saveFile' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
