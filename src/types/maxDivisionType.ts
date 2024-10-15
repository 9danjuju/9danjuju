export type BaseDivisionType = {
  matchType: number;
  achievementDate: string;
};

export type MaxDivisionType = BaseDivisionType & {
  division: number;
};

export type ConvertDivisionType = BaseDivisionType & {
  division: string | undefined;
};

export type DivisionJsonType = {
  divisionId: number;
  divisionName: string;
};
