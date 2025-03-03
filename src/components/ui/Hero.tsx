import React from 'react'
import { Button } from '@/components/Button'
import { RiArrowRightLine } from '@remixicon/react'

export function Hero() {
  return (
    <section className="relative isolate min-h-[80vh] bg-gradient-to-br from-[#f0562e] to-[#f97316] overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-2xl px-6 py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-montserrat">
            The Future of AI in Medellín
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/80 font-inter">
            Join the community shaping the future of artificial intelligence
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              variant="light"
              className="bg-white text-orange-600 hover:bg-white/90 px-6 py-3 text-base font-semibold shadow-sm transition-all duration-200"
            >
              Discover Events
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-white/90 px-6 py-3 text-base font-semibold flex items-center transition-all duration-200"
            >
              Join Community
              <RiArrowRightLine className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom wave animation */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  )
}