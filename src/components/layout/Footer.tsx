import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/works" },
];

export default function Footer() {
  return (
    <footer className="bg-[#191919] text-white">
      <div className="max-w-7xl mx-auto px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <p className="font-bold text-xl tracking-tight mb-3">Dnyxstudios</p>
            <p className="text-[#98989A] text-sm leading-relaxed max-w-xs">
              Premium motion graphics for SaaS companies that want to look like they mean business.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#98989A] mb-4">
              Pages
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#E6E6E6] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#98989A] mb-4">
              Get in Touch
            </p>
            <a
              href="mailto:danny@dnyxstudios.com"
              className="text-sm text-[#E6E6E6] hover:text-white transition-colors"
            >
              danny@dnyxstudios.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#656567]">
            &copy; {new Date().getFullYear()} Dnyxstudios. All rights reserved.
          </p>
          <p className="text-xs text-[#656567]">
            Motion Graphics for SaaS
          </p>
        </div>
      </div>
    </footer>
  );
}
