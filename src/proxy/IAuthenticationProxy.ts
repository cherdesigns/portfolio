interface IAuthenticationProxy {
    authenticate(): Promise<string>;
}

export default IAuthenticationProxy;
