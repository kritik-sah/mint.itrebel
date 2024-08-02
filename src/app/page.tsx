import Hero from "@/components/home/Hero";
import JoinWaitlist from "@/components/home/JoinWaitlist";

export default async function Home() {
  return (
    <main>
      <Hero />
      <JoinWaitlist />
    </main>
  );
}
