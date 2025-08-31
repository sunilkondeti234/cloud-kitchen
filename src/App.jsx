import React, { useEffect, useState } from 'react'
import { db } from './firebase'

// Simple script loader for Razorpay if needed
function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve()
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
    document.body.appendChild(s)
  })
}

const sampleItems = [
  { id: '1', name: 'Mango Pickle', price: 199, img: 'https://images.unsplash.com/photo-1604908176997-4312f4b05b1d?q=80&w=800&auto=format&fit=crop' },
  { id: '2', name: 'Lemon Pickle', price: 179, img: 'https://images.unsplash.com/photo-1534353428673-7472b2f5d24c?q=80&w=800&auto=format&fit=crop' },
  { id: '3', name: 'Gongura Pickle', price: 249, img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=800&auto=format&fit=crop' },
]

export default function App() {
  const [items, setItems] = useState(sampleItems)
  const [loadingPay, setLoadingPay] = useState(false)

  async function handlePay(item) {
    setLoadingPay(true)
    try {
      await loadRazorpay()
      const key = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_dkpg62pL0Kb6vs'
      const options = {
        key,
        amount: item.price * 100,
        currency: 'INR',
        name: 'Cloud Kitchen',
        description: `Buy ${item.name}`,
        image: 'https://dummyimage.com/96x96/16a34a/ffffff&text=CK',
        handler: function (response) {
          alert('Payment success: ' + response.razorpay_payment_id)
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#16a34a',
        },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoadingPay(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cloud Kitchen</h1>
          <span className="text-sm text-gray-500">Serving happiness in every bite</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Popular Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.id} className="bg-white rounded-2xl border shadow p-4 flex flex-col">
              <img src={it.img} alt={it.name} className="h-40 w-full object-cover rounded-xl mb-3" />
              <div className="flex-1">
                <h3 className="font-medium">{it.name}</h3>
                <p className="text-lg font-bold mt-1">₹{it.price}</p>
              </div>
              <button
                onClick={() => handlePay(it)}
                disabled={loadingPay}
                className="mt-4 inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
              >
                {loadingPay ? 'Opening…' : 'Buy with Razorpay'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border p-4 bg-white">
          <h3 className="font-semibold mb-2">Connect Firebase later</h3>
          <p className="text-sm text-gray-600">
            This starter includes <code>src/firebase.js</code>. Add your Firebase keys to <code>.env</code> to enable Firestore.
          </p>
          <pre className="mt-2 p-3 bg-gray-50 rounded-xl overflow-auto text-sm">
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
          </pre>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-10">
        © {new Date().getFullYear()} Cloud Kitchen
      </footer>
    </div>
  )
}
