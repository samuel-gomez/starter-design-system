import { HEADERS, METHODS, MIME_TYPES } from './constant';
import type { Json, Methods, MimeTypes } from './types';

type FetchApiProps = {
  path: string;
  method?: Methods;
  data?: Json;
  headers?: HeadersInit;
};

export class FetchApiError extends Error {
  constructor(
    message: string,
    public readonly code?: number,
    public readonly contentType?: MimeTypes,
  ) {
    super(message);
    this.name = 'FetchApiError';
  }
}

export const fetchApi = async <T extends Json | string>({
  path,
  method = METHODS.get,
  data,
  headers = [],
}: FetchApiProps): Promise<T> => {
  const mergeHeaders = new Headers(headers);

  if (data) {
    mergeHeaders.append(HEADERS.contentType, MIME_TYPES.json);
  }

  const response = await fetch(path, {
    method,
    ...(data && { body: JSON.stringify(data) }),
    headers: mergeHeaders,
  });

  const content = await response.text();

  if (!response.ok) {
    throw new FetchApiError(
      content,
      response.status,
      (response.headers.get(HEADERS.contentType) as MimeTypes) ?? MIME_TYPES.text,
    );
  }

  if ((response.headers.get(HEADERS.contentType) ?? '').includes('json')) {
    return JSON.parse(content) as T;
  }

  return content as T;
};
