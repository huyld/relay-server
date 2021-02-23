import { io } from 'socket.io-client';
import { RemoteObject } from './RemoteObject';
const localVariable = 123;
const remoteObject = {
  fieldA: 'a',
  fieldB: 1,
  fieldC: /\d+/,
  someMethod: (value: number) => {
    return localVariable + value;
  },
  someMethodReturningAFunction: () => {
    return function (value: number) {
      return localVariable + value;
    };
  },
};

const TODO_yourRemoteObjectProviderFunction = (sharedObj: RemoteObject) => {
  const relayServerSocket = io('http://localhost:4200', {
    host: 'localhost',
  });
  relayServerSocket.on('connect_error', (data: any) => {
    relayServerSocket.connect();
  });

  // Listen to socket to relay server for shared object's property value
  relayServerSocket.on('getProp', (propName: string | any, cb: Function) => {
    console.log('From provider context: received request for property: ', propName);
    if (typeof propName === 'string') {
      cb(sharedObj[propName]);
    } else {
      cb();
    }
  });
};

TODO_yourRemoteObjectProviderFunction(remoteObject);
