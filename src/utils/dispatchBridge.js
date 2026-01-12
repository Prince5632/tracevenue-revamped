let globalDispatch;

export const setGlobalDispatch = (dispatchFn) => {
  globalDispatch = dispatchFn;
};

export const getGlobalDispatch = () => {
  if (!globalDispatch) {
    console.warn("Dispatch not yet set!");
  }
  return globalDispatch;
};
