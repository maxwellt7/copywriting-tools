export const POE_MODELS = {
  eugeneSchwartzPro: 'EugeneSchwartzZPRO',
  vslScript: '5MVSLScript',
} as const;

export type PoeModel = typeof POE_MODELS[keyof typeof POE_MODELS];

