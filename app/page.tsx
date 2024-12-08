"use client";
import { useState } from "react";
import { TShirtCanvas } from "@/components/t-shirt-canvas";

const tshirtColors = ["white", "black", "navy", "red"];
const boxColors = ["green", "black", "blue", "red", "skyBlue"] as const;
const sizes = ["S", "M", "L", "XL", "XXL"] as const;
const animationPatterns = ["matrix", "pulse", "galaxy", "plasma"] as const;

export default function Home() {
  const [tshirtColor, setTshirtColor] = useState<(typeof tshirtColors)[number]>(
    tshirtColors[0]
  );
  const [boxColor, setBoxColor] = useState<(typeof boxColors)[number]>(
    boxColors[0]
  );
  const [size, setSize] = useState<(typeof sizes)[number]>(sizes[1]);
  const [animationPattern, setAnimationPattern] = useState<
    (typeof animationPatterns)[number]
  >(animationPatterns[1]);

  const [activeTab, setActiveTab] = useState<
    "controls" | "archives" | "personnel"
  >("controls");

  // Create a separate component for the t-shirt viewer
  function TShirtViewer() {
    return (
      <TShirtCanvas
        tShirtColor={tshirtColor}
        boxColor={boxColor}
        animationPattern={animationPattern}
        size={size}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-100px)] flex flex-col">
        {/* Background Image */}

        {/* Main Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-4">
          {/* New Background Layers */}
          <div className="absolute inset-0 bg-black px-4 pt-4">
            <div className="bg-[#EE1133] h-full rounded-t-2xl rounded-b-none">
              {/* Base Leather Texture */}
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.5'/%3E%3C/svg%3E"), 
                    url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='circles'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.2' numOctaves='4'/%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23circles)' opacity='0.7'/%3E%3C/svg%3E")`,
                  backgroundSize: "100px 100px, 200px 200px",
                }}
              />
              {/* Leather Wrinkles */}
              <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wrinkles'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.15' numOctaves='2'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wrinkles)' opacity='0.8'/%3E%3C/svg%3E")`,
                  backgroundSize: "300px 300px",
                }}
              />
              {/* Leather Highlights */}
              <div
                className="absolute inset-0 mix-blend-soft-light"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.3) 100%), 
                    repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 4px)`,
                  backgroundSize: "400px 400px, 8px 8px",
                }}
              />
            </div>
          </div>

          {/* Animated Line */}
          <div className="relative z-10 w-[2px] h-20 bg-gradient-to-b from-transparent via-[#ff0000] to-transparent animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.7)] shadow-[#ff0000] mix-blend-screen" />

          {/* Main Title */}
          <h1 className="relative z-10 text-white text-[12vw] font-bold tracking-tighter leading-none">
            SUPREME
          </h1>

          {/* Animated Subheadline */}
          <div className="relative z-10 mt-8 text-white/80 text-center">
            <p className="text-sm md:text-base uppercase tracking-[0.3em] animate-fade-in">
              FW 2024 Collection
            </p>
            <p className="mt-2 text-xs md:text-sm font-light tracking-wider animate-slide-up">
              Redefining Streetwear Excellence
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-white/60 text-xs tracking-widest animate-bounce">
              SCROLL
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>

        {/* Side Elements */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 text-white/60 vertical-text">
          <div className="flex flex-col gap-4 text-xs tracking-widest">
            <span>EST.</span>
            <span>1994</span>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 text-white/60">
          <div className="flex flex-col gap-4 items-end text-xs tracking-widest">
            <span>NYC</span>
            <span>×</span>
            <span>TOKYO</span>
          </div>
        </div>

        {/* Corner Elements */}
        <div className="absolute top-8 left-8 text-white/80">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none animate-pulse">
            {`
    ╔═══╗  *  ˚
    ║███║ *✧⋆
    ╚═══╝  ⋆ ˚
            `}
          </pre>
        </div>

        {/* New Christmas Decorations */}
        <div className="absolute top-4 left-1/4 text-green-500/40 animate-twinkle">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none">
            {`   ╱╲
   ╱──╲
  ╱────╲
 ╱──────╲
