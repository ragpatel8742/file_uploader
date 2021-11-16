import type { Principal } from '@dfinity/principal';
export interface FileData { 'data' : StorageType__1, 'fileType' : string }
export type StorageType = Array<number>;
export type StorageType__1 = Array<number>;
export interface _SERVICE {
  'downloadFile' : (arg_0: string) => Promise<[] | [FileData]>,
  'saveFile' : (arg_0: string, arg_1: string, arg_2: StorageType) => Promise<
      boolean
    >,
}
