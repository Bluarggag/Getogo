interface IError {
    new(message?: string): Error;
    (message?: string): Error;
    prototype: Error;
    captureStackTrace? (a: any, b: any): any;
}
interface IErrorStackResult {
    stack: string;
}
var debug;
