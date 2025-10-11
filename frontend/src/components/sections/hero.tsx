"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type CSSProperties } from "react";

const ORBIT_ELLIPSES = [
  { rotation: 0, scaleX: 1.28, scaleY: 0.78, opacity: 0.6 },
  { rotation: 26, scaleX: 1.18, scaleY: 0.88, opacity: 0.45 },
  { rotation: -28, scaleX: 1.34, scaleY: 0.74, opacity: 0.38 },
  { rotation: 52, scaleX: 1.08, scaleY: 0.94, opacity: 0.5 },
  { rotation: -54, scaleX: 0.96, scaleY: 1.1, opacity: 0.44 },
  { rotation: 10, scaleX: 1.44, scaleY: 0.7, opacity: 0.28 }
] as const;

const ORBIT_NODES = [
  { top: "6%", left: "63%", size: "18px", delay: 0.4, duration: 6.2 },
  { top: "26%", left: "88%", size: "17px", delay: 1.1, duration: 5.6 },
  { top: "58%", left: "94%", size: "19px", delay: 0.8, duration: 6.5 },
  { top: "82%", left: "58%", size: "21px", delay: 1.6, duration: 5.9 },
  { top: "74%", left: "18%", size: "18px", delay: 0.5, duration: 6.7 },
  { top: "30%", left: "10%", size: "17px", delay: 1.3, duration: 6.1 }
] as const;

function OrbitSolarSystem() {
  return (
    <div className="relative mx-auto flex w-full max-w-[56rem] flex-col items-center justify-center">
      <div className="relative aspect-square w-full max-w-[32rem] sm:max-w-[36rem] lg:max-w-[40rem]">
        <div className="pointer-events-none absolute inset-0">
          <span className="orbit-halo" aria-hidden="true" />
          <span className="orbit-halo orbit-halo--sm" aria-hidden="true" />
        </div>

        <div className="pointer-events-none absolute inset-0">
          {ORBIT_ELLIPSES.map((ellipse, index) => (
            <span
              key={`orbit-${index}`}
              className="orbit-ellipse"
              aria-hidden="true"
              style={
                {
                  opacity: ellipse.opacity,
                  transform: `translate(-50%, -50%) rotate(${ellipse.rotation}deg) scaleX(${ellipse.scaleX}) scaleY(${ellipse.scaleY})`
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0">
          {ORBIT_NODES.map((node, index) => (
            <motion.span
              key={`node-${index}`}
              className="orbit-node"
              aria-hidden="true"
              style={
                {
                  top: node.top,
                  left: node.left,
                  width: node.size,
                  height: node.size
                } as CSSProperties
              }
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: node.duration, delay: node.delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="orbit-core">
          <div className="orbit-core__image">
            <Image
              src="/brand/orbit-logo.png"
              alt="Orbit Collective emblem"
              fill
              sizes="(max-width: 768px) 180px, (max-width: 1280px) 220px, 260px"
              priority
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="section-shell relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden">
      <div className="hero-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative z-10 flex flex-1 flex-col items-center justify-center gap-16 pb-20 pt-32 sm:pb-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex w-full max-w-[48rem] items-center justify-between text-xs font-semibold uppercase tracking-[0.65em] text-white/70 sm:text-sm">
            <span>Always</span>
            <span>Ahead</span>
          </div>
          <span className="text-xs uppercase tracking-[0.8em] text-white/55 sm:text-sm">of</span>
          <h1 className="hero-wordmark text-[clamp(5.5rem,18vw,13rem)] leading-[0.8]">Orbit</h1>
        </div>

        <OrbitSolarSystem />
      </div>
    </section>
  );
}
