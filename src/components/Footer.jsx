import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-6 text-center">
      <p>&copy; 2025 CarbonTrack. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:underline">Whitepaper</a>
        <a href="#" className="hover:underline">GitHub</a>
        <a href="#" className="hover:underline">Contact</a>
      </div>
    </footer>
  )
}