╱────────╲
    ║║
    ║║    `}
          </pre>
        </div>

        <div className="absolute bottom-32 right-1/4 text-red-500/40 rotate-12">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none animate-swing">
            {` ╭─────╮
 │ H H 
 │ O O │
 ╰────╯
   ╱╲`}
          </pre>
        </div>

        <div className="absolute top-24 right-1/3 text-white/30 -rotate-6">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none animate-float">
            {`  ❅
 ╱│╲
╱─┼─╲
  │
  ❆`}
          </pre>
        </div>

        <style jsx global>{`
          @keyframes twinkle {
            0%,
            100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.8;
            }
          }
          @keyframes swing {
            0%,
            100% {
              transform: rotate(12deg);
            }
            50% {
              transform: rotate(-12deg);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(-6deg);
            }
            50% {
              transform: translateY(-10px) rotate(-6deg);
            }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          .animate-swing {
            animation: swing 4s ease-in-out infinite;
            transform-origin: top center;
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
        `}</style>

        <div className="absolute top-8 right-8 text-red-600">
          <span className="text-sm font-mono animate-pulse">®</span>
        </div>
      </section>

      <div className="h-[100px] bg-black relative overflow-hidden">
        {/* NYC Skyline */}
        <pre className="absolute bottom-0 left-0 right-0 text-[#333] text-[8px] leading-none whitespace-pre">
          {`    ▄█▀█▄    █▄▄█▀█   ▄█▀▀█▄   ▄█▀█▄   █▄▄█▀█   ▄█▀▀█▄   ▄█▀█▄
    ████    ██████   ██████   ████    ██████   ██████   ████
    ▀▀▀▀    ▀▀▀▀▀▀   ▀▀▀▀▀▀   ▀▀▀▀    ▀▀▀▀▀▀   ▀▀▀▀▀▀   ▀▀▀▀`}
        </pre>

        {/* Skateboard Animation */}
        <div className="absolute bottom-6 w-full animate-slide-left">
          <pre className="text-[#cc0000] text-[10px] font-mono whitespace-pre">
            {`   ▀▄   ▄▀
     █▀█
   ◢████◣
○═○═○═○═○`}
          </pre>
        </div>

        {/* Lafayette Store Reference */}
        <div className="absolute top-2 left-4">
          <pre className="text-xs text-[#cc0000] font-mono opacity-60">
            {`274 Lafayette St
EST. 1994`}
          </pre>
        </div>

        {/* James Jebbia Reference */}
        <div className="absolute top-2 right-4">
          <pre className="text-xs text-[#cc0000] font-mono text-right opacity-60">
            {`JAMES JEBBIA
STUSSY × UNION`}
          </pre>
        </div>

        {/* First Box Logo Tee */}
        <div className="absolute top-1 right-32">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`FIRST BOX LOGO
RIZZOLI 2010`}
          </pre>
        </div>

        {/* Arcade Style Score */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">
          <pre className="text-[10px] text-[#cc0000] font-mono whitespace-pre">
            {`HI-SCORE
1994000`}
          </pre>
        </div>

        {/* Classic Gaming References */}
        <div className="absolute bottom-2 left-8">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`↑↑↓↓←→←→BA`}
          </pre>
        </div>

        {/* Collaborations History */}
        <div className="absolute bottom-2 right-8">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`LV×2017 CDG×2012`}
          </pre>
        </div>

        {/* Store Locations */}
        <div className="absolute top-1 left-8">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`NYC×TOKYO×PARIS
LONDON×LA×MILAN`}
          </pre>
        </div>

        {/* Famous Drops */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`KERMIT×2008 DIPSET×2006`}
          </pre>
        </div>

        {/* Skate Team */}
        <div className="absolute top-2 left-1/3">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`TEAM: GONZALES
HAROLD HUNTER`}
          </pre>
        </div>

        {/* New: Secret Drop Info */}
        <div className="absolute top-4 right-1/4">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`KATE MOSS×2012
NEIL YOUNG×2015`}
          </pre>
        </div>

        {/* New: OG Store Hours */}
        <div className="absolute bottom-4 left-1/4">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`THURSDAY 11AM
SOLD OUT 11:02AM`}
          </pre>
        </div>

        {/* New: ASCII Box Logo */}
        <div className="absolute top-4 left-1/4 text-[#cc0000] opacity-40">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none">
            {`   ╱╲
   ╱──╲
  ╱────╲
 ╱──────╲
╱────────╲
    ║║
    ║║    `}
          </pre>
        </div>

        {/* New: Rare Item */}
        <div className="absolute bottom-32 right-1/4 text-[#cc0000] opacity-40 rotate-12">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none">
            {` ╭─────╮
 │ H H │
 │ O O │
 ╰─────╯
   ╱╲`}
          </pre>
        </div>

        {/* New: Snowflake Pattern */}
        <div className="absolute top-24 right-1/3 text-[#cc0000] opacity-30 -rotate-6">
          <pre className="font-mono text-[0.4rem] sm:text-xs leading-none">
            {`  ❅
 ╱│╲
╱─┼─╲
  │
  ❆`}
          </pre>
        </div>

        {/* New: Hidden Gems */}
        <div className="absolute bottom-16 right-16">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`SOPRANOS BOX×2019
OREO DROP×2020`}
          </pre>
        </div>

        {/* New: Store Culture */}
        <div className="absolute top-16 left-16">
          <pre className="text-[8px] text-[#cc0000] font-mono opacity-40">
            {`LINE SPOT: #187
WEEK 1 F/W 19`}
          </pre>
        </div>

        <style jsx>{`
          @keyframes slide-left {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
          .animate-slide-left {
            animation: slide-left 8s linear infinite;
          }
        `}</style>
      </div>

      {/* T-Shirt Customizer Section */}
      <section className="bg-zinc-100 py-10 h-screen">
        <div className="relative container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Use the TShirtViewer component */}
            <TShirtViewer />

            {/* Controls Panel */}
            <div className="bg-zinc-100 p-8 font-mono grid grid-cols-1 w-full">
              {/* Supreme Genesis Panel styled as ASCII Terminal */}
              <div className="col-span-1 w-full">
                <div className="flex gap-1 mb-2 w-full">
                  {[
                    { id: "controls", label: "CONTROLS" },
                    { id: "archives", label: "ARCHIVES" },
                    { id: "personnel", label: "PERSONNEL" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`
          px-3 py-1 text-xs font-mono border border-black
          ${
            activeTab === tab.id
              ? "bg-black text-white"
              : "bg-zinc-100 hover:bg-zinc-200 text-neutral-600"
          }
        `}
                    >
                      <pre className="whitespace-pre">
                        {`═══${tab.label}═══`}
                      </pre>
                    </button>
                  ))}
                </div>

                {/* Terminal Window */}
                <div className="border-2 border-black">
                  {/* Terminal Header */}
                  <div className="bg-black text-white text-[8px] font-mono px-2 py-1 flex justify-between items-center">
                    <span>SUPREME_OS v1.994</span>
                    <div className="flex gap-2">
                      <button className="px-2 bg-zinc-800 hover:bg-zinc-700">
                        [ - ]
                      </button>
                      <button className="px-2 bg-zinc-800 hover:bg-zinc-700">
                        [ □ ]
                      </button>
                      <button className="px-2 bg-zinc-800 hover:bg-zinc-700">
                        [×]
                      </button>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="h-[calc(100vh-340px)] px-4 py-8 overflow-y-scroll !visible [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:block [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-track]:border-[1px] [&::-webkit-scrollbar-track]:border-neutral-800 [&::-webkit-scrollbar-thumb]:bg-[#ee1133] [&::-webkit-scrollbar-thumb]:hover:bg-red-600 [&::-webkit-scrollbar-thumb]:transition-colors">
                    <pre className="font-mono text-xs text-black whitespace-pre">
                      {activeTab === "archives" ? (
                        `SUPREME ARCHIVES 
root@supreme:~# accessing classified_archives.db


[FOUNDER AND GENESIS]
----------------------------------------
Initial Capital: $12,000
First Store: Lafayette St, Manhattan
First Week Revenue: $1,412.37
First Production: 12 T-shirts
First Collab: Vans (1994)


[TIMELINE]
----------------------------------------
1963: James Jebbia born (USA)
1994: Supreme founded (April)
2017: Carlyle Group 50% stake ($500M)
2020: VF Corp acquisition ($2.1B)
2024: EssilorLuxottica deal ($1.5B)


[BOX LOGO ORIGINS]
----------------------------------------
Inspiration: Barbara Kruger
Font: Futura Heavy Oblique
Colors: White text, red box
Status: Globally trademarked (2020)


[CLASSIFIED DATA]
----------------------------------------
Original Supplier: [REDACTED]
First Employee: Aaron Bondaroff
Store Manager: Ryan Hickey`
                      ) : activeTab === "personnel" ? (
                        `SUPREME PERSONNEL 
root@supreme:~# cat crew_manifest.txt

[FOUNDER PROFILE]
----------------------------------------
NAME: James Jebbia
BORN: 1963, United States
RAISED: London, England
PRE-SUPREME: Stüssy UK Manager
VISION: Skateboarding + Art + Music

[INITIAL TEAM]
----------------------------------------
JUSTIN PIERCE
- Pro Skater
- Actor (Kids, 1995)
- Early Brand Ambassador
- Status: Core Team Member

HAROLD HUNTER
- NYC Skate Legend
- Cultural Icon
- Community Leader
- Status: Original Team Rider

[FIRST EMPLOYEES]
----------------------------------------
BACKGROUND: Primarily NYC Skaters
HIERARCHY: Community-Based Structure
CULTURE: Authentic Skate Heritage
HIRING POLICY: Friends & Scene Members

[CLASSIFIED NOTES]
----------------------------------------
> Initial staff count: 3
> First week schedule: Thu-Sun`
                      ) : activeTab === "controls" ? (
                        // Controls Panel
                        <div className="grid grid-cols-1 col-span-1 gap-y-12">
                          <div>
                            <pre className="font-mono text-xs text-black whitespace-pre">
                              {`SUPREME CONTROL PANEL 
root@supreme:~# accessing control_panel...`}
                            </pre>
                          </div>
                          {/* T-Shirt Color Selector */}
                          <div>
                            <pre className="font-mono text-xs text-black whitespace-pre">
                              {`┌─ TSHIRT COLOR CONTROL MATRIX ────────────────────────────────────────────────────────┐
│                                                                                      │
│     ${tshirtColor === tshirtColors[0] ? "♦   " : "◇   "}           ${
                                tshirtColor === tshirtColors[1]
                                  ? "♦   "
                                  : "◇   "
                              }           ${
                                tshirtColor === tshirtColors[2]
                                  ? "♦   "
                                  : "◇   "
                              }           ${
                                tshirtColor === tshirtColors[3] ? "♦ " : "◇ "
                              }                                  │
│ [${tshirtColor === tshirtColors[0] ? "═══╡" : "   |"}           ${
                                tshirtColor === tshirtColors[1]
                                  ? "═══╡"
                                  : "   |"
                              }           ${
                                tshirtColor === tshirtColors[2]
                                  ? "═══╡"
                                  : "   |"
                              }           ${
                                tshirtColor === tshirtColors[3]
                                  ? "═══╡"
                                  : "   |"
                              }               ]                   │
│   WHITE          BLACK          NAVY           RED                                   │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
                            </pre>
                            <div className="flex flex-row gap-1 mt-2">
                              {tshirtColors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setTshirtColor(color)}
                                  className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      tshirtColor === color
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                                >
                                  <pre>{`${color.toUpperCase()}`}</pre>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Box Color Selector */}
                          <div>
                            <pre className="font-mono text-xs text-black whitespace-pre">
                              {`┌─ BOX COLOR REACTOR SYSTEM ───────────────────────────────────────────────────────────┐
│                                                                                      │
│ ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│ │ GREEN   │  │ BLACK   │  │ BLUE    │  │ RED     │  │ SKYBLUE │                      │
│ │ [${boxColor === "green" ? "▣" : "□"}]     │  │ [${
                                boxColor === "black" ? "▣" : "□"
                              }]     │  │ [${
                                boxColor === "blue" ? "▣" : "□"
                              }]     │  │ [${
                                boxColor === "red" ? "▣" : "□"
                              }]     │  │ [${
                                boxColor === "skyBlue" ? "▣" : "□"
                              }]     │                      │
│ └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘                      │
│     ▼            ▼            ▼            ▼            ▼                            │
│ ╔═══════╗    ╔═══════╗    ╔═══════╗    ╔═══════╗    ╔═══════╗                        │
│ ║█████${boxColor === "green" ? "" : "░"}║    ║█████${
                                boxColor === "black" ? "█" : "░"
                              }║    ║█████${
                                boxColor === "blue" ? "█" : "░"
                              }║    ║█████${
                                boxColor === "red" ? "█" : "░"
                              }║    ║█████${
                                boxColor === "skyBlue" ? "█" : "░"
                              }║                             │  
│ ╚═══════╝    ╚═══════╝    ╚═══════╝    ╚═══════╝    ╚═══════╝                        │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
                            </pre>
                            <div className="flex flex-row gap-1 mt-2">
                              {boxColors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setBoxColor(color)}
                                  className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      boxColor === color
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                                >
                                  <pre>{`${color.toUpperCase()}`}</pre>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Size Matrix */}
                          <div>
                            <pre className="font-mono text-xs text-black whitespace-pre">
                              {`┌─ SIZE MATRIX CONFIGURATION ──────────────────────────────────────────────────────────┐
│                                                                                      │
│ ┌─[S]─┐        ┌─[M]─┐        ┌─[L]─┐        ┌─[XL]─┐       ┌─[XXL]─┐                │
│ │${size === "S" ? "◆" : "◇"}    │        │${
                                size === "M" ? "◆" : "◇"
                              }    │        │${
                                size === "L" ? "◆" : "◇"
                              }    │        │${
                                size === "XL" ? "◆" : "◇"
                              }     │       │${
                                size === "XXL" ? "◆" : "◇"
                              }      │                │
│ │ ┌─┐ │        │ ┌─┐ │        │ ┌─┐ │        │ ┌─┐  │       │ ┌─┐   │                │
│ └─┤${size === "S" ? "▣" : "□"}├─┘        └─┤${
                                size === "M" ? "▣" : "□"
                              }├─┘        └─┤${
                                size === "L" ? "▣" : "□"
                              }├─┘        └─┤${
                                size === "XL" ? "▣" : "□"
                              }├──┘       └─┤${
                                size === "XXL" ? "▣" : "□"
                              }├──┘                 │
│   └─┘            └─┘            └─┘            └─┘            └─┘                    │
│   ║▒${size === "S" ? "▓" : "▒"}▒║          ║▒${
                                size === "M" ? "▓" : "▒"
                              }▒║          ║▒${
                                size === "L" ? "▓" : "▒"
                              }▒║          ║▒${
                                size === "XL" ? "▓" : "▒"
                              }▒║          ║▒${
                                size === "XXL" ? "▓" : "▒"
                              }▒║                  │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
                            </pre>
                            <div className="flex flex-row gap-1 mt-2">
                              {sizes.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => setSize(s)}
                                  className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      size === s
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                                >
                                  <pre>{`${s}`}</pre>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Effects Matrix */}
                          <div>
                            <pre className="font-mono text-xs text-black whitespace-pre">
                              {`┌─ EFFECTS REACTOR MATRIX ─────────────────────────────────────────────────────────────┐
│                                                                                      │
│     MATRIX    [${
                                animationPattern === "matrix" ? "▣" : "□"
                              } ]────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                                animationPattern === "matrix"
                                  ? "▓▓▓▓▓▓▓▓▓▓"
                                  : "░░░░░░░░░░"
                              }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                                animationPattern === "matrix"
                                  ? "▰▰▰▰▰▰"
                                  : "▱▱▱▱▱▱"
                              }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                                animationPattern === "matrix"
                                  ? "ACTIVE        "
                                  : "STANDBY       "
                              }║             │
│                                                                                      │
│     PULSE    [${
                                animationPattern === "pulse" ? "▣" : "□"
                              } ]─────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                                animationPattern === "pulse"
                                  ? "▓▓▓▓▓▓▓▓▓▓"
                                  : "░░░░░░░░░░"
                              }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                                animationPattern === "pulse"
                                  ? "▰▰▰▰▰▰"
                                  : "▱▱▱▱▱▱"
                              }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                                animationPattern === "pulse"
                                  ? "ACTIVE        "
                                  : "STANDBY       "
                              }║             │
