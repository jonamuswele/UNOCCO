import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --navy: #0B1E35;
  --navy2: #132840;
  --navy3: #1d3a56;
  --gold: #C8922A;
  --gold2: #E0B060;
  --cream: #F8F4EE;
  --cream2: #EDE8E0;
  --white: #fff;
  --text: #1C1C1C;
  --muted: #6b7280;
  --border: rgba(200,146,42,0.18);
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:var(--cream);color:var(--text);overflow-x:hidden;}
button{font-family:'Outfit',sans-serif;cursor:pointer;border:none;outline:none;}

/* ── NAV ── */
.topnav {
  position:fixed;top:0;left:0;right:0;z-index:999;
  height:68px;
  background:rgba(11,30,53,0.98);
  backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(200,146,42,0.15);
  display:flex;align-items:center;justify-content:space-between;
  padding:0 60px;
}
.tn-brand{display:flex;align-items:center;gap:12px;cursor:pointer;}
.tn-seal{
  width:40px;height:40px;border-radius:50%;
  background:linear-gradient(135deg,var(--gold),var(--gold2));
  display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',serif;font-weight:700;font-size:1.05rem;color:var(--navy);
}
.tn-name{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700;color:#fff;letter-spacing:.06em;}
.tn-name b{color:var(--gold);}
.tn-links{display:flex;align-items:center;gap:2px;}
.tn-link{
  padding:8px 20px;border-radius:4px;
  font-size:.8rem;font-weight:500;letter-spacing:.07em;text-transform:uppercase;
  color:rgba(255,255,255,.65);background:transparent;
  transition:all .2s;
}
.tn-link:hover{color:#fff;background:rgba(255,255,255,.07);}
.tn-link.on{color:var(--gold);background:rgba(200,146,42,.12);}
.tn-btn{
  padding:9px 24px;border-radius:4px;
  background:var(--gold);color:var(--navy);
  font-size:.8rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
  transition:all .2s;
}
.tn-btn:hover{background:var(--gold2);}

/* ── LAYOUT ── */
.pg{padding-top:68px;min-height:100vh;}

/* ── SHARED ── */
.tag{display:block;font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
.h1s{font-family:'Cormorant Garamond',serif;font-size:clamp(2.6rem,5vw,4rem);font-weight:700;color:#fff;line-height:1.08;margin-bottom:20px;}
.h2s{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:700;color:var(--navy);line-height:1.15;margin-bottom:18px;}
.lead{color:var(--muted);font-size:1rem;line-height:1.85;max-width:580px;}
.wrap{max-width:1240px;margin:0 auto;padding:0 60px;}

.btn-gold{background:var(--gold);color:var(--navy);padding:14px 32px;border-radius:4px;font-size:.88rem;font-weight:700;letter-spacing:.04em;transition:all .2s;display:inline-flex;align-items:center;gap:8px;}
.btn-gold:hover{background:var(--gold2);transform:translateY(-2px);}
.btn-ghost{background:transparent;color:var(--navy);padding:14px 32px;border-radius:4px;border:1.5px solid rgba(11,30,53,.2);font-size:.88rem;font-weight:500;transition:all .2s;}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);}
.btn-ghost-w{background:transparent;color:#fff;padding:14px 32px;border-radius:4px;border:1.5px solid rgba(255,255,255,.25);font-size:.88rem;font-weight:500;transition:all .2s;}
.btn-ghost-w:hover{border-color:var(--gold);color:var(--gold);}

/* reveal */
.rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease;}
.rv.on{opacity:1;transform:none;}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

/* ── FOOTER ── */
footer{background:var(--navy);border-top:1px solid rgba(200,146,42,.1);padding:56px 60px 36px;}
.ft-inner{max-width:1240px;margin:0 auto;}
.ft-top{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:60px;padding-bottom:40px;border-bottom:1px solid rgba(200,146,42,.1);}
.ft-logo{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;color:#fff;letter-spacing:.06em;margin-bottom:10px;}
.ft-logo b{color:var(--gold);}
.ft-tagline{color:rgba(255,255,255,.38);font-size:.83rem;line-height:1.75;max-width:260px;}
.ft-col h5{color:rgba(255,255,255,.38);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;margin-bottom:14px;}
.ft-lnk{display:block;color:rgba(255,255,255,.58);font-size:.85rem;margin-bottom:8px;cursor:pointer;background:none;border:none;text-align:left;transition:color .2s;}
.ft-lnk:hover{color:var(--gold2);}
.ft-bot{display:flex;justify-content:space-between;padding-top:28px;}
.ft-copy{color:rgba(255,255,255,.22);font-size:.76rem;}

/* ════════════════════════════
   HOME PAGE
════════════════════════════ */

/* hero */
.hero{position:relative;min-height:94vh;display:flex;align-items:center;background:var(--navy);overflow:hidden;}
.hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 90% at 90% 0%,rgba(200,146,42,.13) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 5% 90%,rgba(200,146,42,.07) 0%,transparent 50%);}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(200,146,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,146,42,.04) 1px,transparent 1px);background-size:64px 64px;}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr .9fr;gap:80px;align-items:center;padding:80px 60px;}
.hero-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(200,146,42,.12);border:1px solid rgba(200,146,42,.35);color:var(--gold2);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;padding:5px 14px;border-radius:20px;margin-bottom:26px;}
.hero-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;margin-top:40px;}
.hero-cards{display:flex;flex-direction:column;gap:14px;}
.hcard{background:rgba(255,255,255,.04);border:1px solid rgba(200,146,42,.18);border-radius:6px;padding:22px 26px;display:flex;align-items:center;gap:18px;transition:all .3s;}
.hcard:hover{background:rgba(200,146,42,.09);border-color:rgba(200,146,42,.45);transform:translateX(-5px);}
.hcard-ico{font-size:1.7rem;width:48px;text-align:center;flex-shrink:0;}
.hcard-big{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:var(--gold);line-height:1;}
.hcard-lbl{color:rgba(255,255,255,.5);font-size:.78rem;margin-top:2px;}

/* impact band */
.imp-band{background:var(--navy2);padding:80px 60px;}
.imp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(200,146,42,.08);border-radius:6px;overflow:hidden;margin-top:52px;}
.imp-item{background:var(--navy);padding:38px 28px;text-align:center;transition:background .3s;}
.imp-item:hover{background:var(--navy3);}
.imp-num{font-family:'Cormorant Garamond',serif;font-size:3rem;font-weight:700;color:var(--gold);line-height:1;}
.imp-lbl{color:rgba(255,255,255,.5);font-size:.82rem;margin-top:8px;line-height:1.5;}

/* approach */
.approach-sec{padding:96px 60px;}
.approach-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start;}
.pillar-list{margin-top:40px;}
.pillar{display:flex;gap:22px;padding:24px 0;border-bottom:1px solid var(--border);}
.pillar:last-child{border-bottom:none;}
.pillar:hover .pn{opacity:1;}
.pn{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:700;color:var(--gold);opacity:.22;line-height:1;min-width:44px;transition:opacity .2s;}
.pt{font-weight:600;color:var(--navy);margin-bottom:5px;}
.pd{color:var(--muted);font-size:.87rem;line-height:1.72;}

