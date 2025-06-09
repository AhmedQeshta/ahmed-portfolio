import ContactForm from '@/components/Contact/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-section-glass rounded-2xl">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 gradient-text">Contact Us</h2>

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
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
