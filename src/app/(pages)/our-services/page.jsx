import React from 'react'

const services = [
  { icon: '✈️', title: 'Flight Booking', desc: 'Competitive fares and flexible options.' },
  { icon: '🏨', title: 'Hotel Reservations', desc: 'Curated stays to suit every budget.' },
  { icon: '🗺️', title: 'Custom Tours', desc: 'Tailored itineraries and local guides.' },
  { icon: '🚗', title: 'Transfers & Transport', desc: 'Reliable airport transfers & car hires.' },
  { icon: '🛡️', title: 'Travel Insurance', desc: 'Comprehensive coverage for peace of mind.' },
  { icon: '📄', title: 'Visa Assistance', desc: 'Document prep and application support.' },
]

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Services</h1>
        <p className="mt-2 text-slate-600">Everything you need for a smooth, memorable trip.</p>
      </header>

      <main>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg text-white bg-gradient-to-r from-sky-400 to-violet-600 text-xl">
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{s.desc}</p>
              <div className="mt-4">
                <button className="text-sm px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50">Learn more</button>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10 bg-gradient-to-r from-white to-slate-50 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">Ready to plan your trip?</h2>
          <p className="mt-2 text-slate-600">Contact our travel experts to start planning today.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md">Get a Quote</button>
            <button className="border border-slate-200 px-4 py-2 rounded-md hover:bg-slate-50">Contact Us</button>
          </div>
        </section>
      </main>
    </div>
  )
}