/* domains */
.domains-sec{padding:0 60px 96px;}
.dom-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:40px;}
.dom-card{border-radius:6px;overflow:hidden;border:1px solid rgba(0,0,0,.07);background:var(--white);transition:all .3s;}
.dom-card:hover{box-shadow:0 10px 36px rgba(0,0,0,.1);transform:translateY(-3px);}
.dom-img{height:180px;background:var(--navy2);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.dom-img-placeholder{font-size:3.5rem;z-index:1;}
.dom-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(11,30,53,.55) 0%,transparent 60%);}
.dom-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7;}
.dom-body{padding:22px 24px;}
.dom-ico{font-size:1.4rem;margin-bottom:10px;}
.dom-t{font-weight:700;color:var(--navy);margin-bottom:6px;font-size:.96rem;}
.dom-d{color:var(--muted);font-size:.84rem;line-height:1.7;}
.dom-img-note{position:absolute;bottom:8px;right:10px;z-index:2;background:rgba(0,0,0,.55);color:rgba(255,255,255,.6);font-size:.62rem;padding:2px 7px;border-radius:2px;letter-spacing:.04em;}

/* coordinator quote */
.quote-band{background:var(--cream2);padding:80px 60px;}
.quote-inner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.quote-box{background:var(--navy);border-radius:6px;padding:48px 44px;position:relative;overflow:hidden;}
.quote-box::before{content:'"';position:absolute;top:-30px;left:12px;font-family:'Cormorant Garamond',serif;font-size:16rem;font-weight:700;color:rgba(200,146,42,.06);line-height:1;pointer-events:none;}
.quote-txt{font-family:'Cormorant Garamond',serif;font-size:1.45rem;color:#fff;line-height:1.68;position:relative;z-index:1;margin-bottom:24px;}
.quote-by{color:var(--gold);font-size:.85rem;font-weight:500;}

/* team */
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
.team-card{background:var(--white);border-radius:6px;overflow:hidden;border:1px solid rgba(0,0,0,.07);transition:all .3s;}
.team-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.1);transform:translateY(-3px);}
.team-photo{height:200px;background:var(--navy2);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.team-photo img{width:100%;height:100%;object-fit:cover;object-position:top;}
.team-photo-placeholder{font-size:3rem;color:rgba(255,255,255,.25);}
.team-body{padding:20px 22px;}
.team-name{font-weight:700;color:var(--navy);font-size:.95rem;margin-bottom:3px;}
.team-role{color:var(--gold);font-size:.76rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px;}
.team-bio{color:var(--muted);font-size:.8rem;line-height:1.65;}

/* ════════════════════════════
   ACTIVITIES / BLOG
════════════════════════════ */
.pg-hero{background:var(--navy);padding:96px 60px 80px;position:relative;overflow:hidden;}
.pg-hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(200,146,42,.1) 0%,transparent 70%);}
.pg-hero-in{max-width:1240px;margin:0 auto;position:relative;z-index:1;}

.filters-row{display:flex;gap:8px;flex-wrap:wrap;padding:36px 60px 0;max-width:1240px;margin:0 auto;}
.flt{padding:7px 18px;border-radius:20px;font-size:.78rem;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);transition:all .2s;cursor:pointer;}
.flt:hover,.flt.on{background:var(--navy);color:#fff;border-color:var(--navy);}

.posts-wrap{max-width:1240px;margin:0 auto;padding:36px 60px 96px;}
.posts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
.pcard{background:var(--white);border-radius:6px;overflow:hidden;border:1px solid rgba(0,0,0,.07);transition:all .3s;cursor:pointer;display:flex;flex-direction:column;}
.pcard:hover{box-shadow:0 12px 40px rgba(0,0,0,.12);transform:translateY(-4px);}
.pcard-img{height:200px;background:var(--navy2);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
.pcard-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.pcard-img-ph{font-size:4rem;position:relative;z-index:1;}
.pcard-img-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(11,30,53,.5) 0%,transparent 60%);}
.pcard-cat{position:absolute;top:12px;left:12px;z-index:2;background:var(--gold);color:var(--navy);padding:3px 10px;border-radius:2px;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;}
.pcard-body{padding:22px;flex:1;}
.pcard-date{color:var(--muted);font-size:.73rem;margin-bottom:7px;}
.pcard-title{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;color:var(--navy);line-height:1.3;margin-bottom:9px;}
.pcard-exc{color:var(--muted);font-size:.84rem;line-height:1.68;}
.pcard-foot{padding:0 22px 18px;display:flex;justify-content:space-between;align-items:center;}
.pcard-tag{color:var(--gold);font-size:.75rem;font-weight:600;}
.pcard-read{color:var(--navy);font-size:.75rem;opacity:.4;}

/* article */
.art-hero{background:var(--navy);padding:96px 60px 56px;position:relative;overflow:hidden;}
.art-hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(200,146,42,.07) 0%,transparent 70%);}
.art-in{max-width:820px;margin:0 auto;position:relative;z-index:1;}
.art-back{display:flex;align-items:center;gap:8px;color:var(--gold2);font-size:.82rem;font-weight:500;cursor:pointer;background:transparent;border:none;margin-bottom:26px;}
.art-cat{display:inline-block;background:var(--gold);color:var(--navy);padding:3px 12px;border-radius:2px;font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px;}
.art-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;line-height:1.15;margin-bottom:18px;}
.art-meta{display:flex;gap:24px;color:rgba(255,255,255,.4);font-size:.8rem;}
.art-cover{height:360px;background:var(--navy2);border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;max-width:820px;margin:0 auto;}
.art-cover img{width:100%;height:100%;object-fit:cover;}
.art-cover-ph{font-size:6rem;}
.art-body-wrap{max-width:820px;margin:0 auto;padding:48px 60px 96px;}
.art-body p{color:var(--text);font-size:1rem;line-height:1.9;margin-bottom:22px;}
.art-body h2{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:700;color:var(--navy);margin:36px 0 14px;}
.art-body blockquote{border-left:3px solid var(--gold);padding:14px 22px;background:var(--cream2);border-radius:0 4px 4px 0;margin:28px 0;font-style:italic;color:var(--navy);}
.art-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:32px;}
.art-tag-pill{background:var(--cream2);color:var(--navy);padding:4px 14px;border-radius:20px;font-size:.75rem;font-weight:500;}

