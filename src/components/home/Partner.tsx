import Image from "next/image";
import React from "react";

const PartnersPro = () => {
  return (
    <div className="my-16 lg:my-24 px-4 lg:px-0 max-w-screen-xl mx-auto">
      <h2 className="text-center text-xl lg:text-xl text-light font-medium">
        Collection Partner
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-10">
        <PartnersLogo src="/images/OpenSea.svg" alt="Opensea" />
        <PartnersLogo src="/images/readbuble.svg" alt="readbuble" />
        <PartnersLogo src="/images/teepublic.png" alt="TeePublic" />
      </div>
    </div>
  );
};

export default PartnersPro;

const PartnersLogo = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-32 h-16 lg:w-48 lg:h-16">
        <Image
          src={src}
          fill={true}
          className="object-contain  transition-all"
          loading="lazy"
          alt={alt}
        />
      </div>
    </div>
  );
};
