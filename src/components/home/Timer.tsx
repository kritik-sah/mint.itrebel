"use client";
import Icon from "@/lib/icon";
import { supabase } from "@/utils/supabaseClient";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Badge } from "../ui/badge";

const Timer = () => {
  const { openConnectModal } = useConnectModal();
  const [joinedUser, setJoinedUser] = useState<any>(null);
  const { address } = useAccount();

  const checkUserJoinedWhitelist = async () => {
    const { data: userData, error } = await supabase
      .from("whitelist")
      .select()
      .eq("address", address);
    if (userData?.length) {
      setJoinedUser(userData[0]);
    }
  };

  useEffect(() => {
    checkUserJoinedWhitelist();
  }, [address]);

  return (
    <div>
      <div className="inline-flex items-center mb-4 gap-1">
        <span>Whitelist mint start&apos;s at</span>
        {joinedUser ? (
          <Badge className="font-inter inline-flex items-center gap-1 !bg-sky-500 !text-light">
            Joined <Icon name="HiCheckBadge" className="text-lg" />
          </Badge>
        ) : (
          <Link href="#join-waitlist">
            <Badge className="font-inter inline-flex items-center gap-1">
              Join Now <Icon name="HiOutlinePlusCircle" className="text-lg" />
            </Badge>
          </Link>
        )}
      </div>
      <div className="hidden lg:block">
        <FlipClockCountdown to={new Date("2024-08-31T18:30:00").getTime()} />
      </div>
      <div className="block lg:hidden">
        <FlipClockCountdown
          digitBlockStyle={{ width: 20, height: 30, fontSize: 18 }}
          to={new Date("2024-08-31T18:30:00").getTime()}
        />
      </div>
    </div>
  );
};

export default Timer;
