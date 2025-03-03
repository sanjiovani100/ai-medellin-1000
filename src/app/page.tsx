import React from 'react'
import { Hero } from '@/components/ui/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Upcoming Event {item}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join us for an exciting AI event in Medellin. Learn from experts and connect with like-minded individuals.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}