│                                                                                      │
│    GALAXY    [${
                                animationPattern === "galaxy" ? "▣" : "□"
                              } ]─────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                                animationPattern === "galaxy"
                                  ? "▓▓▓▓▓▓▓▓▓▓"
                                  : "░░░░░░░░░░"
                              }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                                animationPattern === "galaxy"
                                  ? "▰▰▰▰▰▰"
                                  : "▱▱▱▱▱▱"
                              }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                                animationPattern === "galaxy"
                                  ? "ACTIVE        "
                                  : "STANDBY       "
                              }║             │
│                                                                                      │
│    PLASMA    [${
                                animationPattern === "plasma" ? "▣" : "□"
                              } ]─────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                                animationPattern === "plasma"
                                  ? "▓▓▓▓▓▓▓▓▓▓"
                                  : "░░░░░░░░░░"
                              }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                                animationPattern === "plasma"
                                  ? "▰▰▰▰▰▰"
                                  : "▱▱▱▱▱▱"
                              }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                                animationPattern === "plasma"
                                  ? "ACTIVE        "
                                  : "STANDBY       "
                              }║             │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
                            </pre>
                            <div className="flex flex-row gap-1 mt-2">
                              {animationPatterns.map((pattern) => (
                                <button
                                  key={pattern}
                                  onClick={() => setAnimationPattern(pattern)}
                                  className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      animationPattern === pattern
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                                >
                                  <pre>{`${pattern.toUpperCase()}`}</pre>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Final Configuration & Add to Cart */}
              <div className="mt-6 space-y-2">
                {/* Final Configuration Box */}
                <div className="">
                  <pre className="font-mono text-xs text-black whitespace-pre">
                    {`FINAL CONFIG
ID: SUP-FW24-${size}-${tshirtColor.toUpperCase()}         
BOX: ${boxColor.toUpperCase()}                        
FX: ${animationPattern.toUpperCase()}                     
                                    
PRICE: $18.00  STOCK: [████████░░░░░░░░] 52%  
`}
                  </pre>
                </div>

                {/* Add to Cart Button */}
                <div>
                  <button className="w-[264px] bg-red-600 hover:bg-black text-white font-mono text-xs transition-colors duration-200">
                    <pre className="p-1">
                      {`ADD TO CART
[SUPREME®]`}
                    </pre>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Supreme Logo Section */}
      <section className="bg-black py-32 px-4 h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <pre className="font-mono text-white text-center whitespace-pre text-[0.5rem] sm:text-xs md:text-base lg:text-lg">
            {`
██████╗ ██╗   ██╗██████╗ ██████╗ ███████╗███╗   ███╗███████╗
██╔════╝██║   ██║██╔══██╗██╔══██╗██╔════╝████╗ ████║██╔════╝
███████╗██║   ██║██████╔╝██████╔╝█████╗  ██╔████╔██║█████╗  
╚════██║██║   ██║██╔═══╝ ██╔══██╗██╔══╝  ██║╚██╔╝██║██╔══╝  
███████║╚██████╔╝██║     ██║  ██║███████╗██║ ╚═╝ ██║███████╗
╚══════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝

███████╗██╗    ██╗    ██████╗  ██████╗ ██████╗ ██╗  ██╗
██╔════╝██║    ██║    ╚════██╗██╔═████╗╚═════██╗██║  ██║
█████╗  ██║ █╗ ██║     █████╔╝██║██╔██║ █████╔╝███████║
██╔═╝  ██║███╗██║    ██╔══╝ ████╝██║██╔═══╝ ╚════██║
██║     ╚███╔███╔╝    ███████╗╚██████╔╝███████╗     ██║
╚═╝      ╚══╝╚══╝     ╚══════╝ ╚═════╝ ╚══════╝     ╚═╝`}
          </pre>
        </div>
      </section>
      <section className="bg-zinc-100 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 col-span-1 gap-y-12">
            {/* T-Shirt Color Selector */}
            <div>
              <pre className="font-mono text-xs text-black whitespace-pre">
                {`┌─ TSHIRT COLOR CONTROL MATRIX ────────────────────────────────────────────────────────┐
│                                                                                      │
│     ${tshirtColor === tshirtColors[0] ? "♦   " : "◇   "}           ${
                  tshirtColor === tshirtColors[1] ? "♦   " : "◇   "
                }           ${
                  tshirtColor === tshirtColors[2] ? "♦   " : "◇   "
                }           ${
                  tshirtColor === tshirtColors[3] ? "♦ " : "◇ "
                }                                  │
│ [${tshirtColor === tshirtColors[0] ? "═══╡" : "   |"}           ${
                  tshirtColor === tshirtColors[1] ? "═══╡" : "   |"
                }           ${
                  tshirtColor === tshirtColors[2] ? "═══╡" : "   |"
                }           ${
                  tshirtColor === tshirtColors[3] ? "═══╡" : "   |"
                }               ]                   │
│   WHITE          BLACK          NAVY           RED                                   │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="flex flex-row gap-1 mt-2">
                {tshirtColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTshirtColor(color)}
                    className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      tshirtColor === color
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                  >
                    <pre>{`${color.toUpperCase()}`}</pre>
                  </button>
                ))}
              </div>
            </div>

            {/* Box Color Selector */}
            <div>
              <pre className="font-mono text-xs text-black whitespace-pre">
                {`┌─ BOX COLOR REACTOR SYSTEM ───────────────────────────────────────────────────────────┐
│                                                                                      │
│ ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                      │
│ │ GREEN   │  │ BLACK   │  │ BLUE    │  │ RED     │  │ SKYBLUE │                      │
│ │ [${boxColor === "green" ? "▣" : "□"}]     │  │ [${
                  boxColor === "black" ? "▣" : "□"
                }]     │  │ [${boxColor === "blue" ? "▣" : "□"}]     │  │ [${
                  boxColor === "red" ? "▣" : "□"
                }]     │  │ [${
                  boxColor === "skyBlue" ? "▣" : "□"
                }]     │                      │
│ └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘                      │
│     ▼            ▼            ▼            ▼            ▼                            │
│ ╔═══════╗    ╔═══════╗    ╔═══════╗    ╔═══════╗    ╔═══════╗                        │
│ ║█████${boxColor === "green" ? "" : "░"}║    ║█████${
                  boxColor === "black" ? "█" : "░"
                }║    ║█████${boxColor === "blue" ? "█" : "░"}║    ║█████${
                  boxColor === "red" ? "█" : "░"
                }║    ║█████${
                  boxColor === "skyBlue" ? "█" : "░"
                }║                              │  
│ ╚═══════╝    ╚═══════╝    ╚═══════╝    ╚═══════╝    ╚═══════╝                        │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="flex flex-row gap-1 mt-2">
                {boxColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBoxColor(color)}
                    className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      boxColor === color
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                  >
                    <pre>{`${color.toUpperCase()}`}</pre>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Matrix */}
            <div>
              <pre className="font-mono text-xs text-black whitespace-pre">
                {`┌─ SIZE MATRIX CONFIGURATION ──────────────────────────────────────────────────────────┐
│                                                                                      │
│ ┌─[S]─┐        ┌─[M]─┐        ┌─[L]─┐        ┌─[XL]─┐       ┌─[XXL]─┐                │
│ │${size === "S" ? "◆" : "◇"}    │        │${
                  size === "M" ? "◆" : "◇"
                }    │        │${size === "L" ? "◆" : "◇"}    │        │${
                  size === "XL" ? "◆" : "◇"
                }     │       │${
                  size === "XXL" ? "◆" : "◇"
                }      │                │
│ │ ┌─┐ │        │ ┌─┐ │        │ ┌─┐ │        │ ┌─┐  │       │ ┌─┐   │                │
│ └─┤${size === "S" ? "▣" : "□"}├─┘        └─┤${
                  size === "M" ? "▣" : "□"
                }├─┘        └─┤${size === "L" ? "▣" : "□"}├─┘        └─┤${
                  size === "XL" ? "▣" : "□"
                }├──┘       └─┤${
                  size === "XXL" ? "▣" : "□"
                }├──┘                 │
│   └─┘            └─┘            └─┘            └─┘            └─┘                    │
│   ║▒${size === "S" ? "▓" : "▒"}▒║          ║▒${
                  size === "M" ? "▓" : "▒"
                }▒║          ║▒${size === "L" ? "▓" : "▒"}▒║          ║▒${
                  size === "XL" ? "▓" : "▒"
                }▒║          ║▒${
                  size === "XXL" ? "▓" : "▒"
                }▒║                  │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="flex flex-row gap-1 mt-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      size === s
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                  >
                    <pre>{`${s}`}</pre>
                  </button>
                ))}
              </div>
            </div>

            {/* Effects Matrix */}
            <div>
              <pre className="font-mono text-xs text-black whitespace-pre">
                {`┌─ EFFECTS REACTOR MATRIX ─────────────────────────────────────────────────────────────┐
│                                                                                      │
│     MATRIX    [${
                  animationPattern === "matrix" ? "▣" : "□"
                } ]────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                  animationPattern === "matrix" ? "▓▓▓▓▓▓▓▓▓▓" : "░░░░░░░░░░"
                }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                  animationPattern === "matrix" ? "▰▰▰▰▰▰" : "▱▱▱▱▱▱"
                }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                  animationPattern === "matrix"
                    ? "ACTIVE        "
                    : "STANDBY       "
                }║             │
