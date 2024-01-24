import Image from 'next/image'
import HeroImage from './assets/HeroImage2.png'
import HeroSil from './assets/HeroSil.png'
import LogoText from './assets/Logo_text.png'

export default function Home() {
  return (
    <div className='relative flex h-[calc(100vh-72px)] items-center justify-around overflow-hidden'>
      <div className='flex h-full flex-col items-center justify-center gap-4 md:items-start md:pr-[220px]'>
        <Image
          src={LogoText}
          alt='logo-text'
          height={64}
          className='rounded-lg'
        />
        <div className='flex items-center gap-3'>
          <h1 className='text-[77px] font-bold text-green-500 md:text-[144px]'>
            Flex
          </h1>
          <div className='flex flex-col'>
            <h1 className='text-[22px] font-bold md:text-[44px]'>into Shape</h1>
            <h1 className='text-[22px] font-bold md:text-[44px]'>to the Max</h1>
          </div>
        </div>
        <p className='px-12 text-center font-serif text-base leading-7 md:px-0'>
          Check out the most effective exercises and create your own
          personalized routines
        </p>
      </div>
      <Image
        className='absolute right-4 z-[-1]'
        src={HeroImage}
        alt='hero-banner'
      />
      <Image
        className='mirror-img absolute right-[-44px] top-[-64px]  z-[-2]'
        src={HeroSil}
        alt='hero-sil'
      />
    </div>
  )
}
