"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type PlanetRing = {
  widthMultiplier: number;
  heightMultiplier: number;
  gradient: string;
  glow?: string;
  opacity?: number;
  thickness?: number;
  blur?: string;
  tilt?: number;
  rotation?: number;
  strokeColor?: string;
};

type PlanetConfig = {
  scale: number;
  size: string;
  duration: number;
  delay: number;
  baseGradient?: string;
  surfaceGradient?: string;
  bandGradient?: string;
  highlightGradient?: string;
  cloudGradient?: string;
  atmosphereGlow?: string;
  haloGlow?: string;
  textureOverlay?: string;
  glowShadow: string;
  ring?: PlanetRing;
  textureSrc?: string;
  textureSaturation?: number;
  nightTint?: string;
  rimColor?: string;
  rimIntensity?: number;
  terminatorSoftness?: number;
  highlightSize?: number;
  customRenderer?: "aurora";
  auroraPalette?: AuroraPalette;
};

type AuroraPalette = {
  glowOuter: string;
  glowMiddle: string;
  glowInner: string;
  baseLight: string;
  baseMid: string;
  baseAccent: string;
  baseDeep: string;
  oceanA: string;
  oceanB: string;
  oceanC: string;
  oceanD: string;
  landA: string;
  landB: string;
  landC: string;
  landD: string;
  cloudSoftA: string;
  cloudSoftB: string;
  cloudSoftC: string;
  cloudSoftD: string;
  cloudWispsA: string;
  cloudWispsB: string;
  cloudWispsC: string;
  polarNorth: string;
  polarSouth: string;
  scatterHighlight: string;
  scatterShadow: string;
  textureLight: string;
  textureDark: string;
  shimmer: string;
  highlight: string;
  rim: string;
  lensPrimary: string;
  lensSecondary: string;
  nebulaA: string;
  nebulaB: string;
  particleBright: string;
  particleDim: string;
  waveA: string;
  waveB: string;
};

type OrbitRing = {
  scale: number;
  opacity: number;
};

type Star = {
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
  variant: "dot" | "spark" | "trail";
  orientation: number;
  color: keyof typeof STAR_COLORS;
};

const STAR_COLORS = {
  warm: {
    core: "rgba(255, 220, 180, 0.96)",
    glow: "rgba(255, 158, 102, 0.65)",
    arm: "rgba(255, 190, 140, 0.9)"
  },
  citrus: {
    core: "rgba(255, 240, 200, 0.95)",
    glow: "rgba(255, 205, 120, 0.6)",
    arm: "rgba(255, 215, 140, 0.85)"
  },
  cool: {
    core: "rgba(200, 230, 255, 0.96)",
    glow: "rgba(120, 190, 255, 0.62)",
    arm: "rgba(160, 210, 255, 0.88)"
  },
  violet: {
    core: "rgba(232, 210, 255, 0.96)",
    glow: "rgba(160, 120, 255, 0.62)",
    arm: "rgba(200, 150, 255, 0.9)"
  },
  aurora: {
    core: "rgba(210, 255, 230, 0.96)",
    glow: "rgba(140, 255, 210, 0.6)",
    arm: "rgba(160, 255, 210, 0.85)"
  }
} satisfies Record<string, { core: string; glow: string; arm: string }>;

const ORBIT_RINGS: OrbitRing[] = [
  { scale: 0.38, opacity: 0.12 },
  { scale: 0.58, opacity: 0.16 },
  { scale: 0.78, opacity: 0.19 },
  { scale: 0.98, opacity: 0.22 },
  { scale: 1.2, opacity: 0.24 },
  { scale: 1.42, opacity: 0.18 }
];

