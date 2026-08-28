export function getErrorPayload(error, fallback = 'Unexpected request error') {
  return (
    error?.response?.data?.error ??
    error?.response?.data ??
    error?.message ??
    fallback
  );
}
