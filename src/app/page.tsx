import Hero from "@/components/home/Hero";
import JoinWaitlist from "@/components/home/JoinWaitlist";
import PartnersPro from "@/components/home/Partner";
import Product from "@/components/home/Product";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="relative flex h-[40vh] bg-midnight/30 w-full items-center justify-center overflow-hidden bg-background p-20 md:shadow-xl">
        <h2 className="z-10 text-center font-display text-2xl md:text-5xl lg:text-6xl text-light font-medium">
          UNLOCK YOUR <span className="text-primary">DOOMSDAY AVATAR</span>
        </h2>
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
      <JoinWaitlist />
      <PartnersPro />
      <Product />
    </>
  );
}
