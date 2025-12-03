import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, Heart, ExternalLink } from 'lucide-react';
import logoImg from 'figma:asset/be2780475736cb336b192d67a3191d5c5f571cbd.png';

const contactInfo = {
  phone: '+48 509 674 129',
  email: 'wojciechbozemski@gmail.com',
  address: 'ul. Przykładowa 123, 00-001 Warszawa',
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const quickLinks = [
  { label: 'O mnie', href: '#about' },
  { label: 'Usługi', href: '#services' },
  { label: 'Media', href: '#media' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Cennik', href: '#pricing' },
  { label: 'Kontakt', href: '#contact' },
];

const legalLinks = [
  { label: 'Polityka Prywatności', href: '#privacy' },
  { label: 'Regulamin', href: '#terms' },
  { label: 'RODO', href: '#rodo' },
  { label: 'Cookies', href: '#cookies' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 overflow-hidden border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-purple-900/10" />
      
      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About & Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 relative">
                <img 
                  src={logoImg} 
                  alt="Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                />
              </div>
              <h3 className="text-white" style={{ fontSize: '1.5rem' }}>
                Wojciech Bożemski
              </h3>
            </div>
            <p className="text-white/60 mb-6 leading-relaxed" style={{ fontSize: '0.9rem' }}>
              Gabinet Terapii Naturalnych i Rozwoju Świadomości. 
              Przywracanie naturalnego przepływu energii życiowej.
            </p>
            
            {/* Newsletter */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="Twój email"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50 transition-colors"
              />
              <motion.button
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-md text-white text-sm hover:from-purple-600 hover:to-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Zapisz się
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white mb-4" style={{ fontSize: '1.1rem' }}>
              Szybkie linki
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <span className="w-1 h-1 bg-purple-400/0 group-hover:bg-purple-400 rounded-full transition-colors" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white mb-4" style={{ fontSize: '1.1rem' }}>
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="hover:text-purple-300 transition-colors"
                  style={{ fontSize: '0.9rem' }}
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Mail className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-purple-300 transition-colors break-all"
                  style={{ fontSize: '0.9rem' }}
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                <span style={{ fontSize: '0.9rem' }}>
                  {contactInfo.address}
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-purple-300 hover:border-purple-400/50 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 4: Legal & Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white mb-4" style={{ fontSize: '1.1rem' }}>
              Informacje prawne
            </h4>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Certifications Badge */}
            <motion.div
              className="p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10"
              whileHover={{ borderColor: 'rgba(167, 139, 250, 0.3)' }}
            >
              <p className="text-white/80 text-xs mb-2">Certyfikowany terapeuta</p>
              <p className="text-white/50 text-xs leading-relaxed">
                Mistrz bioenergoterapii z ponad 15-letnim doświadczeniem
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 text-sm text-center md:text-left">
            © {currentYear} Wojciech Bożemski. Wszelkie prawa zastrzeżone.
          </p>
          
          <motion.div 
            className="flex items-center gap-2 text-white/40 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span>Stworzone z</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 text-purple-400 fill-purple-400" />
            </motion.div>
            <span>dla zdrowia i harmonii</span>
          </motion.div>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <a href="#" className="hover:text-purple-300 transition-colors">PL</a>
            <span>|</span>
            <a href="#" className="hover:text-purple-300 transition-colors">EN</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
