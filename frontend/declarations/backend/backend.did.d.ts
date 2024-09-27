import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'createdAt' : bigint,
  'author' : string,
}
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string, string], bigint>,
  'deletePost' : ActorMethod<[bigint], boolean>,
  'getAllPosts' : ActorMethod<[], Array<Post>>,
  'getPost' : ActorMethod<[bigint], [] | [Post]>,
  'updatePost' : ActorMethod<[bigint, string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
