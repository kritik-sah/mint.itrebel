import Hero from "@/components/home/Hero";
import JoinWaitlist from "@/components/home/JoinWaitlist";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

// import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  // const supabase = createClient();
  // const { data: notes } = await supabase.from("waitlist").select();
  return (
    <main>
      <Hero />
      <JoinWaitlist />
    </main>
  );
}
