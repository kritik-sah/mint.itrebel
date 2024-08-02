"use client";
import Icon from "@/lib/icon";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

const MobMenu = () => {
  const [open, setOpen] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  const openConnectWallet = () => {
    openConnectModal && openConnectModal();
  };
  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        size={"icon"}
        className="lg:hidden mx-4"
        variant={"ghost"}
      >
        <Icon
          name={open ? "HiBars3BottomRight" : "HiBars3"}
          className="text-2xl text-light"
        />
      </Button>
      <div
        className={`absolute bg-midnight/90 border border-light/10 ${
          open ? "top-[104%] block" : "-top-[100000px] hidden"
        } w-full rounded-lg p-4 transition-all ease-in-out duration-150`}
      >
        <div className="flex flex-col gap-4">
          <a href="#features" className="hover:text-primary">
            Features
          </a>
          {address ? (
            <ConnectButton />
          ) : (
            <Button onClick={openConnectWallet} className="w-full">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobMenu;
