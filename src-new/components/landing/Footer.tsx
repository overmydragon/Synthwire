'use client';

import Link from 'next/link';

const footerLinks = {
  product: [
    { label: 'Discovery', href: '/discovery' },
    { label: 'Digest Builder', href: '/digest' },
    { label: 'Archive Search', href: '/archive' },
    { label: 'Workspaces', href: '/workspace' },
    { label: 'Pricing', href: '/pricing' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/docs/api' },
    { label: 'MCP Spec', href: '/docs/mcp' },
    { label: 'Community', href: '/community' },
    { label: 'Status', href: '/status' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
    { label: 'Cookies', href: '/cookies' },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/synthwire', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.724H15.3l-5.455-6.277L.755 21.75H4.037l5.89-6.763 5.754 7.557H23.25L11.952 2.25h2.475L23.25 12.463l-6.065 5.81 7.16 7.527h-3.31l-7.1-7.64-8.17 9.144H2.099l8.76-9.854-8.43-9.626h3.498l7.35 8.224zm-12.95.75v18.75h3.308l-3.308-18.75zm-1.254 0v18.75h3.55l-3.55-18.75z"/></svg>
  )},
  { label: 'GitHub', href: 'https://github.com/synthwire', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
  )},
  { label: 'Discord', href: 'https://discord.gg/synthwire', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.682 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 6.02 3.217.077.077 0 0 0 .084-.028c1.314-.94 2.553-2.423 3.385-3.798a.07.07 0 0 1 .084-.014.07.07 0 0 0 .031-.09 13.107 13.107 0 0 1-1.872-4.718.07.07 0 0 1 .018-.085 14.439 14.439 0 0 1 1.873-4.747.071.071 0 0 1 .081-.023c1.445.79 2.89 1.891 3.92 3.422a.077.077 0 0 1-.029.105 12.89 12.89 0 0 1-2.07 3.72.074.074 0 0 1-.088.015 18.395 18.395 0 0 1-3.887-1.137.07.07 0 0 0-.077.038 22.27 22.27 0 0 0-1.543 3.177.063.063 0 0 0 .021.076c1.893 1.42 4.309 2.165 6.433 2.175a.07.07 0 0 0 .063-.044 22.96 22.96 0 0 0 5.389-4.037.074.074 0 0 0-.039-.113C23.61 14.597 24.216 9.52 20.348 4.41a.07.07 0 0 0-.031-.04zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418z"/></svg>
  )},
  { label: 'Email', href: 'mailto:help@synthwire.email', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
  )},
];

export function Footer() {
  return (
    <footer className="bg-violet-950/50 backdrop-blur-2xl border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-medium text-xl mb-4" aria-label="Synthwire home">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#grad)"/>
                <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
              <span>Synthwire</span>
            </Link>
            <p className="text-violet-400 text-sm mb-6 max-w-xs">
              Build a high-signal brief on any topic. Continuous discovery. Human controls. Source transparency.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="text-violet-400 hover:text-white transition-colors" aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-violet-400 hover:text-white text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-violet-400 hover:text-white text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-violet-400 hover:text-white text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-violet-400 hover:text-white text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-violet-500 text-sm">
            © {new Date().getFullYear()} Synthwire. Built for researchers, by researchers.
          </p>
          <p className="text-violet-500 text-sm">
            Not another newsletter aggregator.
          </p>
        </div>
      </div>
    </footer>
  );
}