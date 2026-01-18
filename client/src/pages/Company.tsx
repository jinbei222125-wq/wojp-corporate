/*
 * Design: Industrial Luxe - 会社概要ページ
 * セクション構成:
 * 1. ページタイトル
 * 2. 代表メッセージ
 * 3. 経営理念（MVV）
 * 4. 会社情報
 * 5. 拠点一覧
 * 6. 取引先・加盟団体
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Building2, Target, Eye, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ページヒーロー
function PageHero() {
  return (
    <section className="relative pt-32 pb-20 bg-anthracite overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/hero-bg.jpg"
          alt="会社概要"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-anthracite via-anthracite/95 to-anthracite/80" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">COMPANY</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            会社概要
          </h1>
          <div className="w-20 h-1 bg-brass" />
        </motion.div>
      </div>
    </section>
  );
}

// 代表メッセージ
function CEOMessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左側：画像 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/ceo-portrait.jpg"
                alt="代表取締役 大谷まさと"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-brass/30 -z-10" />
            <div className="absolute bottom-8 left-8 right-8 bg-anthracite/90 backdrop-blur-sm p-4">
              <p className="font-display text-brass text-sm tracking-wider">FOUNDER & CEO</p>
              <p className="font-display text-white text-xl">大谷 まさと</p>
            </div>
          </motion.div>

          {/* 右側：メッセージ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">MESSAGE</span>
            <h2 className="font-display text-4xl font-bold text-foreground mb-8">
              代表メッセージ
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                「夢を語れる自信を、その手に。」
              </p>
              <p>
                大学中退、泥だらけの現場仕事。「俺の人生、こんなもんかな」と思っていた時期がありました。
                でも、営業との出会いが全てを変えました。学歴コンプレックスを跳ね返す行動量。
                「俺でもやれる」という自信が、人生を変えたのです。
              </p>
              <p>
                だから今、かつての自分のような「くすぶっている若者」の踏み台になりたい。
                W.O.JPを作った本当の理由は、そこにあります。
              </p>
              <p>
                私たちは、挑戦者の夢を実現し、共に未来を創る投資家集団です。
                あなたの「変わりたい」という想いを、全力でサポートします。
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-display text-foreground">株式会社W.O.JP</p>
              <p className="font-display text-foreground">代表取締役 <span className="text-brass">大谷 まさと</span></p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 経営理念（MVV）
function MVVSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mvv = [
    {
      icon: Target,
      label: "MISSION",
      title: "使命",
      content: "未経験者に「夢を語れる自信」を与え、人生を逆転させる機会を創出する。",
    },
    {
      icon: Eye,
      label: "VISION",
      title: "展望",
      content: "挑戦者が投資家となり、次の挑戦者を生み出す循環型エコシステムを構築する。",
    },
    {
      icon: Heart,
      label: "VALUES",
      title: "価値観",
      content: "スピードはリスペクト / 本音と現実 / 自律した意思 / 責任ある完遂 / 未来への投資",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-anthracite">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">PHILOSOPHY</span>
          <h2 className="font-display text-4xl font-bold text-white">
            経営理念
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {mvv.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 text-center group hover:border-brass/50 transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto bg-brass/10 flex items-center justify-center mb-6 group-hover:bg-brass/20 transition-colors duration-300">
                <item.icon className="text-brass" size={32} />
              </div>
              <span className="font-display text-brass text-sm tracking-[0.2em] mb-2 block">{item.label}</span>
              <h3 className="font-display text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 会社情報
function CompanyInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const companyInfo = [
    { label: "社名", value: "株式会社W.O.JP（ダブリューオージェーピー）" },
    { label: "設立", value: "2020年4月1日" },
    { label: "代表者", value: "代表取締役 大谷 まさと" },
    { label: "資本金", value: "1,000万円" },
    { label: "従業員数", value: "50名（2025年12月現在）" },
    { label: "事業内容", value: "人材紹介事業 / クリエイティブ事業 / SES事業" },
    { label: "許可番号", value: "有料職業紹介事業許可番号 13-ユ-XXXXXX" },
    { label: "所在地", value: "〒160-0023 東京都新宿区西新宿1-XX-XX 新宿XXビル10F" },
    { label: "TEL", value: "03-XXXX-XXXX" },
    { label: "FAX", value: "03-XXXX-XXXX" },
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">COMPANY INFO</span>
          <h2 className="font-display text-4xl font-bold text-foreground">
            会社情報
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border">
            <table className="w-full">
              <tbody>
                {companyInfo.map((item, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <th className="py-5 px-6 text-left font-display text-sm text-muted-foreground bg-muted/30 w-40 md:w-48">{item.label}</th>
                    <td className="py-5 px-6 text-foreground">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 拠点一覧
function OfficesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offices = [
    {
      name: "本社（東京）",
      address: "〒160-0023 東京都新宿区西新宿1-XX-XX 新宿XXビル10F",
      access: "JR新宿駅 西口より徒歩5分",
    },
    {
      name: "大阪支社",
      address: "〒530-0001 大阪府大阪市北区梅田1-XX-XX 梅田XXビル8F",
      access: "JR大阪駅より徒歩3分",
    },
    {
      name: "名古屋支社",
      address: "〒450-0002 愛知県名古屋市中村区名駅1-XX-XX 名駅XXビル5F",
      access: "JR名古屋駅より徒歩4分",
    },
    {
      name: "福岡支社",
      address: "〒812-0011 福岡県福岡市博多区博多駅前1-XX-XX 博多XXビル6F",
      access: "JR博多駅より徒歩2分",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">OFFICES</span>
          <h2 className="font-display text-4xl font-bold text-foreground">
            拠点一覧
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {offices.map((office, index) => (
            <motion.div
              key={office.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card border border-border p-6 group hover:border-brass/50 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brass/10 flex items-center justify-center shrink-0 group-hover:bg-brass/20 transition-colors duration-300">
                  <MapPin className="text-brass" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{office.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{office.address}</p>
                  <p className="text-brass text-sm">{office.access}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 取引先・加盟団体
function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const partners = [
    "株式会社〇〇",
    "△△株式会社",
    "□□グループ",
    "◇◇ホールディングス",
  ];

  const associations = [
    "一般社団法人 日本人材紹介事業協会",
    "東京商工会議所",
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16">
          {/* 主要取引先 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">PARTNERS</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              主要取引先
            </h2>
            <div className="space-y-3">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center gap-3 py-3 border-b border-border">
                  <Building2 className="text-brass" size={18} />
                  <span className="text-foreground">{partner}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">※順不同、一部抜粋</p>
          </motion.div>

          {/* 加盟団体 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-display text-brass text-sm tracking-[0.3em] mb-4 block">ASSOCIATIONS</span>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              加盟団体
            </h2>
            <div className="space-y-3">
              {associations.map((association, index) => (
                <div key={index} className="flex items-center gap-3 py-3 border-b border-border">
                  <Building2 className="text-brass" size={18} />
                  <span className="text-foreground">{association}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Company() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PageHero />
        <CEOMessageSection />
        <MVVSection />
        <CompanyInfoSection />
        <OfficesSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
