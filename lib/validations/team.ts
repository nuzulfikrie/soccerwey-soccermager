import { z } from 'zod'

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export const kitSchema = z.object({
  jersey: z.string().regex(HEX_COLOR_REGEX, 'Invalid color format'),
  pants: z.string().regex(HEX_COLOR_REGEX, 'Invalid color format'),
  socks: z.string().regex(HEX_COLOR_REGEX, 'Invalid color format'),
})

export const teamFormSchema = z.object({
  name: z.string().min(2, 'Team name must be at least 2 characters').max(50, 'Team name must be less than 50 characters'),
  logo: z.any().optional(), // Will be handled separately as File
  mainKit: kitSchema,
  secondKit: kitSchema,
  thirdKit: kitSchema,
})

export const playerSchema = z.object({
  name: z.string().min(2, 'Player name must be at least 2 characters').max(50, 'Player name must be less than 50 characters'),
  number: z.number().int().min(1, 'Number must be at least 1').max(99, 'Number must be less than 100'),
  position: z.enum(['GK', 'DEF', 'MID', 'FWD']),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  isSubstitute: z.boolean().default(false),
})

export const lineupFormSchema = z.object({
  name: z.string().min(2, 'Lineup name must be at least 2 characters').max(50, 'Lineup name must be less than 50 characters'),
  kitId: z.string().min(1, 'Please select a kit'),
  formation: z.string().regex(/^\d-\d-\d$/, 'Invalid formation format'),
  players: z.array(playerSchema).min(11, 'Must have at least 11 players').max(18, 'Cannot have more than 18 players'),
})

export type TeamFormData = z.infer<typeof teamFormSchema>
export type LineupFormData = z.infer<typeof lineupFormSchema>
export type PlayerFormData = z.infer<typeof playerSchema> 