export interface IProviderState<E> {
  status: "ready" | "loading" | "error";
  errorMessage: null | string;
  entity: E;
}
