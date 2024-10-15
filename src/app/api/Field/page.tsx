import { SppositionType } from '@/types/matchType';

const Field = () => {
  return (
    <>
      <div>바보</div>
      <div>
        <div className="relative w-[1440px] h-[700px] bg-field bg-green-600 overflow-hidden shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            {/*중앙 선 */}
            <div className="h-full w-0.5 bg-white"></div>
          </div>
          {/* 중앙 원 */}
          <div className="absolute left-1/2 top-1/2 w-32 h-32 border-solid border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          {/* 페널티 박스 - 왼쪽 */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-2 w-24 h-200 border-solid border-2 border-white"></div>
          {/* 페널티 박스 - 오른쪽 */}
          <div className="absolute top-[50%] transform -translate-y-1/2 right-2 w-24 h-200 border-solid border-2 border-white"></div>
          {/* 골대 - 왼쪽 */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-2 w-8 h-24 border-solid border-2 border-white"></div>
          {/* 골대 - 오른쪽 */}
          <div className="absolute top-1/2 transform -translate-y-1/2 right-2 w-8 h-24 border-solid border-2 border-white"></div>
          {/* 왼쪽 팀 포지션들 */}
          {/* 골키퍼 - 왼쪽 */}
          <button className="absolute top-1/2 left-[3%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            GK
          </button>
          {/* 수비수들 */}
          <button className="absolute top-[10%] left-[15%] bg-win text-white p-2 rounded">LWB</button>
          <button className="absolute top-[10%] left-[10%] bg-win text-white p-2 rounded">LB</button>
          <button className="absolute top-[25%] left-[10%] bg-win text-white p-2 rounded">LCB</button>
          <button className="absolute top-[50%] left-[10%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            CB
          </button>
          <button className="absolute top-[50%] left-[15%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            SW
          </button>
          <button className="absolute bottom-[25%] left-[10%] bg-win text-white p-2 rounded">RCB</button>
          <button className="absolute bottom-[10%] left-[10%] bg-win text-white p-2 rounded">RB</button>
          <button className="absolute bottom-[10%] left-[15%] bg-win text-white p-2 rounded">RWB</button>
          {/* 미드필더들 */}
          <button className="absolute top-[25%] left-[20%] bg-win text-white p-2 rounded">LDM</button>
          <button className="absolute top-[50%] left-[20%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            CDM
          </button>
          <button className="absolute bottom-[25%] left-[20%] bg-win text-white p-2 rounded">RDM</button>
          <button className="absolute top-[25%] left-[25%] bg-win text-white p-2 rounded">LCM</button>
          <button className="absolute top-[50%] left-[25%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            CM
          </button>
          <button className="absolute bottom-[25%] left-[25%] bg-win text-white p-2 rounded">RCM</button>
          <button className="absolute top-[10%] left-[25%] bg-win text-white p-2 rounded">LM</button>
          <button className="absolute bottom-[10%] left-[25%] bg-win text-white p-2 rounded">RM</button>
          <button className="absolute top-[25%] left-[30%] bg-win text-white p-2 rounded">LAM</button>
          <button className="absolute top-[50%] left-[30%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            CAM
          </button>
          <button className="absolute bottom-[25%] left-[30%] bg-win text-white p-2 rounded">RAM</button>
          {/* 공격수들 */}
          <button className="absolute top-[10%] left-[35%] bg-win text-white p-2 rounded">LW</button>
          <button className="absolute top-[50%] left-[35%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            CF
          </button>
          <button className="absolute top-1/3 left-[35%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            LF
          </button>
          <button className="absolute bottom-1/3 left-[35%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            RF
          </button>
          <button className="absolute bottom-[10%] left-[35%] bg-win text-white p-2 rounded">RW</button>
          <button className="absolute top-1/3 left-[40%] bg-win text-white p-2 rounded">LS</button>
          <button className="absolute top-[50%] left-[40%] transform -translate-y-1/2 bg-win text-white p-2 rounded">
            ST
          </button>
          <button className="absolute bottom-1/3 left-[40%] bg-win text-white p-2 rounded">RS</button>

          {/* 오른쪽 팀 포지션들 */}
          {/* 골키퍼 - 오른쪽 */}
          <button className="absolute top-[50%] right-[3%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            GK
          </button>
          {/* 수비수들 */}
          <button className="absolute top-[10%] right-[15%] bg-lose text-white p-2 rounded">RWB</button>
          <button className="absolute top-[10%] right-[10%] bg-lose text-white p-2 rounded">RB</button>
          <button className="absolute top-[25%] right-[10%] bg-lose text-white p-2 rounded">RCB</button>
          <button className="absolute top-[50%] right-[10%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            CB
          </button>
          <button className="absolute top-[50%] right-[15%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            SW
          </button>
          <button className="absolute bottom-[25%] right-[10%] bg-lose text-white p-2 rounded">LCB</button>
          <button className="absolute bottom-[10%] right-[10%] bg-lose text-white p-2 rounded">LB</button>
          <button className="absolute bottom-[10%] right-[15%] bg-lose text-white p-2 rounded">LWB</button>
          {/* 미드필더들 */}
          <button className="absolute top-[25%] right-[20%] bg-lose text-white p-2 rounded">RDM</button>
          <button className="absolute top-[50%] right-[20%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            CDM
          </button>
          <button className="absolute bottom-[25%] right-[20%] bg-lose text-white p-2 rounded">LDM</button>
          <button className="absolute top-[25%] right-[25%] bg-lose text-white p-2 rounded">RCM</button>
          <button className="absolute top-[50%] right-[25%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            CM
          </button>
          <button className="absolute bottom-[25%] right-[25%] bg-lose text-white p-2 rounded">LCM</button>
          <button className="absolute top-[10%] right-[25%] bg-lose text-white p-2 rounded">RM</button>
          <button className="absolute bottom-[10%] right-[25%] bg-lose text-white p-2 rounded">LM</button>
          <button className="absolute top-[25%] right-[30%] bg-lose text-white p-2 rounded">RAM</button>
          <button className="absolute top-[50%] right-[30%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            CAM
          </button>
          <button className="absolute bottom-[25%] right-[30%] bg-lose text-white p-2 rounded">LAM</button>
          {/* 공격수들 */}
          <button className="absolute top-[10%] right-[35%] bg-lose text-white p-2 rounded">RW</button>
          <button className="absolute top-[50%] right-[35%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            CF
          </button>
          <button className="absolute top-1/3 right-[35%] bg-lose text-white p-2 rounded">RF</button>
          <button className="absolute bottom-1/3 right-[35%] bg-lose text-white p-2 rounded">LF</button>
          <button className="absolute bottom-[10%] right-[35%] bg-lose text-white p-2 rounded">LW</button>
          <button className="absolute top-1/3 right-[40%] bg-lose text-white p-2 rounded">RS</button>
          <button className="absolute top-[50%] right-[40%] transform -translate-y-1/2 bg-lose text-white p-2 rounded">
            ST
          </button>
          <button className="absolute bottom-1/3 right-[40%] bg-lose text-white p-2 rounded">LS</button>
        </div>
      </div>
    </>
  );
};

export default Field;
