"use client";
import Icon from "@/lib/icon";
import {
  ConnectButton,
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import MobMenu from "./MobMenu";

const Navbar = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  const openConnectWallet = () => {
    openConnectModal && openConnectModal();
  };
  return (
    <header className="bg-dark/10 px-4 fixed left-0 top-0 z-50 w-full animate-fade-in border-b border-light/5 backdrop-blur-[12px] [--animation-delay:600ms]">
      <div className="relative max-w-screen-2xl mx-auto ">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
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
          <div className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14">
            {/* <a
              href="#"
              className="text-base font-medium text-gray-900 dark:text-light transition-all duration-200 rounded focus:outline-none hover:text-gray-700 dark:hover:text-light/70 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              {" "}
              All Artworks{" "}
            </a> */}
          </div>
          <div className="flex items-center justify-end ml-auto">
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {address ? (
                <ConnectButton showBalance={false} />
              ) : (
                <Button
                  variant={"link"}
                  onClick={openConnectWallet}
                  className="text-base hover:no-underline font-medium text-gray-900 dark:text-light transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-light/70 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-gray-900"
                >
                  Login
                </Button>
              )}
            </div>
            <div className="flex items-center justify-end space-x-5">
              <MobMenu />
              {/* <button
                type="button"
                className="relative p-2 -m-2 text-gray-900 dark:text-light transition-all duration-200 hover:text-gray-700 dark:hover:text-light/70"
              >
                <Icon name="FaRegBell" className="text-xl" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-dark bg-primary rounded-full">
                  {" "}
                  3{" "}
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
