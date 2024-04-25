"use client";
import { useEffect, useState } from "react";
import { useMyContext } from "@/context/index";
import Alert from "@/components/alert";

type Link = {
  originalLink: string;
  shortenedLink: string;
  date: Date;
  qrCodeImage: string;
  icon: string;
};

const URLForm = () => {
  const [formData, setFormData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { links, setLinks, sortBy, errorMessage, setErrorMessage } =
    useMyContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  // Function to validate the form input
  const isFormValid = () => {
    const urlRegex = /\bhttps?:\/\/\S+\.\S+/;
    return urlRegex.test(formData);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData) {
      setErrorMessage("Error: No input provided");
      return;
    }

    if (!isFormValid()) {
      setErrorMessage("Warning: Invalid URL format");
      return;
    } else {
      setErrorMessage("");
    }

    const existingLink = links.find((link) => link.originalLink === formData);

    if (existingLink) {
      setErrorMessage("Warning: Link already exists in database");
      return;
    } else {
      setErrorMessage("");
    }

    const url = "https://url-shortener-service.p.rapidapi.com/shorten";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
        "X-RapidAPI-Host": `${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}`,
      },
      body: new URLSearchParams({
        url: formData,
      }),
    };

    setIsLoading(true);

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      const newLink: Link = {
        originalLink: formData,
        shortenedLink: result.result_url,
        date: new Date(),
        qrCodeImage: `https://api.qrserver.com/v1/create-qr-code/?data=${formData}&amp;size=20x20&bgcolor=e5e7eb`,
        icon: `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${formData}`,
      };

      // Updating the links array based on the sort order
      setLinks(sortBy === "oldest" ? [...links, newLink] : [newLink, ...links]);
      localStorage.setItem("links", JSON.stringify([...links, newLink]));
      setFormData("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to clear error message when form data changes
  useEffect(() => {
    if (isFormValid()) {
      setErrorMessage("");
    }
  }, [formData]);

  return (
    <form
      className="flex gap-2 items-center relative"
      onSubmit={handleSubmit}
      id="url-form"
      role="url-form"
    >
      {errorMessage && <Alert />}
      <label
        className={`input py-1 h-auto pr-1 input-bordered flex  items-center gap-2 ${errorMessage ? "input-error" : ""}`}
      >
        <input
          type="text"
          className="grow text-xs sm:text-sm"
          onChange={handleChange}
          placeholder="https://insert-link.here"
          value={formData}
        />
        <kbd className="kbd kbd-xs hidden sm:inline-flex">Enter</kbd>
      </label>
      <button type="submit" className="btn btn-sm btn-primary hover:bg-accent">
        {isLoading ? (
          <span
            role="loading-spinner"
            className="loading loading-spinner loading-xs"
          ></span>
        ) : (
          <span>+</span>
        )}
      </button>
    </form>
  );
};

export default URLForm;
