import React from 'react'

export default function Docs() {
  return (
    <section className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Developer Docs</h2>
      <p className="mb-4">Access CarbonTrack’s public API for emissions logging and product verification.</p>
      <ul className="list-disc list-inside">
        <li><a className="text-blue-600 underline" href="#">API Reference</a></li>
        <li><a className="text-blue-600 underline" href="#">Postman Collection</a></li>
        <li><a className="text-blue-600 underline" href="#">Authentication Guide</a></li>
      </ul>
    </section>
  )
}