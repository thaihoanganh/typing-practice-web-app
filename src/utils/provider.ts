export interface IProviderState<E> {
  status: "ready" | "loading";
  errorMessage: null | string;
  entity: E;
}
