"use client";
import { useMyContext } from "@/context";
import FacebookIcon from "@/components/facebook-icon";
import InstagramIcon from "@/components/instagram-icon";
import TwitterIcon from "@/components/twitter-icon";
import GmailIcon from "@/components/gmail-icon";
import ChevronUpDown from "@/components/chevron-up-down";
import Image from "next/image";

const LinksTable = () => {
  const { links, setLinks, sortBy, setSortBy } = useMyContext();

  // Function to format a date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Function to remove the protocol (http or https) from a URL
  const removeProtocol = (url: string) => {
    return url.replace(/^(https?:\/\/)?/, "");
  };

  // Function to handle the removal of a link by its index
  const handleRemoveLink = (index: number) => {
    const newLinks = [...links]; // Copy to avoid mutation
    newLinks.splice(index, 1);
    setLinks(newLinks);
    localStorage.setItem("links", JSON.stringify(newLinks));
  };

  // Function to handle sharing a link on various platforms
  const handleShare = (platform: string, url: string): void => {
    switch (platform) {
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "instagram":
        window.open(
          `https://www.instagram.com/share?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "gmail":
        window.open(`mailto:?body=${encodeURIComponent(url)}`, "_blank");
        break;
      default:
        break;
    }
  };

  // Function to handle sorting the links by date
  const handleSortByDate = () => {
    const sortedLinks = [...links].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    setLinks(sortedLinks);
    setSortBy(sortBy === "newest" ? "oldest" : "newest");
  };

  return (
    <table
      className="table whitespace-nowrap text-xs table-zebra  w-auto"
      role="link-table"
    >
      {/* head */}
      <thead className="text-xs p-0">
        <tr className="text-base-content">
          <th className="py-1 px-2 hidden sm:table-cell">Short Link</th>
          <th className="py-1 px-2 pl-3 hidden sm:table-cell">Original Link</th>
          <th className="py-1 px-2 table-cell text-center sm:hidden">Links</th>
          <th className="py-1 px-2  text-center sm:text-start">QR</th>
          <th
            className="py-1 px-2 flex items-center gap-1 cursor-pointer text-center transition-colors duration-250 sm:text-start hover:text-primary"
            onClick={handleSortByDate}
          >
            Date{" "}
            <span>
              <ChevronUpDown />
            </span>
          </th>

          <th className="py-1 px-1"></th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={index}>
            <td className="py-1 px-2 hidden sm:table-cell">
              <div className="dropdown  mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  tabIndex={0}
                  role="button"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.9}
                  stroke="currentColor"
                  className="dropdown dropdown-hover h-3 w-3 transition-transform duration-250 hover:scale-125"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                <ul
                  tabIndex={0}
                  className="dropdown-content grid grid-cols-2 text-xs border z-[1] menu p-1 shadow bg-base-100 rounded-box w-52 overflow-x-hidden"
                  style={{
                    maxHeight: "200px",
                  }} // Adjust max height as needed
                >
                  <li
                    onClick={() => handleShare("facebook", link.shortenedLink)}
                  >
                    <span>
                      <FacebookIcon />
                      Facebook
                    </span>
                  </li>

                  <li
                    onClick={() => handleShare("instagram", link.shortenedLink)}
                  >
                    <span>
                      <InstagramIcon />
                      Instagram
                    </span>
                  </li>
                  <li
                    onClick={() => handleShare("twitter", link.shortenedLink)}
                  >
                    <span>
                      <TwitterIcon />
                      {`X (Twitter)`}
                    </span>
                  </li>
                  <li onClick={() => handleShare("gmail", link.shortenedLink)}>
                    <span>
                      <GmailIcon />
                      Gmail
                    </span>
                  </li>
                </ul>
              </div>
              <a
                href={link.shortenedLink}
                target="_blank"
                className="hover:underline"
                aria-label="Short Link"
              >
                {link.shortenedLink}
              </a>
            </td>

            <td className="flex mt-1 text-xxs items-center p-0 sm:hidden px-0 py-1">
              <div className="dropdown  mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  tabIndex={0}
                  role="button"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="dropdown dropdown-hover h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                <ul
                  tabIndex={0}
                  className="dropdown-content grid grid-cols-2 text-xs border z-[1] menu p-1 shadow bg-base-100 rounded-box w-52 overflow-x-hidden"
                >
                  <li
                    onClick={() => handleShare("facebook", link.shortenedLink)}
                  >
                    <span>
                      <FacebookIcon />
                      Facebook
                    </span>
                  </li>

                  <li
                    onClick={() => handleShare("instagram", link.shortenedLink)}
                  >
                    <span>
                      <InstagramIcon />
                      Instagram
                    </span>
                  </li>
                  <li
                    onClick={() => handleShare("twitter", link.shortenedLink)}
                  >
                    <span>
                      <TwitterIcon />

                      {`X (Twitter)`}
                    </span>
                  </li>
                  <li onClick={() => handleShare("gmail", link.shortenedLink)}>
                    <span>
                      <GmailIcon />
                      Gmail
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col leading-tight">
                <p className="text-xxs  opacity-50">{link.originalLink}</p>
                <p>{link.shortenedLink}</p>
              </div>
            </td>
            <td className="py-1 px-2  items-center gap-1.5 pl-3 hidden sm:flex">
              <span>
                <Image
                  height={20}
                  width={20}
                  alt="ico"
                  loading="eager"
                  className="pt-0.5"
                  src={link.icon}
                />
              </span>
              {removeProtocol(link.originalLink)}
            </td>
            <td className="p-0 sm: py-1 px-2 relative ">
              <a aria-label="QR Code" href={link.qrCodeImage} target="_blank">
                <Image
                  className="max-w-4 mx-auto block scale-100 cursor-pointer transition-transform duration-250 hover:scale-150"
                  height={30}
                  width={30}
                  alt="QR Code"
                  src={link.qrCodeImage}
                />
              </a>
            </td>
            <td className=" py-1 px-2 text-xxs sm:text-xs">
              {formatDate(link.date.toString())}
            </td>
            <td
              className="px-0 sm:py-1 px-2 pr-1"
              onClick={() => handleRemoveLink(index)}
              role="remove-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="scale-100 w-3 h-3 cursor-pointer hover:text-error transition-color duration-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksTable;
