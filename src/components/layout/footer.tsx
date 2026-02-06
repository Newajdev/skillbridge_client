import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";


export default function Footer() {
  const footerLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Browse Tutors",
      path: "/tutors",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "login/Registration",
      path: "/login",
    },
  ];

  const TopCatagorieList = [
    {
      title: "Computer Science",
      path: "#",
    },
    {
      title: "Languages",
      path: "#",
    },
    {
      title: "Physical Sciences",
      path: "#",
    },
    {
      title: "Arts & Music",
      path: "#",
    },
  ];
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="SkillBridge Logo"
                height={60}
                width={60}
              />
              <span className="text-2xl font-bold text-[#173e72]">
                SkillBridge
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Connect with expert tutors world-wide. Empowering learners to
              achieve their goals through personalized education and expert
              guidance.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-[#173e72]/5 flex items-center justify-center text-[#173e72] hover:bg-[#173e72] hover:text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-[#173e72]/5 flex items-center justify-center text-[#173e72] hover:bg-[#173e72] hover:text-white transition-all"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-[#173e72]/5 flex items-center justify-center text-[#173e72] hover:bg-[#173e72] hover:text-white transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-[#173e72]/5 flex items-center justify-center text-[#173e72] hover:bg-[#173e72] hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#173e72]">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.map(({ title, path }, idx) => (
                <li key={idx}>
                  <Link
                    href={path}
                    className="text-muted-foreground hover:text-[#173e72] font-medium transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#173e72]">Top Categories</h4>
            <ul className="space-y-4">
              {TopCatagorieList.map(({ title, path }, idx) => (
                <li key={idx}>
                  <Link
                    href={path}
                    className="text-muted-foreground hover:text-[#173e72] font-medium transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#173e72]">Stay Connected</h4>
            <div className="space-y-4">
              <div className="flex gap-4 text-muted-foreground">
                <MapPin className="h-5 w-5 text-[#173e72] shrink-0" />
                <span>123 Learning Way, Education City, 10001</span>
              </div>
              <div className="flex gap-4 text-muted-foreground">
                <Phone className="h-5 w-5 text-[#173e72] shrink-0" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex gap-4 text-muted-foreground">
                <Mail className="h-5 w-5 text-[#173e72] shrink-0" />
                <span>hello@skillbridge.com</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm font-medium">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/#" className="hover:text-[#173e72]">
              Privacy Policy
            </Link>
            <Link href="/#" className="hover:text-[#173e72]">
              Terms of Service
            </Link>
            <Link href="/#" className="hover:text-[#173e72]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
