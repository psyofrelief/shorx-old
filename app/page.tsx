"use client";
import { useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import URLForm from "@/components/url-form";
import { useMyContext } from "@/context";
import LinksTable from "@/components/links-table";

export default function Home() {
  const { setLinks, pageLoading, setPageLoading } = useMyContext();

  useEffect(() => {
    // Retrieve links from localStorage when component mounts
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 300);
  }, []);

  return (
    <div
      id="home"
      role="home-page"
      className="flex flex-col flex-1 overflow-y-hidden"
    >
      {pageLoading && (
        <div
          role="loading-screen"
          className="fixed top-0 bottom-0 left-0 right-0 bg-black text-secondary-content z-[1] justify-center items-center flex"
        >
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}

      <Navbar />
      <main className="flex flex-1 flex-col gap-4 px-3 py-10 justify-center items-center">
        <h1 className="text-2xl text-center font-bold sm:text-3xl">{`Shorten Your Loooong Links :)`}</h1>
        <h2 className="text-sm mb-10 text-center">
          <span className="text-primary font-bold italic">shorX</span> is an
          efficent and easy to use URL shortening service that streamlines your
          online experience.
        </h2>
        <URLForm />
        <div className="divider text-xs">Your Links</div>
        <LinksTable />
      </main>
      <Footer />
    </div>
  );
}
