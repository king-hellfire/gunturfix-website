import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Wrench, Thermometer, Droplets, Wind, Send, CheckCircle, Clock, Mail, MessageCircle } from 'lucide-react';

// Helper component for Brand Logos
const BrandLogo = ({ name, domain, index }) => {
  const [error, setError] = useState(false);

  // If no domain or error loading image, show text pill
  if (error || !domain) {
    return (
      <div 
        className="flex items-center justify-center px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 min-w-[100px] animate-fade-in-up"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <span className="text-sm font-bold text-gray-700">{name}</span>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 w-28 h-24 hover:shadow-md transition-all hover:-translate-y-1 group animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${name} logo`}
        className="max-w-[80px] max-h-[40px] object-contain mb-2 opacity-80 group-hover:opacity-100 transition-opacity"
        onError={() => setError(true)}
      />
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{name}</span>
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'AC Repair',
    area: '',
    address: '',
    issue: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactNumber = "7287095374";
  const contactEmail = "syikamraghava20@gmail.com";

  const services = [
    {
      title: "AC Repair & Service",
      icon: <Wind className="w-8 h-8 text-blue-500" />,
      description: "Gas charging, filter cleaning, and compressor repair for all brands in Guntur's heat.",
      price: "Starts at ₹299"
    },
    {
      title: "Refrigerator Repair",
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      description: "Fixing cooling issues, thermostat replacements, and gas leaks for single/double door fridges.",
      price: "Starts at ₹399"
    },
    {
      title: "Washing Machine",
      icon: <Droplets className="w-8 h-8 text-indigo-500" />,
      description: "Repairing drum issues, motor failures, and PCB board problems for Top & Front load.",
      price: "Starts at ₹349"
    }
  ];

  const repairImages = [
    { src: "image_0.png", alt: "Technician repairing a front-load washing machine" },
    { src: "image_3.png", alt: "Technician checking AC outdoor unit with gauges" },
    { src: "image_1.png", alt: "Smiling technician with clipboard next to a washing machine" },
    { src: "image_4.png", alt: "Technician using a multimeter on an AC unit" },
    { src: "image_2.png", alt: "Technician cleaning an AC indoor unit filter" },
  ];

  // Map Brand Names to Domains for Logo API
  const brandDomains = {
    "LG": "lg.com",
    "Voltas": "myvoltas.com",
    "Daikin": "daikin.com",
    "Samsung": "samsung.com",
    "Panasonic": "panasonic.com",
    "O General": "generalindia.com",
    "Mitsubishi": "mitsubishielectric.com",
    "Blue Star": "bluestarindia.com",
    "Carrier": "carrier.com",
    "Hitachi": "hitachi.com",
    "Onida": "onida.com",
    "Bosch": "bosch.com",
    "IFB": "ifbappliances.com",
    "Whirlpool": "whirlpool.com",
    "Haier": "haier.com",
    "Godrej": "godrej.com"
  };

  const brandLists = {
    ac: ["LG", "Voltas", "Daikin", "Samsung", "Panasonic", "O General", "Mitsubishi", "Blue Star", "Carrier", "Hitachi", "Onida"],
    washingMachine: ["Bosch", "IFB", "Panasonic", "Whirlpool", "Samsung", "LG", "Haier", "Godrej", "Voltas"],
    refrigerator: ["Whirlpool", "Samsung", "LG", "Godrej", "Panasonic", "Haier"]
  };

  const generateMessage = () => {
    return `*New Service Request via GunturFix Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Service:* ${formData.service}\n` +
      `*Area:* ${formData.area}\n` +
      `*Address:* ${formData.address}\n` +
      `--------------------------------\n` +
      `Please confirm availability.`;
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return; 

    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${contactNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
        const form = e.target.closest('form');
        if (form) form.reportValidity();
        return;
    }

    const message = generateMessage().replace(/\*/g, '').replace(/\n/g, '%0D%0A');
    const mailtoLink = `mailto:${contactEmail}?subject=Service Request from ${formData.name}&body=${message}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const areas = [
    "Guntur City (All Areas)",
    "Brodipet",
    "Arundelpet",
    "Gorantla",
    "Vidyanagar",
    "Mangalagiri",
    "Tenali",
    "Tadepalli",
    "Amaravati",
    "Pedakakani",
    "Namburu",
    "Ponnur",
    "Tadikonda",
    "Perecherla",
    "Etukuru",
    "Budampadu"
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; 
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .hover-scale { transition: transform 0.3s ease; }
        .hover-scale:hover { transform: scale(1.03); }
      `}</style>

      {/* Header */}
      <nav className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 animate-fade-in-up">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wrench className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-blue-900">Guntur<span className="text-blue-600">Fix</span></span>
          </div>
          <div className="hidden md:flex space-x-8 font-medium animate-fade-in-up animate-delay-100">
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#book" className="hover:text-blue-600 transition">Book Now</a>
            <a href={`tel:+91${contactNumber}`} className="flex items-center text-blue-600 font-bold">
              <Phone className="w-4 h-4 mr-2" /> +91 {contactNumber}
            </a>
          </div>
          <a href="#book" className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-fade-in-up">Book</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-20 px-4 overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-800 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block bg-blue-800 text-blue-200 px-4 py-1 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
              #1 Repair Service in Guntur
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up animate-delay-100">
              Expert Repairs at Your Doorstep in <span className="text-blue-400">Guntur & 30km Radius</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-lg animate-fade-in-up animate-delay-200">
              Reliable technicians for AC, Refrigerator, and Washing Machines. Serving Guntur, Tenali, Mangalagiri, and Amaravati.
            </p>
            <div className="flex space-x-4 animate-fade-in-up animate-delay-300">
              <a href="#book" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg">
                Book a Repairman
              </a>
              <a href={`tel:+91${contactNumber}`} className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                Call Now
              </a>
            </div>
          </div>
          <div id="book" className="md:w-1/3 bg-white text-gray-900 p-8 rounded-2xl shadow-2xl animate-slide-in-right animate-delay-300 transform transition-all hover:scale-[1.01]">
            <h3 className="text-2xl font-bold mb-4 border-b pb-2">Quick Booking</h3>
            <form className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold mb-1 group-focus-within:text-blue-600 transition-colors">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter name"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold mb-1 group-focus-within:text-blue-600 transition-colors">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="group">
                  <label className="block text-sm font-semibold mb-1 group-focus-within:text-blue-600 transition-colors">Appliance</label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option>AC Repair</option>
                    <option>Refrigerator</option>
                    <option>Washing Machine</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold mb-1 group-focus-within:text-blue-600 transition-colors">Area</label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                  >
                    <option value="">Select Area</option>
                    {areas.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold mb-1 group-focus-within:text-blue-600 transition-colors">Full Address / Landmark</label>
                <textarea
                  required
                  rows="2"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="House No, Street, Landmark (for hassle-free service)"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3 pt-2">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition shadow-md flex items-center justify-center space-x-2 transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book via WhatsApp</span>
                </button>

                <button 
                  onClick={handleEmail}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition shadow-sm flex items-center justify-center space-x-2 transform active:scale-95"
                >
                  <Mail className="w-5 h-5" />
                  <span>Book via Email</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Clicking will open your App to send the request.
              </p>

              {submitted && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg flex items-center text-sm font-medium animate-fade-in-up">
                  <CheckCircle className="w-4 h-4 mr-2" /> App opened! Please hit 'Send'.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Professional Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Providing high-quality repair solutions for all major household appliances across Guntur and surrounding towns.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:rotate-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{s.description}</p>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-blue-600 font-bold">{s.price}</span>
                <button className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Learn More →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Work Gallery */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Experts at Work</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {repairImages.map((img, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${i * 100 + 300}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in-up">Authorized Brand Service</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            Specialized repair & maintenance for all major international and indian brands.
          </p>
          
          <div className="space-y-12">
            {/* AC Brands */}
            <div className="bg-blue-50 p-8 rounded-3xl animate-fade-in-up animate-delay-200">
              <div className="flex items-center mb-6 text-blue-900 border-b border-blue-100 pb-4">
                <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                  <Wind className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl">Air Conditioner Brands</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {brandLists.ac.map((brand, i) => (
                  <BrandLogo key={i} name={brand} domain={brandDomains[brand]} index={i} />
                ))}
              </div>
            </div>

            {/* Refrigerator Brands */}
            <div className="bg-red-50 p-8 rounded-3xl animate-fade-in-up animate-delay-300">
              <div className="flex items-center mb-6 text-red-900 border-b border-red-100 pb-4">
                 <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                  <Thermometer className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-xl">Refrigerator Brands</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {brandLists.refrigerator.map((brand, i) => (
                  <BrandLogo key={i} name={brand} domain={brandDomains[brand]} index={i} />
                ))}
              </div>
            </div>

            {/* Washing Machine Brands */}
            <div className="bg-indigo-50 p-8 rounded-3xl animate-fade-in-up animate-delay-400">
              <div className="flex items-center mb-6 text-indigo-900 border-b border-indigo-100 pb-4">
                 <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                  <Droplets className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-xl">Washing Machine Brands</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {brandLists.washingMachine.map((brand, i) => (
                  <BrandLogo key={i} name={brand} domain={brandDomains[brand]} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="w-10 h-10 text-blue-600 mb-4" />, title: "180 Min Arrival", desc: "Quick response in Guntur & nearby towns." },
              { icon: <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />, title: "Verified Pros", desc: "Expert technicians for all major brands." },
              { icon: <MapPin className="w-10 h-10 text-blue-600 mb-4" />, title: "30km Radius", desc: "Serving Tenali, Mangalagiri, & more." },
              { icon: <Wrench className="w-10 h-10 text-blue-600 mb-4" />, title: "Service Warranty", desc: "30 days on work & up to 6 months on spare parts." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center hover-scale animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                {item.icon}
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-6">
              <Wrench className="text-blue-400 w-6 h-6" />
              <span className="text-2xl font-bold tracking-tight">GunturFix</span>
            </div>
            <p className="text-blue-200">The most trusted appliance repair platform serving Guntur, Andhra Pradesh.</p>
          </div>
          <div className="animate-fade-in-up animate-delay-100">
            <h4 className="font-bold text-lg mb-6">Service Locations</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-blue-200">
              <li>• Guntur City</li>
              <li>• Mangalagiri</li>
              <li>• Tenali</li>
              <li>• Amaravati</li>
              <li>• Pedakakani</li>
              <li>• Namburu</li>
              <li>• Ponnur</li>
              <li>• Tadikonda</li>
            </ul>
          </div>
          <div className="animate-fade-in-up animate-delay-200">
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <p className="text-blue-200 mb-3 flex items-center">
              <Phone className="w-4 h-4 mr-2" /> 
              <a href={`tel:+91${contactNumber}`} className="hover:text-white transition">+91 {contactNumber}</a>
            </p>
            <p className="text-blue-200 mb-3 flex items-center">
              <Mail className="w-4 h-4 mr-2" /> 
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition">{contactEmail}</a>
            </p>
            <p className="text-blue-200 flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-1 min-w-4" /> 
              <a href="https://maps.google.com/?q=16.312944,80.439167" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                16°18'46.6"N 80°26'21.0"E<br/>
                Guntur District, Andhra Pradesh
              </a>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-blue-800 mt-12 pt-8 text-center text-sm text-blue-400">
          © {new Date().getFullYear()} GunturFix Home Services. All rights reserved.
        </div>
      </footer>
      
      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 md:hidden z-50">
        <a href={`tel:+91${contactNumber}`} className="bg-green-500 text-white p-4 rounded-full shadow-2xl animate-bounce">
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default App;