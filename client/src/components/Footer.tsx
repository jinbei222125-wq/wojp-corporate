/*
 * Design: Industrial Luxe Footer
 * - ダークな背景で重厚感
 * - ゴールドのアクセント
 * - 縦のリズムを意識した配置
 */

import { Link } from "wouter";

const footerLinks = {
  company: [
    { href: "/company", label: "会社概要" },
    { href: "/story", label: "創業秘話" },
    { href: "/news", label: "お知らせ" },
    { href: "/recruit", label: "採用情報" },
  ],
  services: [
    { href: "/service/recruit", label: "人材紹介事業" },
    { href: "/service/creative", label: "クリエイティブ事業" },
    { href: "/service/ses", label: "SES事業" },
  ],
  support: [
    { href: "/contact", label: "お問い合わせ" },
    { href: "#", label: "よくある質問" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-anthracite text-warm-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Logo & Vision */}
          <div className="md:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 mb-6 group">
                <div className="w-1 h-12 bg-brass transition-all duration-300 group-hover:h-14" />
                <span className="font-display text-3xl font-bold tracking-wider">
                  W.O.JP
                </span>
              </div>
            </Link>
            <p className="text-concrete-light leading-relaxed max-w-md mb-6">
              未経験を最強の武器へ。
              <br />
              私たちは、挑戦者の夢を実現し、共に未来を創る投資家集団です。
            </p>
            <div className="text-sm text-concrete">
              <p>〒160-0023</p>
              <p>東京都新宿区西新宿1-XX-XX</p>
              <p>新宿XXビル10F</p>
              <p className="mt-2">TEL: 03-XXXX-XXXX</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-brass mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-concrete-light hover:text-brass transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-brass mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-concrete-light hover:text-brass transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-brass mb-6">
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-concrete-light hover:text-brass transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-concrete/20">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-concrete">
            © {new Date().getFullYear()} W.O.JP Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#">
              <span className="text-sm text-concrete hover:text-brass transition-colors duration-300">
                プライバシーポリシー
              </span>
            </Link>
            <Link href="#">
              <span className="text-sm text-concrete hover:text-brass transition-colors duration-300">
                利用規約
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
