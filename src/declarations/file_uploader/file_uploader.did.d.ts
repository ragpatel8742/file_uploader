import type { Principal } from '@dfinity/principal';
export interface ChunkData {
  'chunkNumber' : bigint,
  'data' : StorageType__1,
  'fileId' : FileId__1,
}
export type FileId = string;
export type FileId__1 = string;
export interface FileInfo {
  'fileName' : string,
  'fileType' : string,
  'fileId' : FileId__1,
  'chunkCount' : bigint,
}
export type StorageType = Array<number>;
export type StorageType__1 = Array<number>;
export interface _SERVICE {
  'downloadChunkData' : (arg_0: string, arg_1: bigint) => Promise<
      [] | [ChunkData]
    >,
  'downloadFileInfo' : (arg_0: string) => Promise<[] | [FileInfo]>,
  'isNewFile' : (arg_0: FileId) => Promise<boolean>,
  'saveChunkData' : (
      arg_0: string,
      arg_1: bigint,
      arg_2: StorageType,
    ) => Promise<boolean>,
  'saveFileInfo' : (arg_0: string, arg_1: string, arg_2: bigint) => Promise<
      boolean
    >,
}
