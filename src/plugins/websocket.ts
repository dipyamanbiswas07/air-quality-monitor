export default class WebsocketService {
    private connection;

    initializeWebsocket(url:string) {
      this.connection = new WebSocket(url);
      return this.connection;
    }
}