const PLANETS: PlanetConfig[] = [
  {
    scale: 0.46,
    size: "clamp(1.6rem, 2.9vw, 2.5rem)",
    duration: 44,
    delay: 0,
    customRenderer: "aurora",
    auroraPalette: {
      glowOuter: "hsl(var(--brand-sunset) / 0.24)",
      glowMiddle: "hsl(var(--brand-amethyst) / 0.2)",
      glowInner: "hsl(var(--brand-princeton) / 0.25)",
      baseLight: "hsl(var(--brand-sunset) / 1)",
      baseMid: "hsl(var(--brand-princeton) / 0.82)",
      baseAccent: "hsl(var(--brand-amethyst) / 0.75)",
      baseDeep: "hsl(var(--brand-persian-indigo) / 0.95)",
      oceanA: "hsl(var(--brand-amethyst) / 0.55)",
      oceanB: "hsl(var(--brand-tekhelet) / 0.52)",
      oceanC: "hsl(var(--brand-amethyst) / 0.38)",
      oceanD: "hsl(var(--brand-tekhelet) / 0.4)",
      landA: "hsl(var(--brand-princeton) / 0.75)",
      landB: "hsl(var(--brand-sunset) / 0.7)",
      landC: "hsl(var(--brand-amethyst) / 0.55)",
      landD: "hsl(var(--brand-persian-indigo) / 0.6)",
      cloudSoftA: "hsl(var(--brand-sunset) / 0.28)",
      cloudSoftB: "hsl(var(--brand-amethyst) / 0.22)",
      cloudSoftC: "hsl(var(--brand-sunset) / 0.18)",
      cloudSoftD: "hsl(var(--brand-amethyst) / 0.16)",
      cloudWispsA: "hsl(var(--brand-princeton) / 0.2)",
      cloudWispsB: "hsl(var(--brand-amethyst) / 0.16)",
      cloudWispsC: "hsl(var(--brand-tekhelet) / 0.18)",
      polarNorth: "hsl(var(--brand-sunset) / 0.32)",
      polarSouth: "hsl(var(--brand-princeton) / 0.28)",
      scatterHighlight: "hsl(var(--brand-sunset) / 0.25)",
      scatterShadow: "rgba(16, 6, 34, 0.55)",
      textureLight: "hsl(var(--brand-sunset) / 0.18)",
      textureDark: "hsl(var(--brand-amethyst) / 0.16)",
      shimmer: "hsl(var(--brand-princeton) / 0.18)",
      rim: "hsl(var(--brand-princeton) / 0.6)",
      highlight: "hsl(var(--brand-princeton) / 0.35)",
      lensPrimary: "hsl(var(--brand-sunset) / 0.32)",
      lensSecondary: "hsl(var(--brand-amethyst) / 0.3)",
      nebulaA: "hsl(var(--brand-sunset) / 0.18)",
      nebulaB: "hsl(var(--brand-amethyst) / 0.14)",
      particleBright: "hsl(var(--brand-princeton) / 0.7)",
      particleDim: "hsl(var(--brand-amethyst) / 0.45)",
      waveA: "hsl(var(--brand-princeton) / 0.25)",
      waveB: "hsl(var(--brand-amethyst) / 0.22)"
    },
    glowShadow: "0 0 36px rgba(255,140,120,0.45)"
  },
  {
    scale: 0.62,
    size: "clamp(2rem, 3.5vw, 3rem)",
    duration: 52,
    delay: 0.4,
    customRenderer: "aurora",
    auroraPalette: {
      glowOuter: "hsl(var(--brand-tekhelet) / 0.26)",
      glowMiddle: "hsl(var(--brand-amethyst) / 0.24)",
      glowInner: "hsl(var(--brand-celeste) / 0.24)",
      baseLight: "hsl(var(--brand-tekhelet) / 0.95)",
      baseMid: "hsl(var(--brand-tekhelet) / 0.75)",
      baseAccent: "hsl(var(--brand-amethyst) / 0.6)",
      baseDeep: "hsl(var(--brand-persian-indigo))",
      oceanA: "hsl(var(--brand-celeste) / 0.55)",
      oceanB: "hsl(var(--brand-tekhelet) / 0.52)",
      oceanC: "hsl(var(--brand-celeste) / 0.38)",
      oceanD: "hsl(var(--brand-tekhelet) / 0.36)",
      landA: "hsl(var(--brand-persian-indigo) / 0.6)",
      landB: "hsl(var(--brand-tekhelet) / 0.55)",
      landC: "hsl(var(--brand-amethyst) / 0.48)",
      landD: "hsl(var(--brand-void) / 0.7)",
      cloudSoftA: "hsl(var(--brand-celeste) / 0.28)",
      cloudSoftB: "hsl(var(--brand-tekhelet) / 0.24)",
      cloudSoftC: "hsl(var(--brand-amethyst) / 0.2)",
      cloudSoftD: "hsl(var(--brand-celeste) / 0.18)",
      cloudWispsA: "hsl(var(--brand-celeste) / 0.22)",
      cloudWispsB: "hsl(var(--brand-tekhelet) / 0.18)",
      cloudWispsC: "hsl(var(--brand-amethyst) / 0.18)",
      polarNorth: "hsl(var(--brand-celeste) / 0.34)",
      polarSouth: "hsl(var(--brand-tekhelet) / 0.32)",
      scatterHighlight: "hsl(var(--brand-celeste) / 0.28)",
      scatterShadow: "rgba(8, 12, 32, 0.6)",
      textureLight: "hsl(var(--brand-celeste) / 0.2)",
      textureDark: "hsl(var(--brand-tekhelet) / 0.18)",
      shimmer: "hsl(var(--brand-celeste) / 0.2)",
      rim: "hsl(var(--brand-celeste) / 0.68)",
      highlight: "hsl(var(--brand-celeste) / 0.32)",
      lensPrimary: "hsl(var(--brand-celeste) / 0.32)",
      lensSecondary: "hsl(var(--brand-amethyst) / 0.28)",
      nebulaA: "hsl(var(--brand-celeste) / 0.18)",
      nebulaB: "hsl(var(--brand-tekhelet) / 0.15)",
      particleBright: "hsl(var(--brand-celeste) / 0.6)",
      particleDim: "hsl(var(--brand-tekhelet) / 0.4)",
      waveA: "hsl(var(--brand-celeste) / 0.28)",
      waveB: "hsl(var(--brand-tekhelet) / 0.24)"
    },
    glowShadow: "0 0 34px rgba(160,120,255,0.45)"
  },
  {
    scale: 0.8,
    size: "clamp(2.6rem, 4.2vw, 3.6rem)",
    duration: 61,
    delay: 0.9,
    customRenderer: "aurora",
    auroraPalette: {
      glowOuter: "hsl(var(--brand-aurora) / 0.3)",
      glowMiddle: "hsl(var(--brand-celeste) / 0.26)",
      glowInner: "hsl(var(--brand-aurora) / 0.24)",
      baseLight: "hsl(var(--brand-aurora) / 1)",
      baseMid: "hsl(var(--brand-aurora) / 0.8)",
      baseAccent: "hsl(var(--brand-celeste) / 0.6)",
      baseDeep: "hsl(var(--brand-tekhelet) / 0.9)",
      oceanA: "hsl(var(--brand-celeste) / 0.55)",
      oceanB: "hsl(var(--brand-aurora) / 0.5)",
      oceanC: "hsl(var(--brand-celeste) / 0.4)",
      oceanD: "hsl(var(--brand-tekhelet) / 0.38)",
      landA: "hsl(var(--brand-aurora) / 0.75)",
      landB: "hsl(var(--brand-aurora) / 0.65)",
      landC: "hsl(var(--brand-tekhelet) / 0.55)",
      landD: "hsl(var(--brand-aurora) / 0.6)",
      cloudSoftA: "hsl(var(--brand-celeste) / 0.24)",
      cloudSoftB: "hsl(var(--brand-aurora) / 0.18)",
      cloudSoftC: "hsl(var(--brand-celeste) / 0.16)",
      cloudSoftD: "hsl(var(--brand-aurora) / 0.14)",
      cloudWispsA: "hsl(var(--brand-celeste) / 0.2)",
      cloudWispsB: "hsl(var(--brand-aurora) / 0.18)",
      cloudWispsC: "hsl(var(--brand-tekhelet) / 0.18)",
      polarNorth: "hsl(var(--brand-celeste) / 0.3)",
      polarSouth: "hsl(var(--brand-aurora) / 0.28)",
      scatterHighlight: "hsl(var(--brand-celeste) / 0.26)",
      scatterShadow: "rgba(6, 18, 24, 0.55)",
      textureLight: "hsl(var(--brand-aurora) / 0.2)",
      textureDark: "hsl(var(--brand-tekhelet) / 0.18)",
      shimmer: "hsl(var(--brand-celeste) / 0.18)",
      rim: "hsl(var(--brand-celeste) / 0.62)",
      highlight: "hsl(var(--brand-aurora) / 0.3)",
      lensPrimary: "hsl(var(--brand-aurora) / 0.32)",
      lensSecondary: "hsl(var(--brand-celeste) / 0.28)",
      nebulaA: "hsl(var(--brand-aurora) / 0.14)",
      nebulaB: "hsl(var(--brand-celeste) / 0.12)",
      particleBright: "hsl(var(--brand-aurora) / 0.65)",
      particleDim: "hsl(var(--brand-celeste) / 0.45)",
      waveA: "hsl(var(--brand-aurora) / 0.25)",
      waveB: "hsl(var(--brand-celeste) / 0.22)"
    },
    glowShadow: "0 0 42px rgba(255,170,110,0.55)"
  },
  {
    scale: 0.93,
    size: "clamp(2.9rem, 4.6vw, 3.9rem)",
    duration: 70,
    delay: 1.2,
    customRenderer: "aurora",
    auroraPalette: {
      glowOuter: "hsl(var(--brand-tekhelet) / 0.28)",
      glowMiddle: "hsl(var(--brand-amethyst) / 0.24)",
      glowInner: "hsl(var(--brand-celeste) / 0.26)",
      baseLight: "hsl(var(--brand-celeste) / 0.95)",
      baseMid: "hsl(var(--brand-tekhelet) / 0.8)",
      baseAccent: "hsl(var(--brand-amethyst) / 0.65)",
      baseDeep: "hsl(var(--brand-persian-indigo) / 0.95)",
      oceanA: "hsl(var(--brand-celeste) / 0.55)",
      oceanB: "hsl(var(--brand-tekhelet) / 0.52)",
      oceanC: "hsl(var(--brand-celeste) / 0.42)",
      oceanD: "hsl(var(--brand-tekhelet) / 0.4)",
      landA: "hsl(var(--brand-tekhelet) / 0.7)",
      landB: "hsl(var(--brand-tekhelet) / 0.6)",
      landC: "hsl(var(--brand-amethyst) / 0.55)",
      landD: "hsl(var(--brand-persian-indigo) / 0.65)",
      cloudSoftA: "hsl(var(--brand-celeste) / 0.24)",
      cloudSoftB: "hsl(var(--brand-tekhelet) / 0.2)",
      cloudSoftC: "hsl(var(--brand-amethyst) / 0.2)",
      cloudSoftD: "hsl(var(--brand-celeste) / 0.18)",
      cloudWispsA: "hsl(var(--brand-celeste) / 0.2)",
      cloudWispsB: "hsl(var(--brand-tekhelet) / 0.18)",
      cloudWispsC: "hsl(var(--brand-amethyst) / 0.16)",
      polarNorth: "hsl(var(--brand-celeste) / 0.32)",
      polarSouth: "hsl(var(--brand-tekhelet) / 0.3)",
      scatterHighlight: "hsl(var(--brand-celeste) / 0.28)",
      scatterShadow: "rgba(12, 14, 28, 0.55)",
      textureLight: "hsl(var(--brand-celeste) / 0.2)",
      textureDark: "hsl(var(--brand-tekhelet) / 0.18)",
      shimmer: "hsl(var(--brand-celeste) / 0.2)",
      rim: "hsl(var(--brand-celeste) / 0.6)",
      highlight: "hsl(var(--brand-celeste) / 0.3)",
      lensPrimary: "hsl(var(--brand-celeste) / 0.3)",
      lensSecondary: "hsl(var(--brand-tekhelet) / 0.28)",
      nebulaA: "hsl(var(--brand-celeste) / 0.18)",
      nebulaB: "hsl(var(--brand-tekhelet) / 0.16)",
      particleBright: "hsl(var(--brand-celeste) / 0.6)",
      particleDim: "hsl(var(--brand-tekhelet) / 0.45)",
      waveA: "hsl(var(--brand-celeste) / 0.26)",
      waveB: "hsl(var(--brand-tekhelet) / 0.24)"
    },
    glowShadow: "0 0 38px rgba(108,150,255,0.5)"
  },
  {
    scale: 1.1,
    size: "clamp(3.2rem, 5vw, 4.3rem)",
    duration: 79,
    delay: 1.6,
    customRenderer: "aurora",
    auroraPalette: {
      glowOuter: "hsl(var(--brand-sunset) / 0.3)",
      glowMiddle: "hsl(var(--brand-princeton) / 0.26)",
      glowInner: "hsl(var(--brand-sunset) / 0.24)",
      baseLight: "hsl(var(--brand-sunset) / 0.98)",
      baseMid: "hsl(var(--brand-princeton) / 0.82)",
      baseAccent: "hsl(var(--brand-amethyst) / 0.55)",
      baseDeep: "hsl(var(--brand-persian-indigo) / 0.9)",
      oceanA: "hsl(var(--brand-princeton) / 0.5)",
      oceanB: "hsl(var(--brand-sunset) / 0.45)",
      oceanC: "hsl(var(--brand-princeton) / 0.36)",
      oceanD: "hsl(var(--brand-amethyst) / 0.32)",
      landA: "hsl(var(--brand-princeton) / 0.75)",
      landB: "hsl(var(--brand-sunset) / 0.68)",
      landC: "hsl(var(--brand-amethyst) / 0.5)",
      landD: "hsl(var(--brand-persian-indigo) / 0.55)",
      cloudSoftA: "hsl(var(--brand-sunset) / 0.26)",
      cloudSoftB: "hsl(var(--brand-princeton) / 0.22)",
      cloudSoftC: "hsl(var(--brand-amethyst) / 0.2)",
      cloudSoftD: "hsl(var(--brand-sunset) / 0.18)",
      cloudWispsA: "hsl(var(--brand-princeton) / 0.22)",
      cloudWispsB: "hsl(var(--brand-sunset) / 0.18)",
      cloudWispsC: "hsl(var(--brand-amethyst) / 0.18)",
      polarNorth: "hsl(var(--brand-princeton) / 0.3)",
      polarSouth: "hsl(var(--brand-sunset) / 0.28)",
      scatterHighlight: "hsl(var(--brand-princeton) / 0.26)",
      scatterShadow: "rgba(26, 8, 22, 0.5)",
      textureLight: "hsl(var(--brand-princeton) / 0.22)",
      textureDark: "hsl(var(--brand-amethyst) / 0.18)",
      shimmer: "hsl(var(--brand-sunset) / 0.2)",
      rim: "hsl(var(--brand-princeton) / 0.6)",
      highlight: "hsl(var(--brand-princeton) / 0.32)",
      lensPrimary: "hsl(var(--brand-sunset) / 0.3)",
      lensSecondary: "hsl(var(--brand-princeton) / 0.28)",
      nebulaA: "hsl(var(--brand-sunset) / 0.2)",
      nebulaB: "hsl(var(--brand-amethyst) / 0.18)",
      particleBright: "hsl(var(--brand-princeton) / 0.65)",
      particleDim: "hsl(var(--brand-sunset) / 0.45)",
      waveA: "hsl(var(--brand-sunset) / 0.26)",
      waveB: "hsl(var(--brand-princeton) / 0.24)"
    },
    glowShadow: "0 0 44px rgba(250,184,119,0.55)"
  },
  {
    scale: 1.24,
    size: "clamp(3.4rem, 5.4vw, 4.6rem)",
    duration: 87,
    delay: 2,
    customRenderer: "aurora",
    auroraPalette: {
      glowOuter: "hsl(var(--brand-amethyst) / 0.26)",
      glowMiddle: "hsl(var(--brand-celeste) / 0.24)",
      glowInner: "hsl(var(--brand-amethyst) / 0.24)",
      baseLight: "hsl(var(--brand-amethyst) / 0.9)",
      baseMid: "hsl(var(--brand-tekhelet) / 0.7)",
      baseAccent: "hsl(var(--brand-amethyst) / 0.55)",
      baseDeep: "hsl(var(--brand-persian-indigo))",
      oceanA: "hsl(var(--brand-amethyst) / 0.4)",
      oceanB: "hsl(var(--brand-tekhelet) / 0.35)",
      oceanC: "hsl(var(--brand-amethyst) / 0.32)",
      oceanD: "hsl(var(--brand-tekhelet) / 0.3)",
      landA: "hsl(var(--brand-amethyst) / 0.6)",
      landB: "hsl(var(--brand-amethyst) / 0.55)",
      landC: "hsl(var(--brand-persian-indigo) / 0.6)",
      landD: "hsl(var(--brand-persian-indigo) / 0.68)",
      cloudSoftA: "hsl(var(--brand-amethyst) / 0.22)",
      cloudSoftB: "hsl(var(--brand-tekhelet) / 0.18)",
      cloudSoftC: "hsl(var(--brand-amethyst) / 0.16)",
      cloudSoftD: "hsl(var(--brand-tekhelet) / 0.14)",
      cloudWispsA: "hsl(var(--brand-amethyst) / 0.2)",
      cloudWispsB: "hsl(var(--brand-tekhelet) / 0.18)",
      cloudWispsC: "hsl(var(--brand-tekhelet) / 0.16)",
      polarNorth: "hsl(var(--brand-amethyst) / 0.3)",
      polarSouth: "hsl(var(--brand-amethyst) / 0.28)",
      scatterHighlight: "hsl(var(--brand-amethyst) / 0.26)",
      scatterShadow: "rgba(18, 8, 30, 0.55)",
      textureLight: "hsl(var(--brand-amethyst) / 0.2)",
      textureDark: "hsl(var(--brand-tekhelet) / 0.18)",
      shimmer: "hsl(var(--brand-amethyst) / 0.2)",
      rim: "hsl(var(--brand-amethyst) / 0.6)",
      highlight: "hsl(var(--brand-amethyst) / 0.32)",
      lensPrimary: "hsl(var(--brand-amethyst) / 0.3)",
      lensSecondary: "hsl(var(--brand-tekhelet) / 0.26)",
      nebulaA: "hsl(var(--brand-amethyst) / 0.2)",
      nebulaB: "hsl(var(--brand-tekhelet) / 0.18)",
      particleBright: "hsl(var(--brand-amethyst) / 0.6)",
      particleDim: "hsl(var(--brand-tekhelet) / 0.4)",
      waveA: "hsl(var(--brand-amethyst) / 0.26)",
      waveB: "hsl(var(--brand-tekhelet) / 0.24)"
    },
    glowShadow: "0 0 46px rgba(168,130,255,0.5)"
  }
];

