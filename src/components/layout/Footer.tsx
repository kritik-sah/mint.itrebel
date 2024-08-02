import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-midnight px-4">
      <div className="relative mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-light p-2 text-dark shadow transition hover:bg-light/80 sm:p-3 lg:p-4"
            href="#main"
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="inline-flex items-center gap-1">
                <span className="sr-only"> Doomsday human </span>
                <img
                  className="w-auto h-10"
                  src="/images/Bone.png"
                  alt="Bone skull - Doomsday Human"
                />
                <span className="flex flex-col gap-0 p-0 m-0">
                  <span className="text-base">Doomsday</span>
                  <span>Human</span>
                </span>
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-light/80 lg:text-left">
              A Collection of 9,999 unique designs of Doomsday Human by IT
              Rebels.
            </p>
          </div>

          <ul className="mt-12 text-light flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <a
                className="transition hover:text-light/75"
                href="#join-waitlist"
              >
                Join waitlist
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-light lg:text-right">
          Made with ❤️ by IT Rebel
        </p>
      </div>
    </footer>
  );
};

export default Footer;
