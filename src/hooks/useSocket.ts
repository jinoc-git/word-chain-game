import React from 'react';

import { socket } from '@/socket/socket';

const useScoket = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState('N/A');

  React.useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name || 'N/A');

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport('N/A');
    };

    if (socket.connected) onConnect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { isConnected, transport };
};

export default useScoket;
