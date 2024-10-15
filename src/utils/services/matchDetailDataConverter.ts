import { DetailButtonsKeysType } from '@/components/detail/MatchDetailContents';
import { DefenceType, PassingType, ShootType } from '@/types/matchType';
interface ShootDataType {
  allshoot: { content: string; percentage: number };
  heading: { content: string; percentage: number };
  freekick: { content: string; percentage: number };
  inBox: { content: string; percentage: number };
  outBox: { content: string; percentage: number };
  penalty: { content: string; percentage: number };
}

interface PassDataType {
  pass: { content: string; percentage: number };
  shortPass: { content: string; percentage: number };
  longPass: { content: string; percentage: number };
  throughPass: { content: string; percentage: number };
  lobbedThroughPass: { content: string; percentage: number };
  bouncingLobPass: { content: string; percentage: number };
  drivenGroundPass: { content: string; percentage: number };
}

interface DefenceDataType {
  block: { content: string; percentage: number };
  tackle: { content: string; percentage: number };
}

export const dataConverter = (data: DefenceType | ShootType | PassingType, type: DetailButtonsKeysType) => {
  switch (type) {
    case 'shoot': {
      const shootData = data as ShootType;
      return {
        allshoot: {
          content: `${shootData.effectiveShootTotal}/${shootData.shootTotal}`,
          percentage:
            shootData.shootTotal === 0 ? 0 : Math.floor((shootData.effectiveShootTotal / shootData.shootTotal) * 100)
        },
        heading: {
          content: `${shootData.goalHeading}/${shootData.shootHeading}`,
          percentage:
            shootData.shootHeading === 0 ? 0 : Math.floor((shootData.goalHeading / shootData.shootHeading) * 100)
        },
        freekick: {
          content: `${shootData.goalFreekick}/${shootData.shootFreekick}`,
          percentage:
            shootData.shootFreekick === 0 ? 0 : Math.floor((shootData.goalFreekick / shootData.shootFreekick) * 100)
        },
        inBox: {
          content: `${shootData.goalInPenalty}/${shootData.shootInPenalty}`,
          percentage:
            shootData.shootInPenalty === 0 ? 0 : Math.floor((shootData.goalInPenalty / shootData.shootInPenalty) * 100)
        },
        outBox: {
          content: `${shootData.goalOutPenalty}/${shootData.shootOutPenalty}`,
          percentage:
            shootData.shootOutPenalty === 0
              ? 0
              : Math.floor((shootData.goalOutPenalty / shootData.shootOutPenalty) * 100)
        },
        penalty: {
          content: `${shootData.goalPenaltyKick}/${shootData.shootPenaltyKick}`,
          percentage:
            shootData.shootPenaltyKick === 0
              ? 0
              : Math.floor((shootData.goalPenaltyKick / shootData.shootPenaltyKick) * 100)
        }
      } as ShootDataType;
    }
    case 'pass': {
      const passData = data as PassingType;
      return {
        pass: {
          content: `${passData.passSuccess}/${passData.passTry}`,
          percentage: passData.passTry === 0 ? 0 : Math.floor((passData.passSuccess / passData.passTry) * 100)
        },
        shortPass: {
          content: `${passData.shortPassSuccess}/${passData.shortPassTry}`,
          percentage:
            passData.shortPassTry === 0 ? 0 : Math.floor((passData.shortPassSuccess / passData.shortPassTry) * 100)
        },
        longPass: {
          content: `${passData.longPassSuccess}/${passData.longPassTry}`,
          percentage:
            passData.longPassTry === 0 ? 0 : Math.floor((passData.longPassSuccess / passData.longPassTry) * 100)
        },
        throughPass: {
          content: `${passData.throughPassSuccess}/${passData.throughPassTry}`,
          percentage:
            passData.throughPassTry === 0
              ? 0
              : Math.floor((passData.throughPassSuccess / passData.throughPassTry) * 100)
        },
        lobbedThroughPass: {
          content: `${passData.lobbedThroughPassSuccess}/${passData.lobbedThroughPassTry}`,
          percentage:
            passData.lobbedThroughPassTry === 0
              ? 0
              : Math.floor((passData.lobbedThroughPassSuccess / passData.lobbedThroughPassTry) * 100)
        },
        bouncingLobPass: {
          content: `${passData.bouncingLobPassSuccess}/${passData.bouncingLobPassTry}`,
          percentage:
            passData.bouncingLobPassTry === 0
              ? 0
              : Math.floor((passData.bouncingLobPassSuccess / passData.bouncingLobPassTry) * 100)
        },
        drivenGroundPass: {
          content: `${passData.drivenGroundPassSuccess}/${passData.drivenGroundPassTry}`,
          percentage:
            passData.drivenGroundPassTry === 0
              ? 0
              : Math.floor((passData.drivenGroundPassSuccess / passData.drivenGroundPassTry) * 100)
        }
      } as PassDataType;
    }
    case 'defence': {
      const defenceData = data as DefenceType;
      return {
        block: {
          content: `${defenceData.blockSuccess}/${defenceData.blockTry}`,
          percentage:
            defenceData.blockTry === 0 ? 0 : Math.floor((defenceData.blockSuccess / defenceData.blockTry) * 100)
        },
        tackle: {
          content: `${defenceData.tackleSuccess}/${defenceData.tackleTry}`,
          percentage:
            defenceData.tackleTry === 0 ? 0 : Math.floor((defenceData.tackleSuccess / defenceData.tackleTry) * 100)
        }
      } as DefenceDataType;
    }
    default:
      return {};
  }
};
