export interface RemoteObject {
  fieldA?: String
  fieldB?: number
  fieldC?: RegExp
  someMethod?: (value: number) => number
  someMethodReturningAFunctio?: () => Function,
  [index: string]:any
}