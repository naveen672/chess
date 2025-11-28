import { Mail, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/chess-champions-logo.png"
                alt="Chess Champions Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              />
              <h3 className="text-xl font-bold">Chess Champions</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Empowering players of all ages to master chess through innovative
              teaching, interactive learning, and inspiring community
              engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/roadmap"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Learning Path
                </a>
              </li>
              <li>
                <a
                  href="/mission"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Our Mission
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <a
                  href="mailto:chesschampions100@gmail.com"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  chesschampions100@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://www.facebook.com/people/Chess-Champions-Academy/61573078659228/"
                  target="_blank"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5 text-yellow-400" />
                  Facebook
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5 text-yellow-400" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            © 2024 Chess Champions. All rights reserved. Building the next
            generation of chess masters.
          </p>
        </div>
      </div>
    </footer>
  );
}
