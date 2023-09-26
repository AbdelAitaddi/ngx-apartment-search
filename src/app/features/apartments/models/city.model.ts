export const Cities = {
  Berlin: 'berlin',
  Hamburg: 'hamburg',
  Munich: 'munich',
} as const;

export type CityTypes = (typeof Cities)[keyof typeof Cities];
