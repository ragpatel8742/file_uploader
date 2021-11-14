import type { Principal } from '@dfinity/principal';
export type Error = { 'NotFound' : null };
export type Result = { 'ok' : Array<number> } |
  { 'err' : Error };
export interface _SERVICE {
  'downloadFile' : (arg_0: string) => Promise<Result>,
  'saveFile' : (arg_0: string, arg_1: Array<number>) => Promise<boolean>,
}
