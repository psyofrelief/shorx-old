import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/theme-toggle";
import Home from "@/app/page";

import { MyProvider, MyContext } from "@/context";
import { useRouter } from "next/router"; // Import useRouter from Next.js

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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

  it('should toggle theme between "night" and "winter"', () => {
    const { getByRole } = render(<ThemeToggle />);
    const toggle = getByRole("theme-toggle");

    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toEqual(
      "night",
    );

    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toEqual(
      "winter",
    );
  });
});
