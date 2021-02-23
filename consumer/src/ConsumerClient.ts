import fetch from 'node-fetch';
import { RemoteObject } from './RemoteObject';

const DOMAIN = 'http://localhost:4200';

const requestPropValue = async (propName: String): Promise<any> => {
  const url = `${DOMAIN}/getSharedObjProp?propName=${propName}`;
  return await fetch(url);
};

// Send request to relay server for shared object's property value
const getRemoteProp = async (propName: string) => {
  const propValue = await requestPropValue(propName)
    .then((res) => res.json())
    .then((data) => {
      return data.propValue;
    });
  console.log(`From consumer context: receive value for property ${propName}: `, propValue);
  return propValue;
};

const TODO_yourRemoteObjectConsumerFunction = (str: String) => {
  let remoteObject: RemoteObject = {};
  Object.defineProperties(remoteObject, {
    fieldA: {
      get: function () {
        return getRemoteProp('fieldA');
      },
    },
    fieldB: {
      get: function () {
        return getRemoteProp('fieldB');
      },
    },
    fieldC: {
      get: function () {
        return getRemoteProp('fieldC');
      },
    },
    someMethod: {
      get: function () {
        return getRemoteProp('someMethod');
      },
    },
    someMethodReturningAFunction: {
      get: function () {
        return getRemoteProp('someMethodReturningAFunction');
      },
    },
  });
  return remoteObject;
};

export { TODO_yourRemoteObjectConsumerFunction };
