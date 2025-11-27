/**
 * Class representing an HTTP error.
 * @class
 * @extends Error
 * @description This class represents an error that occurs during HTTP requests.
 * @author rayoneitalo
 */

export class HttpError extends Error {
  constructor(public response: Response) {
    super(`${response.status}`);
  }
}
