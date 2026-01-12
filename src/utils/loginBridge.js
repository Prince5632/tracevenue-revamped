let openLoginFn;

const setLoginToggle = (openLogin) => {
    openLoginFn = openLogin;
};

const globalLoginToggle = () => {
    if (openLoginFn) {
        openLoginFn();
    }
};

export { setLoginToggle, globalLoginToggle };