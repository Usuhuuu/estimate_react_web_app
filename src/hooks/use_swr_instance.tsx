import useSWR from "swr";
import { auth_fetch, regular_fetch } from "./fetch_functions";
import { SWRConfiguration } from "swr";

export const auth_useSWR = ({
  path,
  cacheKey,
  LoginStatus,
  config,
}: {
  path: string;
  cacheKey: string;
  LoginStatus: boolean;
  config?: SWRConfiguration;
}) => {
  const { data, error, isLoading } = useSWR(
    LoginStatus ? [cacheKey, LoginStatus] : null,
    {
      fetcher: () => auth_fetch({ path }),
      revalidateOnFocus: config?.revalidateOnFocus ?? false,
      dedupingInterval: config?.dedupingInterval ?? 10000,
      shouldRetryOnError: false,
      errorRetryInterval: 4000,
      errorRetryCount: 3,
      loadingTimeout: 3000,
      ...config,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export const regular_useSWR = ({
  path,
  LoginStatus,
  cacheKey,
}: {
  path: string;
  LoginStatus: boolean;
  cacheKey: string;
}) => {
  const { data, error, isLoading } = useSWR(
    LoginStatus ? [cacheKey, LoginStatus] : null,
    {
      fetcher: () => regular_fetch({ path }),
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      shouldRetryOnError: false,
      errorRetryInterval: 4000,
      errorRetryCount: 3,
      loadingTimeout: 3000,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};