type PlanetVisualProps = {
  planet: PlanetConfig;
};

function DefaultPlanetVisual({ planet }: PlanetVisualProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-full"
      style={{
        background: planet.baseGradient,
        boxShadow: planet.glowShadow
      }}
    >
      {planet.textureSrc ? (
        <Image
          src={planet.textureSrc}
          alt="Planet texture"
          fill
          className="pointer-events-none rounded-full object-cover"
          style={{ filter: `saturate(${planet.textureSaturation ?? 1}) contrast(1.05)` }}
        />
      ) : null}

      {planet.haloGlow ? (
        <span
          className="absolute inset-[-18%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${planet.haloGlow} 0%, rgba(0,0,0,0) 72%)`,
            opacity: 0.5,
            filter: "blur(12px)",
            mixBlendMode: "screen"
          }}
        />
      ) : null}

      {planet.atmosphereGlow ? (
        <span
          className="absolute inset-[-8%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${planet.atmosphereGlow} 0%, rgba(0,0,0,0) 75%)`,
            opacity: 0.75,
            mixBlendMode: "screen"
          }}
        />
      ) : null}

      {!planet.textureSrc && planet.surfaceGradient ? (
        <span className="absolute inset-0 rounded-full opacity-85" style={{ background: planet.surfaceGradient }} />
      ) : null}

      {planet.bandGradient ? (
        <span className="absolute inset-0 rounded-full opacity-65 mix-blend-screen" style={{ background: planet.bandGradient }} />
      ) : null}

      {planet.textureOverlay ? (
        <span className="absolute inset-0 rounded-full opacity-60" style={{ background: planet.textureOverlay, mixBlendMode: "screen" }} />
      ) : null}

      {planet.cloudGradient ? (
        <span className="absolute inset-[-8%] rounded-full opacity-55 mix-blend-screen" style={{ background: planet.cloudGradient }} />
      ) : null}

      {planet.highlightGradient ? (
        <span className="absolute inset-0 rounded-full" style={{ background: planet.highlightGradient, mixBlendMode: "screen", opacity: 0.8 }} />
      ) : null}

      {planet.nightTint ? (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 70% 60%, transparent 0%, ${planet.nightTint} 65%)`,
            mixBlendMode: "multiply",
            opacity: 0.8
          }}
        />
      ) : null}

      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,${planet.terminatorSoftness ?? 0.48}) 0%, rgba(0,0,0,0) 55%)`,
          mixBlendMode: "multiply",
          opacity: 0.9
        }}
      />

      <span
        className="absolute left-[20%] top-[18%] rounded-full blur-[10px] opacity-80"
        style={{
          width: `${(planet.highlightSize ?? 0.5) * 70}%`,
          height: `${(planet.highlightSize ?? 0.5) * 45}%`,
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
          transform: "rotate(-18deg)",
          mixBlendMode: "screen"
        }}
      />

      {planet.rimColor ? (
        <span
          className="absolute inset-[-6%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${planet.rimColor} 0%, rgba(255,255,255,0) ${(planet.rimIntensity ?? 0.7) * 100}%)`,
            mixBlendMode: "screen",
            opacity: 0.75
          }}
        />
      ) : null}

      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 120deg, rgba(0,0,0,0.25), rgba(0,0,0,0) 90deg, rgba(255,255,255,0.2) 130deg, rgba(0,0,0,0) 240deg)",
          mixBlendMode: "soft-light",
          opacity: 0.55
        }}
      />
    </div>
  );
}

