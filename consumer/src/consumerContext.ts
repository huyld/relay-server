// ./context-b.ts
import { ​TODO_yourRemoteObjectConsumerFunction } from './ConsumerClient'
const PROPERTY_NAME = 'fieldA';


const remoteObj ​= ​TODO_yourRemoteObjectConsumerFunction(​PROPERTY_NAME​);

const testOneProperty = async () => {
  const fieldValue = await remoteObj[PROPERTY_NAME];
  console.log(`​${PROPERTY_NAME​} has value`, fieldValue);
};
testOneProperty();
