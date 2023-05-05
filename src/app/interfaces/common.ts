interface Post {
  id: string;
  post: string;
  feedId: string;
  guid: number;
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

export { Post, Feed, PostsRequestParams, PostsResponse };
