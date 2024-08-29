import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section>
        <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
            Lacak pengeluaran Anda <br />
              <span className="text-4xl md:text-[6rem] text-primary font-bold mt-1 leading-none">
              Kendalikan uang Anda
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  className="block rounded-xl bg-primary px-12 py-3 text-sm font-medium text-white shadow sm:w-auto flex items-center gap-2"
                  href="/dashboard"
                >
                  Get Started
                  <FaArrowRight className="text-white" />
                </a>
              </div>
          </>
        }
      >
        <Image
          src={`/hero.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    </section>
  );
}

export default Hero;