/* ════════════════════════════
   MEMBERS PAGE
════════════════════════════ */
.mem-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;padding:56px 60px 96px;max-width:1240px;margin:0 auto;}
.mcard{background:var(--white);border-radius:6px;overflow:hidden;border:1px solid rgba(0,0,0,.07);transition:all .3s;cursor:pointer;}
.mcard:hover{box-shadow:0 12px 40px rgba(0,0,0,.1);transform:translateY(-3px);}
.mcard-head{background:var(--navy);padding:28px 32px;display:flex;align-items:center;gap:20px;}
.mcard-av{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold2));display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:.75rem;color:var(--navy);text-align:center;line-height:1.2;flex-shrink:0;}
.mcard-nm{font-weight:700;color:#fff;font-size:.95rem;line-height:1.4;margin-bottom:3px;}
.mcard-loc{color:var(--gold2);font-size:.76rem;}
.mcard-body{padding:24px 32px;}
.mcard-desc{color:var(--muted);font-size:.86rem;line-height:1.75;margin-bottom:14px;}
.sec-pills{display:flex;flex-wrap:wrap;gap:6px;}
.sec-pill{background:var(--cream2);color:var(--navy);padding:3px 11px;border-radius:20px;font-size:.7rem;font-weight:500;}
.mcard-foot{padding:0 32px 22px;}
.mcard-cta{color:var(--gold);font-size:.78rem;font-weight:600;}

/* member detail */
.mdet-hero{background:var(--navy);padding:96px 60px 56px;position:relative;overflow:hidden;}
.mdet-hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 100% 50%,rgba(200,146,42,.1) 0%,transparent 60%);}
.mdet-in{max-width:1240px;margin:0 auto;position:relative;z-index:1;}
.mdet-body{max-width:1240px;margin:0 auto;padding:56px 60px 96px;display:grid;grid-template-columns:1.5fr 1fr;gap:56px;}
.info-box{background:var(--white);border-radius:6px;padding:32px;border:1px solid rgba(0,0,0,.07);height:fit-content;position:sticky;top:88px;}
.info-box h4{font-family:'Cormorant Garamond',serif;font-size:1.25rem;color:var(--navy);margin-bottom:18px;}
.irow{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid var(--cream2);}
.irow:last-child{border-bottom:none;}
.ilbl{color:var(--muted);font-size:.75rem;min-width:88px;padding-top:1px;}
.ival{color:var(--navy);font-size:.87rem;font-weight:500;}

