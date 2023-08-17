/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query seeFeed {\n    seeFeed {\n      ok\n      error\n      photos {\n        id\n        file\n        caption\n        likes\n        commentCount\n        createdAt\n        isMine\n        isLiked\n        user {\n          id\n          username\n          avatar\n        }\n        comments {\n          id\n          payload\n          isMine\n          createdAt\n          user {\n            username\n            avatar\n          }\n        }\n      }\n    }\n  }\n": types.SeeFeedDocument,
    "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String!\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation deleteComment($id: Int!) {\n    deleteComment(id: $id) {\n      ok\n      error\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  mutation createComment($photoId: Int!, $payload: String!) {\n    createComment(photoId: $photoId, payload: $payload) {\n      ok\n      error\n      id\n    }\n  }\n": types.CreateCommentDocument,
    "\n          fragment BSName on Comment {\n            id\n            payload\n            isMine\n            createdAt\n            user {\n              username\n              avatar\n            }\n          }\n        ": types.BsNameFragmentDoc,
    "\n  mutation toggleLike($id: Int!) {\n    toggleLike(id: $id) {\n      ok\n      error\n    }\n  }\n": types.ToggleLikeDocument,
    "\n  query me {\n    me {\n      profile {\n        id\n        username\n        avatar\n      }\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query seeFeed {\n    seeFeed {\n      ok\n      error\n      photos {\n        id\n        file\n        caption\n        likes\n        commentCount\n        createdAt\n        isMine\n        isLiked\n        user {\n          id\n          username\n          avatar\n        }\n        comments {\n          id\n          payload\n          isMine\n          createdAt\n          user {\n            username\n            avatar\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query seeFeed {\n    seeFeed {\n      ok\n      error\n      photos {\n        id\n        file\n        caption\n        likes\n        commentCount\n        createdAt\n        isMine\n        isLiked\n        user {\n          id\n          username\n          avatar\n        }\n        comments {\n          id\n          payload\n          isMine\n          createdAt\n          user {\n            username\n            avatar\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String!\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String!\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteComment($id: Int!) {\n    deleteComment(id: $id) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteComment($id: Int!) {\n    deleteComment(id: $id) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($photoId: Int!, $payload: String!) {\n    createComment(photoId: $photoId, payload: $payload) {\n      ok\n      error\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($photoId: Int!, $payload: String!) {\n    createComment(photoId: $photoId, payload: $payload) {\n      ok\n      error\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          fragment BSName on Comment {\n            id\n            payload\n            isMine\n            createdAt\n            user {\n              username\n              avatar\n            }\n          }\n        "): (typeof documents)["\n          fragment BSName on Comment {\n            id\n            payload\n            isMine\n            createdAt\n            user {\n              username\n              avatar\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleLike($id: Int!) {\n    toggleLike(id: $id) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation toggleLike($id: Int!) {\n    toggleLike(id: $id) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      profile {\n        id\n        username\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      profile {\n        id\n        username\n        avatar\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;