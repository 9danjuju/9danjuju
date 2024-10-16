export type FcUser = {
  ouid: string;
  nickname: string;
  level: string;
};

export type NxError = {
  error: {
    name: string;
    message: string;
  };
};

export type Rate = {
  matchType: number;
  division: number;
  achievementDate: string;
};

export type FormattedRate = {
  matchType: string;
  division: string;
  achievementDate: string;
};

export type DivisionMeta = {
  divisionId: number;
  divisionName: string;
};
