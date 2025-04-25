import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Tracked Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.product_id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}