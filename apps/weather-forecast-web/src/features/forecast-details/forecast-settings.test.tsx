import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { ForecastSettings } from "./forecast-settings";
import { setTemperatureUnit } from "./forecast.slice";

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<typeof import("react-redux")>("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("ForecastSettings", () => {
  const store = mockStore({});

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders temperature unit options", () => {
    render(
      <Provider store={store}>
        <ForecastSettings />
      </Provider>,
    );
    expect(screen.getByText("°C")).toBeInTheDocument();
    expect(screen.getByText("°F")).toBeInTheDocument();
    expect(screen.getByText("Temperature Unit")).toBeInTheDocument();
  });

  it("submits form with selected temperature unit", async () => {
    render(
      <Provider store={store}>
        <ForecastSettings />
      </Provider>,
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole("radio", { name: "°F" }));
    await user.click(screen.getByText("Save"));

    expect(mockDispatch).toHaveBeenCalledWith(setTemperatureUnit("fahrenheit"));
  });

  it("defaults to celsius and submits it if no change", async () => {
    render(
      <Provider store={store}>
        <ForecastSettings />
      </Provider>,
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("Save"));

    expect(mockDispatch).toHaveBeenCalledWith(setTemperatureUnit("celsius"));
  });
});
