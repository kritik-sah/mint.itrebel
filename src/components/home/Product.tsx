import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: 1,
    title: "Bucket Hat",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/buckethat.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 2,
    title: "Cat Mat",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/catmat.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 3,
    title: "Fit T-shirt",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/fit-t-shirt.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 4,
    title: "Hat",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/hat.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 5,
    title: "Magnet / Stickers",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/magnet.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 6,
    title: "Mouse pad",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/mouse-pad.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 7,
    title: "Pullover Hoodie",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/pullover-hoodie.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 8,
    title: "Pullover Sweatshirt",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/pullover-sweatshirt.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 9,
    title: "T-shirt",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/t-shirt.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
  {
    id: 10,
    title: "Tote Bag",
    description: "A stylish bucket hat for all your needs.",
    image: "/images/merch/tote-bag.jpg",
    link: "https://www.redbubble.com/shop/ap/163415465",
  },
];

const Product = () => {
  return (
    <div className="relative px-4 my-16 lg:my-24 overflow-hidden">
      <div className="flex my-6 w-full flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-center text-white">
          Collection Merch
        </h2>
        <p>
          Over 64 kind of official merchandise are avilable. Checkout our
          printing and distribution Partners.
        </p>
      </div>
      <div className="flex w-full max-w-screen-2xl mx-auto flex-col justify-center">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4 mx-auto justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,#ffffff90,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  );
};

export default Product;

interface ProductCardProps {
  title: string;
  description?: string;
  image: string;
  link: string;
}
const ProductCard = ({ title, description, image, link }: ProductCardProps) => {
  return (
    <Link href={link} target="_blank">
      <div className="relative max-w-sm border border-light/5 bg-midnight shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
        <div className="overflow-x-hidden rounded-2xl relative">
          <img
            className="h-full rounded-2xl w-full object-cover grayscale-[70%] opacity-90 hover:opacity-100 hover:grayscale-0 transition-all ease-in-out duration-300"
            src={image}
            // "https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
          />
          <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 group-hover:opacity-50 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </p>
        </div>
        <div className="mt-4 pl-2 mb-2 flex justify-between">
          <div>
            <p className="text-lg font-semibold text-light mb-0">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
