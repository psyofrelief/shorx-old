import "@testing-library/jest-dom";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import ThemeToggle from "@/components/theme-toggle";
import Home from "@/app/page";
import URLForm from "@/components/url-form";
import { MyProvider, MyContext } from "@/context";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result_url: "http://short.link" }),
  }),
);

describe("Home Page", () => {
  it("should render Theme Toggle without any errors", async () => {
    render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("theme-toggle")).toBeInTheDocument();
    });
  });

  it("should display alert message when invalid URL format is entered", async () => {
    const { getByRole, getByText } = render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );
    const input = getByRole("textbox");
    const submitButton = getByRole("button", { name: "+" });

    fireEvent.change(input, { target: { value: "invalid-url" } });
    fireEvent.click(submitButton);

    const alertMessage = await getByText("Warning: Invalid URL format");
    expect(alertMessage).toBeInTheDocument();
  });

  it("should return a shortened link when a valid link is entered", async () => {
    const {
      getByRole,
      getByText,
      getAllByText,
      queryAllByText,
      getAllByRole,
      queryByRole,
    } = render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    const input = getByRole("textbox");
    const submitButton = getByRole("button", { name: "+" });

    fireEvent.change(input, { target: { value: "https://valid-url.com" } });
    fireEvent.click(submitButton);

    const loadingSpinner = queryByRole("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();

    // Wait for the API call and shortened link to be displayed
    await waitFor(() => {
      const shortenedLinks = getAllByText("http://short.link");
      expect(shortenedLinks.length).toBeGreaterThan(0);
    });
  });
});
