import React from 'react'

export default function Hero() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-green-200 to-blue-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to CarbonTrack</h1>
      <p className="text-lg max-w-xl mx-auto">
        Track, verify, and offset emissions using blockchain, AI, and product-level insights.
      </p>
      <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700">
        Learn More
      </button>
    </section>
  )
}