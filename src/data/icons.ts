import type { Component } from 'vue'
import {
  Award,
  BookOpen,
  Compass,
  FlaskConical,
  Footprints,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Medal,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from 'lucide-vue-next'

/**
 * Icons referenced from data files are stored as string keys so that data
 * modules stay serialisable. This map is the single place where a key is
 * resolved to a Lucide component.
 */
const registry = {
  award: Award,
  book: BookOpen,
  compass: Compass,
  flask: FlaskConical,
  footprints: Footprints,
  graduation: GraduationCap,
  heart: HeartHandshake,
  lightbulb: Lightbulb,
  medal: Medal,
  palette: Palette,
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  trophy: Trophy,
  users: Users,
} as const satisfies Record<string, Component>

export type IconName = keyof typeof registry

export const getIcon = (name: IconName): Component => registry[name]
