import Image from "next/image";
import HeroImage from './assets/HeroImage2.png'
import HeroSil from './assets/HeroSil.png'
import LogoText from './assets/Logo_text.png'

export default function Home() {
  return (
    <div className="flex justify-around items-center h-[calc(100vh-72px)] overflow-hidden relative">
      <div className="flex flex-col justify-center gap-4 h-full md:pr-[220px]">
        <Image src={LogoText} alt="logo-text" height={64} className="rounded-lg" />
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-[144px] text-green-500">Flex</h1>
          <div className="flex flex-col">
            <h1 className="font-bold text-[44px]">into Shape</h1>
            <h1 className="font-bold text-[44px]">to the Max</h1>
          </div>
        </div>
        <p className="text-base font-serif leading-7">
          Check out the most effective exercises and create your own personalized routines
        </p>
        
      </div>
      <Image className="absolute right-4 z-[-1]" src={HeroImage} alt="hero-banner"/>
      <Image className="absolute right-[-44px] top-[-64px] z-[-2]  mirror-img" src={HeroSil} alt="hero-sil"/>
    </div>
  );
}
