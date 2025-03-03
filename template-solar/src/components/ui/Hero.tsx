import { RiArrowRightUpLine, RiArrowRightLine } from "@remixicon/react"
import { FadeContainer, FadeDiv, FadeSpan } from "../Fade"
import GameOfLife from "./HeroBackground"
import { Button } from "../Button"

export function Hero() {
  return (
    <section 
      aria-label="hero" 
      className="relative isolate px-6 pt-14 lg:px-8 min-h-[80vh] bg-gradient-to-br from-[#f0562e] to-[#f97316]"
    >
      <FadeContainer className="relative flex flex-col items-center justify-center">
        <FadeDiv className="mx-auto">
          <a
            aria-label="View latest news"
            href="#"
            className="mx-auto w-full"
          >
            <div className="inline-flex max-w-full items-center gap-3 rounded-full bg-white/10 px-2.5 py-0.5 pr-3 pl-0.5 font-medium text-white ring-1 shadow-lg shadow-orange-500/20 ring-white/20 filter backdrop-blur-[1px] transition-colors hover:bg-white/15 focus:outline-hidden sm:text-sm">
              <span className="shrink-0 truncate rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-sm text-white sm:text-xs">
                News
              </span>
              <span className="flex items-center gap-1 truncate">
                <span className="w-full truncate">
                  Smart Irrigation System Launch
                </span>
                <RiArrowRightUpLine className="size-4 shrink-0 text-white" />
              </span>
            </div>
          </a>
        </FadeDiv>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="mt-8 text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
              <FadeSpan>The Future of AI</FadeSpan>{" "}
              <FadeSpan>in Medellín</FadeSpan>
            </h1>
            <p className="mt-6 text-center text-lg leading-8 text-white/80">
              <FadeSpan>Join the community shaping the future</FadeSpan>{" "}
              <FadeSpan>of artificial intelligence</FadeSpan>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <FadeDiv>
                <Button
                  variant="primary"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  Discover Events
                </Button>
              </FadeDiv>
              <FadeDiv>
                <Button
                  variant="secondary"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  Join Community
                  <RiArrowRightLine className="ml-2 h-4 w-4" />
                </Button>
              </FadeDiv>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <GameOfLife />
        </div>
      </FadeContainer>
    </section>
  )
}
