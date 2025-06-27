import { renderHook } from "@testing-library/react";
import { useSelector } from "./use-selector";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  counter: { value: 42 },
});

describe("useSelector", () => {
  it("should be defined", () => {
    expect(useSelector).toBeDefined();
  });

  it("should be a function", () => {
    expect(typeof useSelector).toBe("function");
  });

  it("should return the selected value", () => {
    const wrapper = ({ children }: React.PropsWithChildren) => <Provider store={store}>{children}</Provider>;
    const selector = vi.fn();

    renderHook(() => useSelector(selector), { wrapper });

    expect(selector).toHaveBeenCalled();
  });
});
