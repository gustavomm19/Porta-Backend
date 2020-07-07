module.exports = {
  // On Connect : llamado cuando un cliente se conecta
  onConnect: async (connectionParams, webSocket) => {
    const { authToken } = connectionParams;
    return { authToken };
  },
  onDisconnect: async (webSocket, context) => {
    // ... llamada cuando un cliente se desconecta
  },
};
