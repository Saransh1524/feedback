import Image from "next/image";
import Navbar from "./components/navbar";
export default function Home() {
  return (
    <>
    
    <div className="text-8xl font-bold font-sans justify-center mt-20">
      <div className="text-center">Get testimonials from your customers with ease</div>
    </div>

    <div className="font-bold text-4xl font-mono mt-10"><p className="text-center">Trusted customers</p>
      <div className="grid grid-cols-4 gap-4">
      <Image
      src="/feedback.com/public/img1.jpeg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
     <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
    <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
    <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
    <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
    <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
    <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />
    <Image
      src="/images/my-image.jpg"
      alt="Picture of a cat"
      width={500}
      height={300}
    />

      </div>
    </div>
    </>
  );
}