function AuroraPlanetVisual({ palette }: { palette: AuroraPalette }) {
  const layers = useMemo(() => ({
    outerGlow: `radial-gradient(circle, ${palette.glowOuter} 0%, ${palette.glowMiddle} 30%, transparent 70%)`,
    middleGlow: `radial-gradient(circle, ${palette.glowMiddle} 0%, ${palette.glowInner} 40%, transparent 70%)`,
    innerGlow: `radial-gradient(circle, ${palette.glowInner} 0%, ${palette.glowOuter} 55%, transparent 80%)`,
    baseSphere: `radial-gradient(circle at 35% 35%, ${palette.baseLight} 0%, ${palette.baseMid} 25%, ${palette.baseAccent} 50%, ${palette.baseDeep} 75%, ${palette.baseDeep} 100%)`,
    ocean: `radial-gradient(ellipse 55% 38% at 25% 30%, ${palette.oceanA} 0%, transparent 55%),
            radial-gradient(ellipse 45% 32% at 70% 45%, ${palette.oceanB} 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 40% 70%, ${palette.oceanC} 0%, transparent 55%),
            radial-gradient(ellipse 35% 42% at 82% 75%, ${palette.oceanD} 0%, transparent 55%)`,
    land: `radial-gradient(ellipse 60% 40% at 60% 25%, ${palette.landA} 0%, transparent 60%),
           radial-gradient(ellipse 50% 60% at 20% 55%, ${palette.landB} 0%, transparent 60%),
           radial-gradient(ellipse 45% 32% at 75% 65%, ${palette.landC} 0%, transparent 55%),
           radial-gradient(ellipse 35% 45% at 45% 85%, ${palette.landD} 0%, transparent 55%)`,
    cloudsSoft: `radial-gradient(ellipse 65% 30% at 15% 20%, ${palette.cloudSoftA} 0%, transparent 60%),
                 radial-gradient(ellipse 55% 28% at 55% 35%, ${palette.cloudSoftB} 0%, transparent 55%),
                 radial-gradient(ellipse 45% 32% at 80% 50%, ${palette.cloudSoftC} 0%, transparent 60%),
                 radial-gradient(ellipse 40% 30% at 30% 75%, ${palette.cloudSoftD} 0%, transparent 55%)`,
    cloudsWisps: `radial-gradient(ellipse 45% 35% at 40% 15%, ${palette.cloudWispsA} 0%, transparent 65%),
                  radial-gradient(ellipse 40% 28% at 65% 60%, ${palette.cloudWispsB} 0%, transparent 60%),
                  radial-gradient(ellipse 35% 30% at 25% 85%, ${palette.cloudWispsC} 0%, transparent 55%)`,
    polarCaps: `radial-gradient(ellipse 55% 18% at 50% 0%, ${palette.polarNorth} 0%, transparent 55%),
                radial-gradient(ellipse 52% 16% at 50% 100%, ${palette.polarSouth} 0%, transparent 55%)`,
    scatter: `radial-gradient(circle at 35% 35%, ${palette.scatterHighlight} 0%, transparent 40%, ${palette.scatterShadow} 85%)`,
    texture: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${palette.textureLight} 10px, ${palette.textureLight} 20px),
              repeating-linear-gradient(-45deg, transparent, transparent 12px, ${palette.textureDark} 12px, ${palette.textureDark} 24px)`,
    shimmer: `linear-gradient(135deg, ${palette.shimmer} 0%, transparent 50%, ${palette.glowMiddle} 100%)`,
    highlight: `linear-gradient(135deg, ${palette.highlight} 0%, transparent 100%)`,
    rim: `radial-gradient(circle, ${palette.rim} 0%, rgba(255,255,255,0) 70%)`,
    lensPrimary: `radial-gradient(circle, ${palette.lensPrimary} 0%, transparent 70%)`,
    lensSecondary: `radial-gradient(circle, ${palette.lensSecondary} 0%, transparent 70%)`,
    nebula: `radial-gradient(ellipse at 30% 40%, ${palette.nebulaA} 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, ${palette.nebulaB} 0%, transparent 50%)`
  }), [palette]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="absolute inset-[-28%] rounded-full"
        style={{ background: layers.outerGlow }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[-20%] rounded-full"
        style={{ background: layers.middleGlow }}
        animate={{ scale: [1.05, 0.98, 1.05], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.div
        className="absolute inset-[-12%] rounded-full blur-3xl"
        style={{ background: layers.innerGlow }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.65, 0.85, 0.65] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="relative z-10 h-full w-full">
        <motion.div
          className="relative h-full w-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full" style={{ background: layers.baseSphere, boxShadow: "inset -40px -40px 80px rgba(0,0,0,0.4)" }}>
            <div className="absolute inset-0 rounded-full opacity-70" style={{ background: layers.ocean }} />
            <motion.div className="absolute inset-0 rounded-full" style={{ background: layers.land }} animate={{ opacity: [0.7, 0.9, 0.7] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute inset-0 rounded-full" style={{ background: layers.cloudsSoft }} animate={{ x: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute inset-0 rounded-full" style={{ background: layers.cloudsWisps }} animate={{ x: [0, -12, 0], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
            <div className="absolute inset-0 rounded-full" style={{ background: layers.polarCaps }} />
            <div className="absolute inset-0 rounded-full" style={{ background: layers.scatter }} />
            <motion.div className="absolute inset-0 rounded-full opacity-20" style={{ backgroundImage: layers.texture }} animate={{ rotate: [0, 360] }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} />
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 40px ${palette.glowInner}`, mixBlendMode: "screen" }} />
          </div>

          <motion.div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: layers.shimmer }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ background: layers.highlight, mixBlendMode: "screen" }}
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </motion.div>
      </motion.div>

      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 42 + (i % 3) * 8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.span
            key={`aurora-particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `calc(50% + ${x}%)`,
              top: `calc(50% + ${y}%)`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 2)}px`,
              background: i % 2 === 0 ? palette.particleBright : palette.particleDim,
              boxShadow: `0 0 12px ${palette.particleBright}`
            }}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.35 }}
          />
        );
      })}

      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`aurora-wave-${i}`}
          className="absolute rounded-full border"
          style={{
            width: "240%",
            height: "240%",
            borderRadius: "9999px",
            borderWidth: 1,
            borderColor: i % 2 === 0 ? palette.waveA : palette.waveB,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
          animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{
          background: layers.lensPrimary,
          width: "55%",
          height: "55%",
          left: "32%",
          top: "30%",
          transform: "translate(-50%, -50%)"
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-xl"
        style={{
          background: layers.lensSecondary,
          width: "38%",
          height: "38%",
          right: "28%",
          bottom: "28%",
          transform: "translate(50%, 50%)"
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.25, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: layers.nebula }} />
    </div>
  );
}

const STAR_COUNT = 140;
const STAR_COLOR_KEYS = Object.keys(STAR_COLORS) as (keyof typeof STAR_COLORS)[];

function useStarfield(count: number) {
  return useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.9 + 0.35,
        duration: Math.random() * 6 + 7,
        delay: Math.random() * 6,
        variant: Math.random() > 0.82 ? "spark" : Math.random() > 0.6 ? "trail" : "dot",
        orientation: Math.random() * 360,
        color: STAR_COLOR_KEYS[Math.floor(Math.random() * STAR_COLOR_KEYS.length)]
      })),
    [count]
  );
}

