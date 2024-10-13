export type MatchDetailType = {
  matchId: string;
  matchDate: string;
  matchType: number;
  matchInfo: PlayerMatchDetailType[];
};

export type PlayerMatchDetailType = {
  ouid: string;
  nickname: string;
  matchDetail: MatchDetailDetailType;
  shoot: ShootType;
  shootDetail: ShootingDetailType;
  pass: PassingType;
  defence: DefenceType;
  player: PlayerInfoType[];
};

export type MatchDetailDetailType = {
  seasonId: number;
  matchResult: string;
  matchEndType: number;
  systemPause: number;
  foul: number;
  injury: number;
  redCards: number;
  yellowCards: number;
  dribble: number;
  cornerKick: number;
  possession: number;
  OffsideCount: number;
  averageRating: number;
  controller: string;
};

export type ShootType = {
  shootTotal: number;
  effectiveShootTotal: number;
  shootOutScore: number;
  goalTotal: number;
  goalTotalDisplay: number;
  ownGoal: number;
  shootHeading: number;
  goalHeading: number;
  shootFreekick: number;
  goalFreekick: number;
  shootInPenalty: number;
  goalInPenalty: number;
  shootOutPenalty: number;
  goalOutPenalty: number;
  shootPenaltyKick: number;
  goalPenaltyKick: number;
};

export type ShootingDetailType = {
  goalTime: number;
  x: number;
  y: number;
  type: number;
  result: number;
  spId: number;
  spGrade: number;
  spLevel: number;
  spIdType: boolean;
  assist: boolean;
  assistSpId: number;
  assistX: number;
  assistY: number;
  hitPost: boolean;
  inPenalty: boolean;
};

export type PassingType = {
  passTry: number;
  passSuccess: number;
  shortPassTry: number;
  shortPassSuccess: number;
  longPassTry: number;
  longPassSuccess: number;
  bouncingLobPassTry: number;
  bouncingLobPassSuccess: number;
  drivenGroundPassTry: number;
  drivenGroundPassSuccess: number;
  throughPassTry: number;
  throughPassSuccess: number;
  lobbedThroughPassTry: number;
  lobbedThroughPassSuccess: number;
};

export type DefenceType = {
  blockTry: number;
  blockSuccess: number;
  tackleTry: number;
  tackleSuccess: number;
};

export type PlayerStatusType = {
  shoot: number;
  effectiveShoot: number;
  assist: number;
  goal: number;
  dribble: number;
  intercept: number;
  defending: number;
  passTry: number;
  passSuccess: number;
  dribbleTry: number;
  dribbleSuccess: number;
  ballPossessionTry: number;
  ballPossessionSuc: number;
  aerialTry: number;
  aerialSuccess: number;
  blockTry: number;
  block: number;
  tackleTry: number;
  tackle: number;
  yellowCards: number;
  redCards: number;
  spRating: number;
};

export type PlayerInfoType = {
  spId: number;
  spPosition: number;
  spGrade: number;
  status: PlayerStatusType;
};
