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
import LinksTable from "@/components/links-table";
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

  it("should have a QR code associated with each link", () => {
    // Mock data for links
    const links = [
      {
        originalLink: "https://example.com",
        shortenedLink: "http://short.link",
        date: new Date(),
        qrCodeImage:
          "https://api.qrserver.com/v1/create-qr-code/?data=https://example.com&size=20x20&bgcolor=e5e7eb",
        icon: "https://example.com/favicon.ico",
      },

      {
        originalLink: "https://example2.com",
        shortenedLink: "http://short2.link",
        date: new Date(),
        qrCodeImage:
          "https://api.qrserver.com/v1/create-qr-code/?data=https://example2.com&size=20x20&bgcolor=e5e7eb",
        icon: "https://example2.com/favicon.ico",
      },
    ];

    const { getAllByAltText, getByText } = render(
      <MyProvider>
        <MyContext.Consumer>
          {(value) => {
            value.links = links;
            return <LinksTable />;
          }}
        </MyContext.Consumer>
      </MyProvider>,
    );

    const qrCodeImages = getAllByAltText("QR Code");

    expect(qrCodeImages.length).toBe(links.length);
  });

  it("should remove the associated link when the delete button is clicked", async () => {
    const { getByRole, getByText, getAllByText, queryAllByText, getAllByRole } =
      render(
        <MyProvider>
          <Home />
        </MyProvider>,
      );

    const input = getByRole("textbox");
    const submitButton = getByRole("button", { name: "+" });

    fireEvent.change(input, { target: { value: "https://valid-url.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const shortenedLinks = getAllByText("http://short.link");
      expect(shortenedLinks.length).toBeGreaterThan(0);
    });

    const deleteButton = getByRole("remove-link");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      const shortenedLinks = queryAllByText("http://short.link");
      expect(shortenedLinks.length).toBeLessThan(1);
    });
  });
});