function OrbitSolarSystem({ className }: { className?: string }) {
  const stars = useStarfield(STAR_COUNT);
  const planetAngles = useMemo(() => PLANETS.map(() => Math.random() * 360), []);

  return (
    <div className={cn("relative mx-auto flex w-full max-w-[80rem] items-center justify-center", className)}>
      <div className="relative aspect-square w-full max-w-[42rem] sm:max-w-[50rem] lg:max-w-[60rem]">
        {/* Starfield */}
        <div className="pointer-events-none absolute inset-[-22%] z-10" aria-hidden="true">
          {stars.map((star, index) => {
            const baseSize = star.scale * 4 + 2;
            const palette = STAR_COLORS[star.color];
            const commonStyle = {
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: 0.7
            };
            const commonAnimate = { opacity: [0.15, 1, 0.15] };
            const commonTransition = { duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" };

            if (star.variant === "spark") {
              const armLength = baseSize * 1.8;
              const armThickness = Math.max(1.5, baseSize * 0.2);
              return (
                <motion.span
                  key={`star-${index}`}
                  className="absolute flex items-center justify-center"
                  style={{ ...commonStyle, transform: `rotate(${star.orientation}deg)` }}
                  animate={commonAnimate}
                  transition={commonTransition}
                >
                  <span
                    className="absolute rounded-full"
                    style={{ width: armThickness, height: armLength, filter: "blur(0.4px)", background: palette.arm }}
                  />
                  <span
                    className="absolute rounded-full"
                    style={{ width: armLength, height: armThickness, filter: "blur(0.4px)", background: palette.arm }}
                  />
                  <span
                    className="h-[6px] w-[6px] rounded-full"
                    style={{ width: baseSize, height: baseSize, background: `radial-gradient(circle, ${palette.core} 0%, ${palette.glow} 60%, transparent 82%)` }}
                  />
                </motion.span>
              );
            }

            if (star.variant === "trail") {
              const trailLength = baseSize * 2.8;
              return (
                <motion.span
                  key={`star-${index}`}
                  className="absolute origin-center"
                  style={{
                    ...commonStyle,
                    width: Math.max(1.2, baseSize * 0.25),
                    height: trailLength,
                    transform: `rotate(${star.orientation}deg)`,
                    background: `linear-gradient(to bottom, ${palette.core}, rgba(255,255,255,0))`,
                    borderRadius: 9999
                  }}
                  animate={commonAnimate}
                  transition={commonTransition}
                />
              );
            }

            return (
              <motion.span
                key={`star-${index}`}
                className="absolute rounded-full"
                style={{
                  ...commonStyle,
                  width: baseSize,
                  height: baseSize,
                  background: `radial-gradient(circle at 35% 35%, ${palette.core}, ${palette.glow} 65%, transparent 82%)`,
                  boxShadow: `0 0 12px ${palette.glow}`
                }}
                animate={commonAnimate}
                transition={commonTransition}
              />
            );
          })}
        </div>

        {/* Glow backdrop */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-3xl z-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at center, rgba(124, 74, 226, 0.42) 0%, rgba(30, 10, 59, 0.2) 45%, transparent 80%)"
          }}
        />

        {/* Orbit rings */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {ORBIT_RINGS.map((ring, index) => (
            <div
              key={`ring-${index}`}
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
              style={{
                opacity: ring.opacity,
                transform: `translate(-50%, -50%) scale(${ring.scale})`
              }}
            />
          ))}
        </div>

        {/* Central emblem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-[clamp(12rem,32vw,18rem)] w-[clamp(12rem,32vw,18rem)] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,190,135,0.5),rgba(58,20,104,0.92))] shadow-[0_0_120px_rgba(123,82,240,0.45)]">
            <span className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,190,135,0.28),transparent_72%)] blur-2xl opacity-75" aria-hidden="true" />
            <Image
              src="/brand/logo_main_2.png"
              alt="Orbit emblem"
              fill
              priority
              sizes="(max-width: 768px) 160px, (max-width: 1280px) 200px, 220px"
              className="relative z-10 object-contain drop-shadow-[0_0_45px_rgba(255,182,135,0.45)]"
            />
          </div>
        </div>

        {/* Planets */}
        {PLANETS.map((planet, index) => {
          const sizeStyle = { width: planet.size, height: planet.size } as CSSProperties;

          return (
            <div key={`planet-${index}`} className="absolute inset-0">
              <motion.div
                className="absolute left-1/2 top-1/2 h-full w-full"
                style={{ transform: `translate(-50%, -50%) scale(${planet.scale})`, transformOrigin: "50% 50%" }}
                transformTemplate={(_, generated) => `translate(-50%, -50%) scale(${planet.scale}) ${generated}`}
                initial={{ rotate: planetAngles[index] }}
                animate={{ rotate: planetAngles[index] + 360 }}
                transition={{ duration: planet.duration, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute left-1/2 top-0"
                  style={{ transform: "translate(-50%, -50%)", transformOrigin: "50% 50%" }}
                  transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
                  initial={{ rotate: -planetAngles[index] }}
                  animate={{ rotate: -planetAngles[index] - 360 }}
                  transition={{ duration: planet.duration, repeat: Infinity, ease: "linear" }}
                >
                  <div className="relative" style={sizeStyle}>
                    {planet.customRenderer === "aurora" && planet.auroraPalette ? (
                      <AuroraPlanetVisual palette={planet.auroraPalette} />
                    ) : (
                      <DefaultPlanetVisual planet={planet} />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="section-shell relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden">
      <div className="hero-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative z-10 flex flex-1 flex-col items-center justify-center gap-10 pb-16 pr-0 pt-0 sm:gap-12 sm:pb-20 sm:pr-0">
        <div className="relative z-0 flex w-full flex-col items-center gap-1 pt-4 text-center">
          <div className="flex w-full items-center justify-between text-[2.5rem] font-semibold uppercase tracking-[0.32em]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #3ac2d6 0%, #c96cff 45%, #f96dd4 100%)" }}
            >
              Always
            </span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #f96dd4 0%, #ffb46a 100%)" }}
            >
              Ahead
            </span>
          </div>
          <span
            className="mx-auto text-[2.5rem] uppercase tracking-[0.38em] text-transparent"
            style={{
              backgroundImage: "linear-gradient(115deg, #c96cff 8%, #f96dd4 45%, #ffb46a 100%)",
              backgroundSize: "160% 160%",
              backgroundPosition: "0% 50%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}
          >
            of
          </span>
          <h1 className="hero-wordmark mx-auto -mt-2 pt-8 text-center text-[clamp(5.5rem,18vw,13rem)] leading-[0.8]">
            Orbit
          </h1>
        </div>

        <OrbitSolarSystem className="relative z-[5] -mt-12 w-full sm:-mt-20" />
      </div>
    </section>
  );
}
