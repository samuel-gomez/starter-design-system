import { beforeAll, describe, expect, it, vi } from 'vitest';
import { server } from '../../../../../mocks/server';
import { HEADERS, METHODS, MIME_TYPES } from '../constant';
import { fetchApi, FetchApiError } from '../fetchApi';

describe('fetchApi', () => {
  const fetchMock = vi.fn();
  window.fetch = fetchMock;

  beforeAll(() => {
    server.close();
  });

  it('should return JSON data on success', async () => {
    const mockResponse = { message: 'Success' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.json }),
    });

    const result = await fetchApi<{ message: string }>({
      path: '/api/test',
      method: METHODS.get,
    });

    expect(result).toStrictEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/test', {
      method: METHODS.get,
      headers: new Headers(),
    });
  });

  it('should throw an error when the HTTP response is not successful', async () => {
    const mockError = 'Not Found';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: () => Promise.resolve(mockError),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.text }),
    });

    await expect(fetchApi({ path: '/api/error', method: METHODS.get })).rejects.toThrowError(FetchApiError);

    expect(fetch).toHaveBeenCalledWith('/api/error', {
      method: METHODS.get,
      headers: new Headers(),
    });
  });

  it('should handle non-JSON responses', async () => {
    const mockResponse = 'Plain text response';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockResponse),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.text }),
    });

    const result = await fetchApi<string>({
      path: '/api/text',
      method: METHODS.get,
    });

    expect(result).toBe(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/text', {
      method: METHODS.get,
      headers: new Headers(),
    });
  });

  it('should add Content-Type header for POST requests with data', async () => {
    const mockResponse = { message: 'Created' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
      headers: new Headers({ [HEADERS.contentType]: MIME_TYPES.json }),
    });

    const postData = { name: 'Test' };
    const result = await fetchApi<{ message: string }>({
      path: '/api/create',
      method: METHODS.post,
      data: postData,
    });

    expect(result).toStrictEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/create', {
      method: METHODS.post,
      body: JSON.stringify(postData),
      headers: expect.any(Headers),
    });

    const calledHeaders = fetchMock.mock.calls[0][1]?.headers as Headers;
    expect(calledHeaders.get(HEADERS.contentType)).toBe(MIME_TYPES.json);
  });

  it('should throw an error containing text content on HTTP failure', async () => {
    const mockError = 'Error message in plain text';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve(mockError),
      headers: new Headers(),
    });

    await expect(fetchApi({ path: '/api/server-error', method: METHODS.get })).rejects.toThrowError(
      new FetchApiError(mockError, 500, MIME_TYPES.text),
    );

    expect(fetch).toHaveBeenCalledWith('/api/server-error', {
      method: METHODS.get,
      headers: new Headers(),
    });
  });

  it('should return raw response when Content-Type header is missing', async () => {
    const mockResponse = { message: 'Success' };
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
      headers: new Headers(),
    });

    const result = await fetchApi({ path: '/api/missing-content-type', method: METHODS.get });

    expect(result).toStrictEqual(JSON.stringify(mockResponse));
    expect(fetch).toHaveBeenCalledWith('/api/missing-content-type', {
      method: METHODS.get,
      headers: new Headers(),
    });
  });
});