│                                                                                      │
│     PULSE    [${
                  animationPattern === "pulse" ? "▣" : "□"
                } ]─────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                  animationPattern === "pulse" ? "▓▓▓▓▓▓▓▓▓▓" : "░░░░░░░░░░"
                }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                  animationPattern === "pulse" ? "▰▰▰▰▰▰" : "▱▱▱▱▱▱"
                }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                  animationPattern === "pulse"
                    ? "ACTIVE        "
                    : "STANDBY       "
                }║             │
│                                                                                      │
│    GALAXY    [${
                  animationPattern === "galaxy" ? "▣" : "□"
                } ]─────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                  animationPattern === "galaxy" ? "▓▓▓▓▓▓▓▓▓▓" : "░░░░░░░░░░"
                }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                  animationPattern === "galaxy" ? "▰▰▰▰▰▰" : "▱▱▱▱▱▱"
                }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                  animationPattern === "galaxy"
                    ? "ACTIVE        "
                    : "STANDBY       "
                }║             │
│                                                                                      │
│    PLASMA    [${
                  animationPattern === "plasma" ? "▣" : "□"
                } ]─────────╥─────┐         ╭─►──╥────╥──════════════════╗             │
│    ╭───◄${
                  animationPattern === "plasma" ? "▓▓▓▓▓▓▓▓▓▓" : "░░░░░░░░░░"
                }►──╮  <<║>>   │         │    ║    ║ POWER: ${
                  animationPattern === "plasma" ? "▰▰▰▰▰▰" : "▱▱▱▱▱▱"
                }    ║             │
│    ╰───┤▼∞≡∞▼├───╢▣▣▣╟────╯     └───∞≡∞───┘    ║ STATUS: ${
                  animationPattern === "plasma"
                    ? "ACTIVE        "
                    : "STANDBY       "
                }║             │
└──────────────────────────────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="flex flex-row gap-1 mt-2">
                {animationPatterns.map((pattern) => (
                  <button
                    key={pattern}
                    onClick={() => setAnimationPattern(pattern)}
                    className={`
                                    w-[100px] font-mono text-[10px] border border-neutral-300 p-1.5
                                    ${
                                      animationPattern === pattern
                                        ? "bg-neutral-100 text-red-600 border-red-600"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50"
                                    }
                                    transition-all duration-200
                                  `}
                  >
                    <pre>{`${pattern.toUpperCase()}`}</pre>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
