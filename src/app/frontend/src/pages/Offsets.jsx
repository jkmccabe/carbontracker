import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Offsets() {
  const [offsets, setOffsets] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/offsets')
      .then(res => setOffsets(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Offset Projects</h2>
      <ul>
        {offsets.map(o => (
          <li key={o.offset_id}>{o.project}</li>
        ))}
      </ul>
    </div>
  )
}