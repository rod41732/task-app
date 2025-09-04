import { randomId } from "elysia/utils";
import { useCallback, useEffect, useState } from "react";

type State = "success" | "loading" | "error";

type HandlerStateCases<T> =
  | {
      state: "success";
      data: T;
      error: null;
    }
  | {
      state: "error";
      error: Error;
      data: null;
    }
  | {
      state: "loading";
      data: T | null;
      error: null;
    };

type HandlerResult<T> = HandlerStateCases<T> & { invalidate: () => void };

export function useLoadingHandler<T>({
  fetcher,
  depsArray,
}: {
  fetcher: () => Promise<T>;
  depsArray: unknown[];
}): HandlerResult<T> {
  const [state, setState] = useState<State>("loading");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [invalidationToken, setInvalidationToken] = useState(randomId()); // any random string

  const invalidate = useCallback(() => {
    setInvalidationToken(randomId());
  }, []);

  useEffect(() => {
    setState("loading");
    // setData(null);
    setError(null);
    fetcher()
      .then((res) => {
        setState("success");
        setData(res);
      })
      .catch((err) => {
        setState("error");
        setError(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...depsArray, invalidationToken]);

  if (state == "success" && data) {
    return { state, data, invalidate };
  }
  if (state == "error" && error) {
    return { state, error, invalidate };
  }
  return { state: "loading", data, invalidate };
}
