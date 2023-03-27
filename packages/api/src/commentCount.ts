import { type BaseAPIOptions, getFetchPrefix } from './utils.js';

export interface GetCommentCountOptions extends BaseAPIOptions {
  /**
   * 待获取评论数的 path
   *
   * Path of pages to be fetched
   */
  paths: string[];

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export const fetchCommentCount = ({
  serverURL,
  lang,
  paths,
  signal,
}: GetCommentCountOptions): Promise<number[]> =>
  fetch(
    `${getFetchPrefix(serverURL)}comment?type=count&url=${encodeURIComponent(
      paths.join(',')
    )}&lang=${lang}`,
    { signal }
  )
    .then((resp) => <Promise<number[]>>resp.json())
    .then((counts) => counts);
