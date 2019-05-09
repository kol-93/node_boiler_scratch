import { IApiService } from '../interfaces/api.service.interface';

export class Api implements IApiService {
  private static _instance: Api;
  private readonly socket: SocketIOClient.Socket;

  private constructor(socket: SocketIOClient.Socket) {
    this.socket = socket;
  }

  public static create(socket: SocketIOClient.Socket): void {
    if (!this._instance) {
      this._instance = new this(socket);
    } else {
      throw new Error('Already exists!');
    }
  }

  public static get instance(): Api {
    if (!this._instance) {
      throw new Error('Not created!');
    }

    return this._instance;
  }

  public getOrders() {
    this.socket.emit('get_orders', {});

    return new Promise((resolve, reject) => {
      this.socket.on('get_orders', (data: any) => {
        resolve(data);
      });
    });
  }
}
