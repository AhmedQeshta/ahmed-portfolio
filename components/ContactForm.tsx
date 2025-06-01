export default function ContactForm() {
  return (
    <section id="contact" className="py-20 bg-[rgba(0,0,0,0.6)] rounded-2xl">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-[linear-gradient(to-r,#ffffff,#e9d5ff,#c084fc)]">
          Contact Us
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left - Contact Info */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <p className="text-text-secondary mb-2">Phone: +970-592-175-001</p>
            <p className="text-text-secondary mb-2">Email: ahmedqeshta1999@gmail.com</p>
            <p className="text-text-secondary mb-2">Location: Gaza, Palestine</p>
          </div>

          {/* Right - Contact Form */}
          <div className="md:w-1/2">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-white mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-white mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Your message…"
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-md text-white placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[linear-gradient(to-r,#9333ea,#db2777)] rounded-full text-white hover:bg-[linear-gradient(to-r,#7c3aed,#be185d)] transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
