'use client';
// NewArrival.tsx
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import React, { useEffect, useState } from 'react';

const Test = () => {
  const [state, setState] = useState<any>(/* initial state */);
  const socketManager = new SocketManager();

  useSocket(socketManager);

  useEffect(() => {
    socketManager.on('bid_stones', data => _handleBidStones(data));
    socketManager.on('error', data => _handleError(data));
    socketManager.on('bid_placed', data => _handleBidPlaced(data));
    socketManager.on('bid_canceled', data => _handleBidCanceled(data));
    socketManager.on('request_get_bid_stones', () =>
      socketManager.emit('get_bid_stones')
    );

    // Cleanup on component unmount
    return () => {
      socketManager.disconnect();
    };
  }, []);

  const _handleBidStones = (data: any) => {
    console.log(data, 'pooooooooooooooooooooooooo');
  };

  const _handleError = (data: any) => {
    // setState with error
  };

  const _handleBidPlaced = (data: any) => {
    // setState with bid placed info
  };

  const _handleBidCanceled = (data: any) => {
    // setState with bid canceled info
  };

  // ... other methods

  return <>dev</>;
};

export default Test;