/* ════════════════════════════
   CONTACT PAGE
════════════════════════════ */
.contact-wrap{max-width:1240px;margin:0 auto;padding:64px 60px 96px;display:grid;grid-template-columns:1fr 1.2fr;gap:72px;}
.cinfo-list{display:flex;flex-direction:column;gap:13px;margin-top:6px;}
.cinfo-row{display:flex;gap:15px;align-items:flex-start;background:var(--white);padding:20px 22px;border-radius:5px;border:1px solid rgba(0,0,0,.07);}
.cinfo-ico{font-size:1.2rem;flex-shrink:0;}
.cinfo-lbl{color:var(--muted);font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;}
.cinfo-val{color:var(--navy);font-size:.9rem;font-weight:500;}
.cf{display:flex;flex-direction:column;gap:14px;}
.cf label{color:var(--navy);font-size:.73rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:5px;}
.cf input,.cf select,.cf textarea{width:100%;background:var(--white);border:1.5px solid rgba(0,0,0,.1);border-radius:4px;padding:12px 15px;font-family:'Outfit',sans-serif;font-size:.9rem;color:var(--navy);outline:none;transition:border-color .2s;}
.cf input:focus,.cf select:focus,.cf textarea:focus{border-color:var(--gold);}
.cf textarea{height:120px;resize:none;}
.cf-2{display:grid;grid-template-columns:1fr 1fr;gap:13px;}
.success-box{background:linear-gradient(135deg,#d4edda,#c3e6cb);border:1px solid #28a745;border-radius:5px;padding:40px;text-align:center;}
.success-box .ico{font-size:2.5rem;margin-bottom:10px;}
.success-box h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;color:#155724;margin-bottom:8px;}
.success-box p{color:#155724;font-size:.88rem;}

/* ── HAMBURGER ── */
.ham{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;cursor:pointer;background:transparent;padding:4px;}
.ham span{display:block;height:2px;border-radius:2px;background:#fff;transition:all .3s;}
.ham.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.ham.open span:nth-child(2){opacity:0;}
.ham.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
.mob-menu{
  display:none;position:fixed;top:68px;left:0;right:0;z-index:998;
  background:rgba(11,30,53,.99);
  backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(200,146,42,.2);
  flex-direction:column;padding:12px 0 20px;
}
.mob-menu.open{display:flex;}
.mob-link{
  padding:14px 28px;font-size:.9rem;font-weight:500;
  color:rgba(255,255,255,.75);background:transparent;
  text-align:left;letter-spacing:.06em;text-transform:uppercase;
  border-bottom:1px solid rgba(255,255,255,.05);transition:all .2s;
}
.mob-link:hover,.mob-link.on{color:var(--gold);background:rgba(200,146,42,.08);}
.mob-cta{margin:10px 28px 0;padding:13px;border-radius:4px;background:var(--gold);color:var(--navy);font-weight:700;font-size:.88rem;text-align:center;letter-spacing:.05em;}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .topnav{padding:0 20px;}
  .tn-links,.tn-btn{display:none;}
  .ham{display:flex;}

  /* page hero text */
  .pg-hero{padding:80px 24px 56px;}
  .pg-hero-in{text-align:center;}
  .pg-hero-in .h1s{font-size:2.4rem;}
  .pg-hero-in p{margin:0 auto;}

  /* article / member detail hero */
  .art-hero,.mdet-hero{padding-left:24px;padding-right:24px;}
  .art-in,.mdet-in{text-align:left;}

  /* home */
  .hero-inner{grid-template-columns:1fr;gap:40px;padding:72px 24px 56px;}
  .hero-cards{display:none;}
  .approach-sec{padding:64px 24px;}
  .approach-grid{grid-template-columns:1fr;gap:40px;}
  .domains-sec{padding:0 24px 64px;}
  .quote-band{padding:64px 24px;}
  .quote-inner{grid-template-columns:1fr;gap:40px;}
  .imp-band{padding:64px 24px;}
  .imp-grid{grid-template-columns:repeat(2,1fr);}
  .dom-grid{grid-template-columns:1fr;}
  .team-grid{grid-template-columns:1fr;}

  /* blog */
  .filters-row{padding:24px 20px 0;}
  .posts-wrap{padding:28px 20px 72px;}
  .posts-grid{grid-template-columns:1fr;}
  .art-body-wrap{padding:36px 20px 72px;}

  /* members */
  .mem-grid{padding:32px 20px 64px;grid-template-columns:1fr;}
  .mdet-body{padding:40px 20px 72px;grid-template-columns:1fr;gap:32px;}

  /* contact */
  .contact-wrap{padding:48px 20px 72px;grid-template-columns:1fr;gap:40px;}
  .cf-2{grid-template-columns:1fr;}

  /* footer */
  footer{padding:40px 20px 28px;}
  .ft-top{grid-template-columns:1fr;gap:28px;}
  .ft-bot{flex-direction:column;gap:8px;}

  .wrap{padding:0 20px;}
}
`;

/* ── DATA ── */
const POSTS = [
  { id:1, cat:"Terrain", emoji:"🌾", title:"Distribution alimentaire d'urgence à Kwamouth : 450 familles secourues", date:"15 avril 2026", author:"Direction UNOCCO",
    excerpt:"Face à la crise humanitaire persistante dans le Plateau de Kwamouth, l'UNOCCO a coordonné une opération conjointe entre plusieurs ONG membres pour distribuer des vivres d'urgence à 450 familles déplacées.",
    content:"Face à la crise humanitaire persistante dans le Plateau de Kwamouth, l'UNOCCO a coordonné une opération conjointe impliquant l'ADKP-ASBL, la CVJ et deux partenaires locaux. En moins de 72 heures, 450 familles déplacées ont reçu des rations alimentaires pour 15 jours.\n\nCette intervention illustre parfaitement la valeur ajoutée d'un consortium : là où une seule ONG aurait pu atteindre 80 à 100 familles, la coordination UNOCCO a multiplié l'impact par quatre.\n\n\"Sans la coordination de l'UNOCCO, nous n'aurions jamais pu couvrir autant de foyers en si peu de temps\", a témoigné le responsable de l'ADKP-ASBL.",
    tags:["Aide humanitaire","Kwamouth","Coordination"] },
  { id:2, cat:"Santé", emoji:"🏥", title:"Campagne de vaccination au Kivu — 1 200 bénéficiaires", date:"3 mars 2026", author:"SEDHAKI / UNOCCO",
    excerpt:"La SEDHAKI, membre fondatrice de l'UNOCCO, a mené une vaste campagne de vaccination et d'éducation sanitaire dans les zones rurales du Kivu, avec l'appui technique du consortium.",
    content:"La campagne, organisée sur deux semaines dans cinq villages du territoire de Kalehe, a permis de vacciner plus de 800 enfants contre la rougeole et de sensibiliser 400 adultes aux bonnes pratiques d'hygiène.\n\nL'UNOCCO a apporté un appui technique à la rédaction du projet et a facilité la mise en contact de la SEDHAKI avec un partenaire médical pour la fourniture des vaccins.",
    tags:["Santé","Kivu","Vaccination"] },
  { id:3, cat:"Formation", emoji:"📚", title:"Atelier de renforcement des capacités — 8 ONG formées", date:"22 février 2026", author:"Direction Technique UNOCCO",
    excerpt:"L'UNOCCO a organisé son premier atelier interne de formation à destination de ses membres fondateurs, portant sur la gouvernance, la gestion de projets et la conformité légale.",
    content:"Pendant deux jours, les représentants des 8 ONG fondatrices ont suivi des modules de formation intensifs couvrant la gouvernance associative, la rédaction de projets, la gestion financière transparente et les démarches légales en RDC.\n\nCes ateliers seront organisés trimestriellement pour accompagner la montée en compétences progressive de toutes les ONG du réseau.",
    tags:["Formation","Gouvernance","Capacités"] },
  { id:4, cat:"Agriculture", emoji:"🌱", title:"Premier projet d'économie circulaire entre membres lancé", date:"10 janvier 2026", author:"Direction de Programme UNOCCO",
    excerpt:"Trois ONG membres ont été mises en relation par l'UNOCCO pour créer une chaîne de valeur locale autour du manioc, reliant producteurs, transformateurs et distributeurs.",
    content:"L'UNOCCO a initié sa première expérience d'économie circulaire en mettant en réseau trois ONG complémentaires : l'ODM (production agricole), une ONG de transformation alimentaire, et un groupement de commercialisation à Kinshasa.\n\nCe modèle, replicable pour d'autres filières, sera documenté et partagé avec l'ensemble du réseau.",
    tags:["Agriculture","Économie circulaire","Revenus"] },
  { id:5, cat:"Gouvernance", emoji:"📋", title:"Adoption de la Constitution de l'UNOCCO : un jalon historique", date:"8 mai 2026", author:"Secrétariat Général UNOCCO",
    excerpt:"Lors d'une Assemblée générale virtuelle, les membres fondateurs ont officiellement validé et signé la Constitution du consortium, posant les fondations institutionnelles de l'organisation.",
    content:"L'Assemblée générale virtuelle du 8 mai 2026 a marqué un tournant décisif. Les représentants des 8 ONG fondatrices, connectés depuis Kinshasa, le Kivu et Sankuru, ont validé à l'unanimité le texte constitutionnel.\n\nLe Coordonnateur Emmanuel KALEMA a salué \"un moment fondateur qui donne à l'UNOCCO les bases légales pour agir avec encore plus d'efficacité au service de nos communautés\".",
    tags:["Gouvernance","Constitution","Institutionnel"] },
  { id:6, cat:"Plaidoyer", emoji:"🎤", title:"L'UNOCCO représente ses membres au Forum national des ONG", date:"28 avril 2026", author:"Direction UNOCCO",
    excerpt:"Le Coordonnateur de l'UNOCCO a participé au Forum national des ONG à Kinshasa, portant la voix du réseau et nouant des connexions stratégiques avec des bailleurs internationaux.",
    content:"Le Forum national des ONG de la RDC a accueilli pour la première fois une délégation de l'UNOCCO. Plusieurs pistes de collaboration ont été explorées, dont un possible appui à un programme de formation certifiante pour les cadres des ONG membres.\n\nCette participation illustre la vocation de l'UNOCCO à être un porte-voix collectif pour les ONG locales.",
    tags:["Plaidoyer","Partenariats","Kinshasa"] },
];

const MEMBERS = [
  { id:1, abbr:"ODM", name:"Organisation pour le Développement de Mpasa-Maba", location:"Kinshasa — Commune de N'sele", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
    desc:"L'ODM intervient dans le développement économique et social des communautés rurales de Mpasa-Maba. Elle promeut des pratiques agricoles durables, soutient les petits exploitants locaux, développe des filières génératrices de revenus et mène des actions humanitaires pour améliorer la sécurité alimentaire et les conditions de vie des ménages. L'organisation accorde une attention particulière à l'éducation, à l'assainissement et à l'autonomisation des femmes.",
    secteurs:["Agriculture durable","Sécurité alimentaire","Action humanitaire","Éducation","Assainissement","Autonomisation des femmes"] },
  
  { id:2, abbr:"SJLC", name:"La Synergie des Jeunes Leaders Congolais", location:"Kinshasa", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
    desc:"La SJLC est un mouvement de jeunesse dédié à la formation d'une génération de leaders patriotiques et engagés. L'organisation œuvre pour l'éveil de la conscience citoyenne, la promotion de l'excellence éducative et le développement d'actions sociales au bénéfice des communautés vulnérables. À travers ses programmes, elle encourage l'engagement civique et l'autonomisation des jeunes et des femmes congolais.",
    secteurs:["Patriotisme","Éducation","Action sociale","Humanitaire","Autonomisation des femmes"] },
  
  { id:3, abbr:"ADKP", name:"Association des Déplacés de Guerre de Kwamouth et du Plateau en Général", location:"Kwamouth — Maï-Ndombe", province:"Maï-Ndombe", statut:"Membre fondateur", depuis:"2026",
    desc:"L'ADKP-ASBL se consacre à l'assistance humanitaire et à la protection des populations déplacées par les conflits intercommunautaires dans la région de Kwamouth et du Plateau. Elle mène des actions d'urgence en matière d'agriculture, d'élevage et de santé, tout en développant des programmes d'appui technique, d'autonomisation des femmes et d'assistance aux réfugiés. L'organisation travaille également à la consolidation de la paix, à la médiation et à la réintégration durable des personnes affectées.",
    secteurs:["Aide humanitaire","Agriculture","Élevage","Santé","Protection des déplacés","Cohésion sociale","Réintégration","Autonomisation des femmes"] },
  
  { id:4, abbr:"CNPA-RDC", name:"Conseil National pour la Promotion de l'Anglais en RDC", location:"Kinshasa", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
    desc:"Le CNPA-RDC est une organisation spécialisée dans l'enseignement et la promotion de la langue anglaise comme outil de développement et d'ouverture internationale. Elle offre des programmes de formation linguistique adaptés aux besoins des étudiants, des professionnels et des institutions congolaises. L'organisation contribue ainsi au renforcement des capacités des jeunes et à leur insertion dans un environnement mondialisé, tout en favorisant les échanges culturels et académiques.",
    secteurs:["Éducation","Promotion de l'anglais","Renforcement des capacités","Insertion professionnelle"] },
  
  { id:5, abbr:"CAIDEFEC", name:"Conseil d'Appui aux Initiatives de Développement de la Femme Congolaise", location:"Kinshasa", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
    desc:"Le CAIDEFEC est une organisation dédiée à l'accompagnement des femmes congolaises vers l'autonomie économique et sociale. Elle intervient dans les secteurs agro-pastoral, l'assistance aux femmes vulnérables et le développement d'initiatives génératrices de revenus. L'organisation forme, conseille et soutient les femmes dans la création et la gestion de leurs activités, contribuant ainsi à la réduction de la pauvreté et à l'égalité des chances.",
    secteurs:["Agro-pastoral","Autonomisation des femmes","Assistance sociale","Génération de revenus"] },
  
  { id:6, abbr:"CAFP", name:"Coopérative Agricole des Femmes Paysannes", location:"Kinshasa", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
    desc:"La CAFP est une coopérative qui regroupe des femmes paysannes engagées dans l'agriculture durable et le développement communautaire. Elle promeut des techniques culturales modernes, facilite l'accès aux intrants agricoles et accompagne ses membres dans la commercialisation de leurs productions. L'organisation offre également des programmes d'alphabétisation, de formation en gestion et d'autonomisation, permettant aux femmes rurales de devenir des actrices économiques à part entière.",
    secteurs:["Agriculture","Développement communautaire","Éducation","Autonomisation des femmes","Commercialisation agricole"] },
  
  { id:7, abbr:"BWINO", name:"BWINO-ASBL", location:"Kinshasa", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
    desc:"BWINO-ASBL est une organisation polyvalente qui intervient dans l'éducation, l'action humanitaire et la consolidation de la paix. Elle mène des programmes de résolution pacifique des conflits, soutient les moyens de subsistance des communautés vulnérables et œuvre pour la cohésion sociale. L'organisation met un accent particulier sur la formation des jeunes à la paix, l'assistance aux personnes affectées par les crises et le développement de solutions durables pour l'amélioration des conditions de vie.",
    secteurs:["Éducation","Action humanitaire","Résolution des conflits","Moyens de subsistance","Consolidation de la paix"] },
  
  { id:8, abbr:"SEDHAKI", name:"Service Sanitaire, Évangélique et de Défense des Droits de l'Homme et des Agriculteurs au Kivu", location:"Kivu (Sud & Nord)", province:"Sud-Kivu / Nord-Kivu", statut:"Membre fondateur", depuis:"2026",
    desc:"La SEDHAKI offre des services intégrés de santé communautaire, de défense des droits humains et de développement agricole dans les zones rurales du Kivu. Elle accompagne les communautés agricoles dans leurs revendications foncières, leur accès aux droits fondamentaux et leur résilience face aux conflits. L'organisation développe également des programmes de microcrédit, de gouvernance locale, de consolidation de la paix et d'éducation, contribuant ainsi à la stabilisation et au développement durable de l'est de la RDC.",
    secteurs:["Santé communautaire","Droits humains","Agriculture","Gouvernance","Consolidation de la paix","Résolution des conflits","Microcrédit","Éducation","Moyens de subsistance"] },

  { id:9, abbr:"CVJ", name:"Communauté Victoire en Jésus", location:"Kinshasa — Kingasani", province:"Kinshasa", statut:"Membre fondateur", depuis:"2026",
  desc:"La CVJ est une organisation confessionnelle à vocation sociale implantée à Kingasani. Elle conjugue action évangélique et développement communautaire à travers des formations, l'encadrement des jeunes et l'accompagnement des familles vulnérables. L'organisation œuvre pour l'épanouissement spirituel et matériel des communautés, en mettant un accent particulier sur l'éducation, l'assistance aux personnes démunies et la promotion des valeurs de solidarité et de partage.",
  secteurs:["Développement communautaire","Formation des jeunes","Action sociale","Assistance aux familles vulnérables"] },
];

const TEAM = [
  { name:"Mr. Emmanuel KALEMA KABULU", role:"Coordonnateur", bio:"Porteur de la vision de l'UNOCCO, il orchestre les relations institutionnelles et stratégiques du consortium avec les partenaires nationaux et internationaux." },
  { name:"Mr. Achilles KABUNDU", role:"Coordonnateur Adjoint", bio:"Bras droit du Coordonnateur, il assure la continuité opérationnelle du consortium et supervise le suivi des engagements pris envers les membres." },
  { name:"Mr. Jonathan KALEME MUSWELE", role:"Directeur Technique", bio:"Responsable de l'appui technique aux membres, il pilote la rédaction de projets, le partage d'opportunités de financement et la stratégie numérique de l'UNOCCO." },
  { name:"Mr. BASILWANGO Félicien", role:"Directeur de Programme", bio:"Il supervise la mise en œuvre des programmes du consortium, définit les modalités de contribution et assure le suivi des projets des membres." },
  { name:"Mr. Amédée LUMBE MAKUNU ", role:"Directeur de Coordination et Relations", bio:"Il coordonnes les activités internes, il definit les modalités de cohésion et collaboration entre les membres et assure le suivi avec les differentes partenaires." },
  { name:"Mr. Rodrigue MANDO ", role:"Directeur de l'Analyse et Audit", bio:"Il assure la transparence et l'audit des activités du consortium. " },
  { name:"Mr. MAYAKA Inanga Guyene ", role:"Secretaire General", bio:"Il document et archive les documents et activités du consortium. Il informe les membres sur les activités et les décisions du consortium." },
  { name:"Ms. Gunumina Kabesa Colette  ", role:"Directeur en charge de la Mobilisation", bio:"Elle met en place les mécanismes de contribution, organise des levées de fonds, mobilise les communautés, appuie les campagnes financières." },

];

/* ── HELPERS ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }), { threshold: 0.08 });
    const els = document.querySelectorAll(".rv");
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ── NAV ── */
function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  const links = [["home","Accueil"],["activities","Activités"],["members","Membres ONG"],["contact","Nous Contacter"]];
  const nav = (id) => { go(id); setOpen(false); };
  return (
    <>
      <nav className="topnav">
        <div className="tn-brand" onClick={() => nav("home")}>
          <div className="tn-seal">U</div>
          <div className="tn-name">UN<b>OC</b>CO</div>
        </div>
        <div className="tn-links">
          {links.map(([id, lbl]) => (
            <button key={id} className={`tn-link${page === id ? " on" : ""}`} onClick={() => nav(id)}>{lbl}</button>
          ))}
        </div>
        <button className="tn-btn" onClick={() => nav("contact")}>Rejoindre →</button>
        <button className={`ham${open ? " open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mob-menu${open ? " open" : ""}`}>
        {links.map(([id, lbl]) => (
          <button key={id} className={`mob-link${page === id ? " on" : ""}`} onClick={() => nav(id)}>{lbl}</button>
        ))}
        <button className="mob-cta" onClick={() => nav("contact")}>Rejoindre le réseau →</button>
      </div>
    </>
  );
}

/* ── FOOTER ── */
function Footer({ go }) {
  return (
    <footer>
      <div className="ft-inner">
        <div className="ft-top">
          <div>
            <div className="ft-logo">UN<b>OC</b>CO</div>
            <div className="ft-tagline">Union des ONG Communautaire au Congo — Kinshasa, République Démocratique du Congo</div>
          </div>
          <div className="ft-col">
            <h5>Navigation</h5>
            {[["home","Accueil"],["activities","Activités"],["members","Membres ONG"],["contact","Nous Contacter"]].map(([id,lbl]) => (
              <button key={id} className="ft-lnk" onClick={() => go(id)}>{lbl}</button>
            ))}
          </div>
          <div className="ft-col">
            <h5>Contact</h5>
            <span className="ft-lnk" style={{cursor:"default"}}>Av. MASWA n°47, Kingasani</span>
            <span className="ft-lnk" style={{cursor:"default"}}>Kinshasa, RDC</span>
            <span className="ft-lnk" style={{cursor:"default"}}>Coordonnateur : Emmanuel KALEMA</span>
          </div>
        </div>
        <div className="ft-bot">
          <div className="ft-copy">© 2026 UNOCCO. Tous droits réservés.</div>
          <div className="ft-copy">Sauver des vies · Améliorer les moyens de subsistance · Unir les ONG</div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════
   PAGE : HOME
══════════════════════════════ */
function Home({ go }) {
  useReveal();
  return (
    <div className="pg">
      {/* HERO */}
      <div className="hero">
        <div className="hero-glow"/><div className="hero-grid"/>
        <div className="hero-inner wrap" style={{paddingTop:80,paddingBottom:80,display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:80,alignItems:"center"}}>
          <div>
            <div className="hero-pill"><div className="hero-dot"/>Kinshasa · Kivu · Sankuru · Maï-Ndombe</div>
            <h1 className="h1s">Des communautés<br /><span style={{color:"var(--gold)"}}>sauvées</span> par<br />des ONG unies.</h1>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:"1.03rem",lineHeight:1.82,maxWidth:520}}>
              L'UNOCCO coordonne les organisations de la société civile congolaise pour maximiser leur impact — sauver des vies, améliorer les moyens de subsistance et transformer les communautés les plus vulnérables de la RDC.
            </p>
            <div className="hero-btns">
              <button className="btn-gold" onClick={() => go("activities")}>Voir nos actions →</button>
              <button className="btn-ghost-w" onClick={() => go("members")}>Nos membres ONG</button>
            </div>
          </div>
          <div className="hero-cards">
            {[{n:"10+",l:"ONG membres coordonnées"},{n:"4+",l:"Provinces couvertes en RDC"},{n:"2 000+",l:"Bénéficiaires directs en 2026"}].map((c,i) => (
              <div className="hcard" key={i}>
                <div className="hcard-ico">{c.ico}</div>
                <div><div className="hcard-big">{c.n}</div><div className="hcard-lbl">{c.l}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMPACT */}
      <div className="imp-band">
        <div className="wrap">
          <span className="tag" style={{color:"var(--gold2)"}}>Notre impact collectif</span>
          <h2 className="h2s" style={{color:"#fff"}}>Ensemble, nous faisons la différence</h2>
        </div>
        <div className="wrap">
          <div className="imp-grid">
            {[{n:"450+",l:"Familles nourries lors de la crise de Kwamouth"},{n:"1 200",l:"Bénéficiaires de campagnes de santé au Kivu"},{n:"8",l:"ONG renforcées institutionnellement"},{n:"3",l:"Chaînes de valeur agricoles créées entre membres"}].map((s,i) => (
              <div className="imp-item rv" key={i}>
                <div className="imp-num">{s.n}</div>
                <div className="imp-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* APPROACH */}
      <div className="approach-sec">
        <div className="wrap">
          <div className="approach-grid">
            <div>
              <span className="tag">Notre approche</span>
              <h2 className="h2s">Comment l'UNOCCO amplifie l'impact des ONG</h2>
              <p className="lead">Chaque ONG membre est déjà engagée dans sa communauté. L'UNOCCO vient multiplier cet engagement — en ouvrant des portes, en coordonnant les efforts et en plaçant les ressources au bon endroit.</p>
              <div className="pillar-list">
                {[{t:"Coordonner sans dupliquer",d:"Nous cartographions les interventions de nos membres pour éviter les chevauchements et maximiser la couverture géographique et thématique."},
                  {t:"Ouvrir l'accès aux financements",d:"Nos membres reçoivent en temps réel les appels à projets et opportunités que l'UNOCCO identifie, et bénéficient d'un appui à la rédaction."},
                  {t:"Créer des synergies durables",d:"Nous mettons en réseau des ONG complémentaires — producteurs, transformateurs, distributeurs — pour créer des chaînes de valeur qui profitent à tous."}].map((p,i) => (
                  <div className="pillar rv" key={i}>
                    <div className="pn">0{i+1}</div>
                    <div><div className="pt">{p.t}</div><div className="pd">{p.d}</div></div>
                  </div>
                ))}
              </div>
            </div>
            {/* DOMAINS */}
            <div>
              <span className="tag">Domaines d'action</span>
              <h2 className="h2s" style={{fontSize:"1.9rem"}}>Ce que nous faisons concrètement</h2>
              <div className="dom-grid">
                {[{ico:"🌾",t:"Sécurité alimentaire",d:"Agriculture, distributions alimentaires, chaînes de valeur locales."},{ico:"🏥",t:"Santé communautaire",d:"Campagnes de vaccination, éducation sanitaire, accès aux soins."},{ico:"🛡️",t:"Protection des droits",d:"Défense des déplacés, des femmes et des communautés vulnérables."},{ico:"📚",t:"Éducation & Formation",d:"Renforcement des ONG et des communautés qu'elles servent."}].map((f,i) => (
                  <div className="dom-card rv" key={i}>
                    <div className="dom-img">
                      {/* Image placeholder — replace src="" with actual image URL */}
                      <div className="dom-img-placeholder">{f.ico}</div>
                      <div className="dom-img-overlay"/>
                      
                    </div>
                    <div className="dom-body">
                      <div className="dom-t">{f.t}</div>
                      <div className="dom-d">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUOTE + TEAM */}
      <div className="quote-band">
        <div className="wrap">
          {/* Quote on top */}
          <div className="quote-box rv" style={{ maxWidth: "800px", margin: "0 auto 64px auto" }}>
            <div className="quote-txt">"L'UNOCCO est là pour que chaque ONG puisse aller plus loin, toucher plus de gens, et laisser une empreinte durable dans sa communauté."</div>
            <div className="quote-by">— M. Emmanuel KALEMA KABULU, Coordonnateur de l'UNOCCO</div>
          </div>
          
          {/* Team section */}
          <div>
            <span className="tag">Notre équipe de direction</span>
            <h2 className="h2s" style={{ fontSize: "2rem", textAlign: "center" }}>Les personnes derrière la vision</h2>
            <div className="team-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "24px", 
              marginTop: "48px" 
            }}>
              {TEAM.map((m, i) => (
                <div className="team-card rv" key={i} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div className="team-photo" style={{ height: "200px", flexShrink: 0 }}>
                    <div className="team-photo-placeholder">👤</div>
                    <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", zIndex: 2 }}>
                      <span style={{ background: "rgba(0,0,0,.5)", color: "rgba(255,255,255,.5)", fontSize: ".58rem", padding: "2px 8px", borderRadius: 2, letterSpacing: ".04em" }}>-</span>
                    </div>
                  </div>
                  <div className="team-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                    <div className="team-bio" style={{ 
                      overflow: "hidden", 
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      lineHeight: "1.65",
                      maxHeight: "calc(1.65em * 3)"
                    }}>{m.bio}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:var_navy,padding:"80px 60px",textAlign:"center"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <span className="tag" style={{color:"var(--gold2)",display:"block",textAlign:"center"}}>Rejoindre le réseau</span>
          <h2 className="h2s" style={{color:"#fff",textAlign:"center"}}>Votre ONG peut changer encore plus de vies.</h2>
          <p style={{color:"rgba(255,255,255,.5)",lineHeight:1.8,marginBottom:32}}>Si vous êtes une organisation active en RDC et partagez notre vision, l'UNOCCO vous invite à rejoindre un réseau qui vous soutiendra, vous formera et vous ouvrira des portes.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-gold" onClick={() => go("contact")}>Devenir membre →</button>
            <button className="btn-ghost-w" onClick={() => go("members")}>Voir les membres</button>
          </div>
        </div>
      </div>

      <Footer go={go}/>
    </div>
  );
}

const var_navy = "var(--navy)";

/* ══════════════════════════════
   PAGE : ACTIVITIES
══════════════════════════════ */
function Activities({ go }) {
  const [filter, setFilter] = useState("Tous");
  const [open, setOpen] = useState(null);
  useReveal();

  const cats = ["Tous","Terrain","Santé","Formation","Agriculture","Gouvernance","Plaidoyer"];
  const list = filter === "Tous" ? POSTS : POSTS.filter(p => p.cat === filter);

  useEffect(() => { window.scrollTo(0,0); }, [open]);

  if (open) {
    const post = POSTS.find(p => p.id === open);
    return (
      <div className="pg">
        <div className="art-hero">
          <div className="art-in">
            <button className="art-back" onClick={() => setOpen(null)}>← Retour aux activités</button>
            <div className="art-cat">{post.cat}</div>
            <div className="art-title">{post.title}</div>
            <div className="art-meta"><span>📅 {post.date}</span><span>✍️ {post.author}</span></div>
          </div>
        </div>
        <div style={{maxWidth:820,margin:"0 auto",padding:"0 60px"}}>
          <div className="art-cover" style={{marginTop:40}}>
            {/* Image placeholder — replace with: <img src="URL" alt="..." /> */}
            <div className="art-cover-ph">{post.emoji}</div>
            <div style={{position:"absolute",bottom:12,right:14,background:"rgba(0,0,0,.5)",color:"rgba(255,255,255,.55)",fontSize:".65rem",padding:"3px 10px",borderRadius:2}}>-</div>
          </div>
        </div>
        <div className="art-body-wrap">
          <div className="art-body">
            {post.content.split("\n\n").map((para,i) =>
              para.startsWith('"') ? <blockquote key={i}>{para}</blockquote> : <p key={i}>{para}</p>
            )}
          </div>
          <div className="art-tags">{post.tags.map(t => <span className="art-tag-pill" key={t}>{t}</span>)}</div>
          <div style={{marginTop:44,paddingTop:28,borderTop:"1px solid var(--cream2)",display:"flex",gap:14}}>
            <button className="btn-gold" onClick={() => setOpen(null)}>← Retour aux activités</button>
            <button className="btn-ghost" onClick={() => go("contact")}>Nous soutenir</button>
          </div>
        </div>
        <Footer go={go}/>
      </div>
    );
  }

  return (
    <div className="pg">
      <div className="pg-hero">
        <div className="pg-hero-in">
          <span className="tag" style={{color:"var(--gold2)"}}>Sur le terrain</span>
          <h1 className="h1s" style={{ textAlign: "center" }}>Nos activités &amp;<br/>celles de nos membres</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:"1rem",lineHeight:1.82,maxWidth:540, marginRight: "auto", marginLeft: "auto"}}>Découvrez les actions concrètes menées par l'UNOCCO et ses organisations membres pour transformer la vie des communautés à travers la RDC.</p>
        </div>
      </div>
      <div className="filters-row">
        {cats.map(c => <button key={c} className={`flt${filter===c?" on":""}`} onClick={() => setFilter(c)}>{c}</button>)}
      </div>
      <div className="posts-wrap">
        <div className="posts-grid">
          {list.map((post,i) => (
            <div className={`pcard rv d${(i%4)+1}`} key={post.id} onClick={() => setOpen(post.id)}>
              <div className="pcard-img">
                {/* Image placeholder — replace with: <img src="URL" alt="..." /> */}
                <div className="pcard-img-ph">{post.emoji}</div>
                <div className="pcard-img-ov"/>
                <div className="pcard-cat">{post.cat}</div>
              </div>
              <div className="pcard-body">
                <div className="pcard-date">{post.date}</div>
                <div className="pcard-title">{post.title}</div>
                <div className="pcard-exc">{post.excerpt}</div>
              </div>
              <div className="pcard-foot">
                <span className="pcard-tag">{post.tags[0]}</span>
                <span className="pcard-read">Lire →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

/* ══════════════════════════════
   PAGE : MEMBERS
══════════════════════════════ */
function Members({ go }) {
  const [open, setOpen] = useState(null);
  useReveal();
  useEffect(() => { window.scrollTo(0,0); }, [open]);

  if (open) {
    const m = MEMBERS.find(x => x.id === open);
    return (
      <div className="pg">
        <div className="mdet-hero">
          <div className="mdet-in">
            <button className="art-back" onClick={() => setOpen(null)}>← Retour aux membres</button>
            <div style={{display:"flex",alignItems:"center",gap:26,marginTop:18}}>
              <div className="mcard-av" style={{width:72,height:72,fontSize:".85rem",flexShrink:0}}>{m.abbr}</div>
              <div>
                <div className="art-cat">{m.statut}</div>
                <div className="art-title" style={{fontSize:"clamp(1.6rem,3vw,2.5rem)",marginBottom:10}}>{m.name}</div>
                <div className="art-meta"><span>📍 {m.location}</span><span>🗓️ Membre depuis {m.depuis}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mdet-body">
          <div>
            <h2 className="h2s" style={{fontSize:"1.75rem",marginBottom:16}}>À propos de {m.abbr}</h2>
            <p style={{color:"var(--muted)",lineHeight:1.88,fontSize:"1rem",marginBottom:28}}>{m.desc}</p>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",color:"var(--navy)",marginBottom:12}}>Secteurs d'intervention</h3>
            <div className="sec-pills" style={{marginBottom:32}}>{m.secteurs.map(s => <span className="sec-pill" key={s}>{s}</span>)}</div>

            {/* Zone localisation */}
            {/*<div style={{background:"var(--cream2)",borderRadius:6,padding:28,marginBottom:28}}>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",color:"var(--navy)",marginBottom:12}}>Zone d'intervention</h3>
              <div style={{background:"var(--navy2)",borderRadius:4,height:180,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                
                <span style={{color:"rgba(255,255,255,.3)",fontSize:".8rem",letterSpacing:".06em"}}>📍 Carte — {m.province}</span>
                <span style={{position:"absolute",bottom:8,right:10,background:"rgba(0,0,0,.5)",color:"rgba(255,255,255,.45)",fontSize:".6rem",padding:"2px 8px",borderRadius:2}}>Intégrer une carte Google Maps ici</span>
              </div>
            </div>*/}

            <button className="btn-gold" onClick={() => go("contact")}>Collaborer avec {m.abbr} →</button>
          </div>
          <div>
            <div className="info-box">
              <h4>Informations</h4>
              {[["Sigle",m.abbr],["Province",m.province],["Localisation",m.location],["Statut",m.statut],["Membre depuis",m.depuis]].map(([l,v]) => (
                <div className="irow" key={l}><div className="ilbl">{l}</div><div className="ival">{v}</div></div>
              ))}
            </div>
          </div>
        </div>
        <Footer go={go}/>
      </div>
    );
  }

  return (
    <div className="pg">
      <div className="pg-hero">
        <div className="pg-hero-in">
          <span className="tag" style={{color:"var(--gold2)"}}>Le réseau UNOCCO</span>
          <h1 className="h1s" style={{ textAlign: "center" }}>Nos organisations<br/>membres</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:"1rem",lineHeight:1.82,maxWidth:540, marginRight: "auto", marginLeft: "auto"}}>Chaque membre de l'UNOCCO est une organisation engagée, ancrée dans sa communauté, qui œuvre chaque jour pour améliorer les conditions de vie des populations congolaises. Cliquez sur une ONG pour découvrir ses activités.</p>
        </div>
      </div>
      <div className="mem-grid">
        {MEMBERS.map((m,i) => (
          <div className={`mcard rv d${(i%2)+1}`} key={m.id} onClick={() => setOpen(m.id)}>
            <div className="mcard-head">
              <div className="mcard-av">{m.abbr}</div>
              <div><div className="mcard-nm">{m.name}</div><div className="mcard-loc">📍 {m.location}</div></div>
            </div>
            <div className="mcard-body">
              <div className="mcard-desc">{m.desc.substring(0,155)}…</div>
              <div className="sec-pills">{m.secteurs.map(s => <span className="sec-pill" key={s}>{s}</span>)}</div>
            </div>
            <div className="mcard-foot"><span className="mcard-cta">Découvrir {m.abbr} →</span></div>
          </div>
        ))}
      </div>
      {/* Join CTA */}
      <div style={{maxWidth:1240,margin:"0 auto",padding:"0 60px 96px"}}>
        <div style={{background:"var(--navy)",borderRadius:6,padding:"48px 52px",textAlign:"center"}}>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.9rem",color:"#fff",marginBottom:12}}>Votre ONG peut rejoindre le réseau</h3>
          <p style={{color:"rgba(255,255,255,.5)",maxWidth:480,margin:"0 auto 28px",lineHeight:1.8}}>L'UNOCCO accueille de nouvelles organisations partageant sa vision. Contactez-nous pour les modalités d'adhésion.</p>
          <button className="btn-gold" onClick={() => go("contact")}>Soumettre une candidature →</button>
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

/* ══════════════════════════════
   PAGE : CONTACT
══════════════════════════════ */
function Contact({ go }) {
  const [form, setForm] = useState({nom:"",org:"",email:"",objet:"adhesion",msg:""});
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const submit = e => { e.preventDefault(); setSent(true); setForm({nom:"",org:"",email:"",objet:"adhesion",msg:""}); setTimeout(()=>setSent(false),6000); };

  return (
    <div className="pg">
      <div className="pg-hero">
        <div className="pg-hero-in">
          <span className="tag" style={{color:"var(--gold2)"}}>Entrer en contact</span>
          <h1 className="h1s" style={{ textAlign: "center" }}>Parlons de votre<br/>engagement.</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:"1rem",lineHeight:1.82,maxWidth:520, marginRight: "auto", marginLeft: "auto"}}>Que vous souhaitiez rejoindre le réseau, proposer un partenariat ou simplement en savoir plus sur nos activités — nous sommes à votre écoute.</p>
        </div>
      </div>
      <div className="contact-wrap">
        <div>
          <span className="tag">Nos coordonnées</span>
          <div className="cinfo-list">
            {[{ico:"📍",l:"Siège social",v:"Av. MASWA n°47, Kingasani, Kinshasa — RDC"},
              {ico:"👤",l:"Coordonnateur",v:"M. Emmanuel KALEMA KABULU"},
              {ico:"🌍",l:"Zones d'intervention",v:"Kinshasa · Kivu · Sankuru · Maï-Ndombe"}].map((c,i) => (
              <div className="cinfo-row" key={i}>
                <div className="cinfo-ico">{c.ico}</div>
                <div><div className="cinfo-lbl">{c.l}</div><div className="cinfo-val">{c.v}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="tag">Formulaire de contact</span>
          <h2 className="h2s" style={{marginBottom:28}}>Envoyez-nous un message</h2>
          {sent ? (
            <div className="success-box">
              <div className="ico">✅</div>
              <h3>Message reçu !</h3>
              <p>Merci de nous avoir contactés. L'équipe UNOCCO reviendra vers vous dans les meilleurs délais.</p>
            </div>
          ) : (
            <form className="cf" onSubmit={submit}>
              <div className="cf-2">
                <div><label>Nom complet *</label><input value={form.nom} onChange={e=>set("nom",e.target.value)} placeholder="Votre nom" required/></div>
                <div><label>Organisation</label><input value={form.org} onChange={e=>set("org",e.target.value)} placeholder="Nom de votre ONG"/></div>
              </div>
              <div><label>E-mail *</label><input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="votre@email.com" required/></div>
              <div>
                <label>Objet</label>
                <select value={form.objet} onChange={e=>set("objet",e.target.value)}>
                  <option value="adhesion">Demande d'adhésion</option>
                  <option value="partenariat">Proposition de partenariat</option>
                  <option value="financement">Opportunité de financement</option>
                  <option value="info">Demande d'information</option>
                  <option value="presse">Demande presse / médias</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div><label>Message *</label><textarea value={form.msg} onChange={e=>set("msg",e.target.value)} placeholder="Décrivez votre demande…" required/></div>
              <button type="submit" className="btn-gold" style={{justifyContent:"center",width:"100%"}}>Envoyer →</button>
            </form>
          )}
        </div>
      </div>
      <Footer go={go}/>
    </div>
  );
}

/* ══════════════════════════════
   ROOT APP
══════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const go = p => { setPage(p); setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),10); };

  return (
    <>
      <style>{CSS}</style>
      <Nav page={page} go={go}/>
      {page === "home"       && <Home go={go}/>}
      {page === "activities" && <Activities go={go}/>}
      {page === "members"    && <Members go={go}/>}
      {page === "contact"    && <Contact go={go}/>}
    </>
  );
}
