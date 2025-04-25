import React from 'react'

export default function Marketplace() {
  return (
    <section className="p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Offset Marketplace</h2>
      <p className="mb-4">Explore verified carbon offset projects and redeem credits with your points or tokens.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold">Amazon Rainforest Protection</h3>
          <p className="text-sm">Reforestation credits from Brazil</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold">Clean Cookstove Project</h3>
          <p className="text-sm">Improved biomass stoves in Kenya</p>
        </div>
      </div>
    </section>
  )
}