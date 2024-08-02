"use client";
import Icon from "@/lib/icon";
import truncateEthAddress from "@/utils/shortaddress";
import { supabase } from "@/utils/supabaseClient";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import copy from "copy-to-clipboard";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import Marquee from "../magicui/marquee";
import { VelocityScroll } from "../magicui/scroll-based-velocity";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const pnglist = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 6000, 6001, 6002, 6003, 6004, 6005, 6006, 6007,
  6008, 6009, 6010, 7000, 7001, 7002, 7003, 7004, 7005, 7006, 7007, 7008, 7009,
  7010,
];

const JoinWaitlist = () => {
  const [session, setSession] = useState<any>(null);
  const [twitter, setTwitter] = useState<any>(null);
  const [joinedUser, setJoinedUser] = useState<any>(null);
  const [refferedByUser, setRefferedByUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refByInput, setRefByInput] = useState("");
  const [newRefcode, setNewRefcode] = useState("");
  const [hostUrl, setHostUrl] = useState("");
  const [step, setStep] = useState(1);
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const searchParams = useSearchParams();

  let refBy = searchParams.get("ref");
  const router = useRouter();

  const getRefbyuser = async (code?: string) => {
    const refcode = code || sessionStorage.getItem("refBy");
    console.log("refcode :", refcode);
    const { data, error } = await supabase
      .from("whitelist")
      .select()
      .eq("refcode", refcode);
    if (data?.length) {
      setRefferedByUser(data[0]);
    }
    console.log("refcode", refcode, ", Data :", data);
  };

  useEffect(() => {
    if (refBy) {
      setRefByInput(refBy);
      router.push("/");
    } else if (refByInput.length === 6) {
      sessionStorage.setItem("refBy", refByInput);
      getRefbyuser(refByInput);
    }
  }, [refBy, refByInput]);

  useEffect(() => {
    const refcode = sessionStorage.getItem("refBy");
    if (refcode) {
      setRefByInput(refcode || "");
    }
  }, []);

  const getRandomList = () => {
    let x = Math.floor(Math.random() * (pnglist.length - 10));
    let imageList = [];
    for (let i = 1; i <= 10; i++) {
      imageList.push(`/images/humans/${pnglist[x + i]}.png`);
    }
    return imageList;
  };

  const connectAccount = () => {
    openConnectModal && openConnectModal();
  };

  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSession(data);

    if (data?.session?.user.app_metadata.provider === "twitter") {
      sessionStorage.setItem("twitter", JSON.stringify(data.session));
    }
    console.log("session :", data);
  };

  useEffect(() => {
    fetchSession();

    setHostUrl(window.location.host);
  }, []);

  useEffect(() => {
    const twitterValue = sessionStorage.getItem("twitter");
    setTwitter(twitterValue ? JSON.parse(twitterValue) : null);
  }, [session]);

  async function signInWithTwitter() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
    if (error) {
      console.error(error);
      return;
    }
  }

  const generateRefCode = async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let refCode = "";
    for (let i = 0; i < 6; i++) {
      refCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    const { data: refCodeData, error } = await supabase
      .from("whitelist")
      .select()
      .eq("refcode", refCode);
    if (refCodeData?.length) {
      refCode = await generateRefCode();
    }

    setNewRefcode(refCode);
    console.log(refCode);
    return refCode;
  };

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

  useEffect(() => {
    generateRefCode();
  }, []);

  const joinWhitelist = async () => {
    setIsLoading(true);
    const { data: waitlistData, error } = await supabase
      .from("whitelist")
      .insert([
        {
          address,
          twitter: twitter?.user?.user_metadata?.user_name,
          email: twitter?.user?.user_metadata?.email,
          avatar: twitter?.user?.user_metadata?.avatar_url,
          refcode: newRefcode,
          refby: refferedByUser.twitter,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      if (error.code === "23505") {
        checkUserJoinedWhitelist();
        toast.error("Address or Twitter user already exists");
        await supabase.auth.signOut();
        sessionStorage.removeItem("twitter");
        fetchSession();
        router.refresh();
      } else {
        console.log("Error joining waitlist: " + error);
      }
      setIsLoading(false);
      return;
    }

    checkUserJoinedWhitelist();
    setIsLoading(false);
  };

  const copyText = (text: string) => {
    copy(text);
    toast("copied Successfully!");
  };

  return (
    <div id="join-waitlist" className="mt-16 lg:mt-24 p-4">
      {/* <VelocityScroll
        text=" Join Waitlist ✨"
        default_velocity={3}
        className="font-display text-center text-3xl tracking-[-0.02em] text-black drop-shadow-sm dark:text-light/90 md:text-7xl md:leading-[5rem]"
      /> */}
      <div className="border overflow-hidden border-midnight/10 bg-light/90 dark:border-light/10 bg-midnight/90 rounded-3xl max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="p-4 md:p-8 w-full max-w-2xl">
          {!joinedUser ? (
            <div className="">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-light md:text-3xl mb-4">
                You are early! Join us!!
              </h2>
              <p className="text-lg tracking-[-0.02em] text-gray-900 dark:text-light">
                To be eligible for the Free mint of our limited edition Doomsday
                Human collectable pfps, you must first join the waitlist. Follow
                the steps to earn your keep.
              </p>

              <div className="mt-8">
                <InputOTP
                  onChange={(e) => setRefByInput(e)}
                  value={refByInput || ""}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {refferedByUser ? (
                <p className="mt-4">reffered by : {refferedByUser?.twitter}</p>
              ) : (
                <p className="mt-4">Enter valid Invite code</p>
              )}

              <div className="pt-8">
                <p className="text-light/80 mb-4">
                  Step {!address ? "1" : "2"} of 2
                </p>
                {!address ? (
                  <Button
                    onClick={connectAccount}
                    size={"lg"}
                    className="gap-1 items-center font-inter "
                  >
                    Connect wallet{" "}
                    <Icon name="SiWalletconnect" className="text-lg" />
                  </Button>
                ) : (
                  <div className="mb-4 flex items-center justify-start gap-4">
                    <span>{truncateEthAddress(address)}</span>{" "}
                    <Icon
                      name="HiCheckBadge"
                      className="text-cyan-500 text-xl"
                    />
                  </div>
                )}

                {address && twitter ? (
                  <div className="mb-4 flex items-center justify-start gap-4">
                    <span>{twitter?.user?.user_metadata?.user_name}</span>{" "}
                    <Icon
                      name="HiCheckBadge"
                      className="text-cyan-500 text-xl"
                    />
                  </div>
                ) : address ? (
                  <Button
                    onClick={signInWithTwitter}
                    size={"lg"}
                    className="gap-1 items-center font-inter "
                  >
                    Verify account{" "}
                    <Icon name="FaXTwitter" className="text-lg" />
                  </Button>
                ) : null}

                {address && twitter ? (
                  <Button
                    onClick={joinWhitelist}
                    size={"lg"}
                    className="gap-1 items-center font-inter "
                  >
                    Join Whitelist{" "}
                    {isLoading ? (
                      <Icon
                        name="HiSparkles"
                        className="text-lg animate-pulse"
                      />
                    ) : null}
                  </Button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-light md:text-3xl mb-4">
                🎉 Congratulations!! You made it.
              </h2>
              <p className="text-lg tracking-[-0.02em] text-gray-900 dark:text-light">
                Sharing is caring, Invite your friends to join you in this mint.
                and grab the oppurtinity to increase your mint limit
              </p>

              <p className="text-primary">
                Current mint limit : {joinedUser.point}
              </p>
              <div className="bg-dark p-4 rounded-xl border border-light/10 tracking-widest flex items-center justify-between gap-4 font-inter">
                {`${hostUrl}?ref=${joinedUser?.refcode}`}{" "}
                <Button
                  onClick={() =>
                    copyText(`https://${hostUrl}?ref=${joinedUser?.refcode}`)
                  }
                >
                  Copy <Icon name="FaLink" className="text-xl" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="hidden relative -right-10 lg:flex gap-0 h-[500px] flex-row items-center justify-center bg-background md:shadow-xl rotate-12">
          <Marquee pauseOnHover vertical className="[--duration:50s]">
            {getRandomList().map((human) => (
              <Image
                key={human}
                className="w-[150px] h-[150px] object-cover transition-all duration-200 select-none"
                src={human}
                height="150"
                width="150"
                alt="Doomsday Human"
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:50s]">
            {getRandomList().map((human) => (
              <Image
                key={human}
                className="w-[150px] h-[150px] object-cover transition-all duration-200 select-none"
                src={human}
                height="150"
                width="150"
                alt="Doomsday Human"
              />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical className="[--duration:50s]">
            {getRandomList().map((human) => (
              <Image
                key={human}
                className="w-[150px] h-[150px] object-cover transition-all duration-200 select-none"
                src={human}
                height="150"
                width="150"
                alt="Doomsday Human"
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:50s]">
            {getRandomList().map((human) => (
              <Image
                key={human}
                className="w-[150px] h-[150px] object-cover transition-all duration-200 select-none"
                src={human}
                height="150"
                width="150"
                alt="Doomsday Human"
              />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default JoinWaitlist;
