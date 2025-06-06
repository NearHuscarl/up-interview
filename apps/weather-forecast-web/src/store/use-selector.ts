import { useSelector as _useSelector, EqualityFn } from "react-redux";
import { RootState } from "./store";

export function useSelector<TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFnOrOptions?: EqualityFn<TSelected>,
): TSelected {
  return _useSelector(selector, equalityFnOrOptions);
}
