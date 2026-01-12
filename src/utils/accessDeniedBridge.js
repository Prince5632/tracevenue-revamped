let openAccessDeniedFn;

const setAccessDeniedToggle = (openAccessDenied) => {
    openAccessDeniedFn = openAccessDenied;
};

const globalAccessDeniedToggle = () => {
    if (openAccessDeniedFn) {
        openAccessDeniedFn();
    }
};

export { setAccessDeniedToggle, globalAccessDeniedToggle };
