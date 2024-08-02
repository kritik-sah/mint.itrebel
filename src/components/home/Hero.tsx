import Icon from "@/lib/icon";
import React from "react";
import { Button } from "../ui/button";
import Timer from "./Timer";

const Hero = () => {
  return (
    <section className="px-4">
      <div className="relative mt-16 lg:mt-24 h-[80vh] w-full hover:scale-[101%] transition-all ease-in-out duration-300 max-w-screen-2xl mx-auto  rounded-3xl overflow-hidden bg-[url('/images/Doomsday-potrait.png')] md:bg-[url('/images/Doomsday.png')]  bg-center bg-no-repeat bg-cover">
        <div className="h-full w-full p-4 md:p-8 bg-gradient-to-t from-dark/90 to-dark/40 md:to-dark/0 flex items-end ">
          <div className="absolute top-4 right-4 lg:top-8 lg:right-8 flex items-center justify-end gap-4">
            <Button size={"icon"} className="rounded-full">
              <Icon name="FaInstagram" className="text-md lg:text-lg" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Icon name="FaXTwitter" className="text-md lg:text-lg" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Icon name="FaYoutube" className="text-md lg:text-lg" />
            </Button>
          </div>
          <div className="flex flex-col md:flex-row  w-full items-end justify-between gap-4">
            <div className="w-full md:max-w-2xl space-y-5">
              <h1 className="text-3xl shadow-sm">Doomsday Human</h1>
              <p className="text-light/90 shadow-sm">
                In a distant future, humanity faced its greatest challenge: an
                apocalyptic event known as &quot;Doomsday.&quot; This
                cataclysmic event wiped out most of civilization, leaving the
                world in ruins. The ruins of lost humans, known as
                &quot;Doomsday Humans,&quot; are the remnants of humanity.
              </p>
            </div>
            <div className="flex  md:justify-end w-full">
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
