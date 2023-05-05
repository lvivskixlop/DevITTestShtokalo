interface Post {
  id?: string;
  post?: string;
  feedId?: string;
  guid?: number;
  publicationDate?: Date;
}

interface User {
  username: string;
  authdata?: string;
}

interface Feed {
  id: string;
  feed: string;
  link: string;
  item: Post[];
}

interface PostsRequestParams {
  limit?: number;
  offset?: number;
  text?: string;
  guid?: number;
  feedId?: string;
  link?: string;
}

interface PostsResponse {
  count: number;
  rows: Post[];
}
interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
  authdata: any;
}

export { Post, Feed, PostsRequestParams, PostsResponse, User, AuthResponse };
