import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import { MyProvider, MyContext } from "@/context";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  it("should render Home Page without any errors", async () => {
    render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("home-page")).toBeInTheDocument();
    });
  });

  it("should render Link Table without any errors", async () => {
    render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("link-table")).toBeInTheDocument();
    });
  });

  it("should render Navbar without any errors", async () => {
    render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("navbar")).toBeInTheDocument();
    });
  });

  it("should render Link Table without any errors", async () => {
    render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("link-table")).toBeInTheDocument();
    });
  });

  it("should render Footer without any errors", async () => {
    render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("footer")).toBeInTheDocument();
    });
  });

  it("should remove loading screen after a delay", async () => {
    const { queryByRole } = render(
      <MyProvider>
        <Home />
      </MyProvider>,
    );

    const loadingScreen = queryByRole("loading-screen");

    await waitFor(() => {
      expect(loadingScreen).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(loadingScreen).not.toBeInTheDocument();
    });
  });
});
