import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap() //necessary to make the promise behave as expected (thus use then/catch/finally)
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false)); //this is called on both success and error!!!
    },
    [dispatch, thunk],
  );

  return [runThunk, isLoading, error];
}
