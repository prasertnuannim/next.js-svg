"use client";
import { useEffect, useState } from "react";
import NodeBox from "@/components/Diagram1/NodeBox";
import LinkLine from "@/components/Diagram1/LinkLine";
import Fan from "../svg/Fan";
import Valve from "../svg/Valve";
import WaterTank from "../svg/WaterTank";

export default function DiagramPage() {
  const [isValveOpen, setIsValveOpen] = useState(false);
  const [isFanRunning, setIsFanRunning] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(4);
  const [waterLevel, setWaterLevel] = useState(0);
  const isFlowing = isFanRunning && isValveOpen;

  // ตำแหน่งอุปกรณ์บนแผนผัง (ลากย้ายได้) ใช้กับ <NodeBox>
  const [positions, setPositions] = useState({
    fan: { x: 100, y: 300 },
    valve: { x: 400, y: 300 },
    waterTank: { x: 700, y: 100 },
  });

  const handleMove = (id: string, pos: { x: number; y: number }) => {
    setPositions((prev) => ({ ...prev, [id]: pos }));
  };

  // เพิ่มระดับน้ำอัตโนมัติทุก 2 วิ เมื่อเปิดวาล์วและพัดลมทำงาน
  useEffect(() => {
    if (isFanRunning && isValveOpen && waterLevel < 4) {
      const interval = setInterval(() => {
        setWaterLevel((prev) => Math.min(prev + 1, 4));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isFanRunning, isValveOpen, waterLevel]);

  // หยุดพัดลมและวาล์วเมื่อถังน้ำเต็ม
  useEffect(() => {
    if (waterLevel >= 4) {
      setIsValveOpen(false);
      setIsFanRunning(false);
    }
  }, [waterLevel]);

  // ลดระดับน้ำเรื่อย ๆ ทุก 3 วิ เมื่อวาล์วปิดหรือพัดลมหยุด
  useEffect(() => {
    if (!isFanRunning || !isValveOpen) {
      const interval = setInterval(() => {
        setWaterLevel((prev) => Math.max(prev - 1, 0));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFanRunning, isValveOpen]);

  // หยุดการทำงานเมื่อถังเต็ม
  useEffect(() => {
    if (waterLevel === 0) {
      setIsValveOpen(true);
      setIsFanRunning(true);
    }
  }, [waterLevel]);

  return (
    <div className="min-h-screen bg-[#eef4f9] px-3 py-4 text-slate-800 sm:px-5 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-4 overflow-hidden ">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/75 shadow-lg shadow-slate-200/50">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                POC DASHBOARD SCADA
              </p>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
              
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-100/75 blur-3xl" />            
                  <div className="mt-4 rounded-[18px] border border-slate-200/80 bg-white/88 p-3.5">
                    <div className="mb-2.5 flex items-center justify-between text-[12px] text-slate-500">
                      <span>Fan Speed</span>
                      <span className="rounded-full bg-slate-50 px-2.5 py-1 font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
                        {fanSpeed} วินาที/รอบ
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={fanSpeed}
                      onChange={(e) => setFanSpeed(parseInt(e.target.value))}
                      className="fan-range w-full"
                    />

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setIsFanRunning((prev) => !prev)}
                        className={`inline-flex min-h-[40px] min-w-[124px] items-center justify-center rounded-full px-4 py-2 text-[13px] font-semibold text-white shadow-lg transition hover:-translate-y-0.5 ${
                          isFanRunning
                            ? "bg-gradient-to-r from-rose-500 to-red-500 shadow-rose-200"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200"
                        }`}
                      >
                        {isFanRunning ? "หยุดพัดลม" : "เริ่มพัดลม"}
                      </button>
                    </div>
                  </div>
              
            </div>
          </div>
          <div className="overflow-x-auto p-4">
            <svg width={1300} height={600} className="min-w-[1300px]">
              <defs>
                <linearGradient
                  id="canvasBg"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#f8fbff" />
                  <stop offset="52%" stopColor="#eef5fb" />
                  <stop offset="100%" stopColor="#f6f9fc" />
                </linearGradient>
                <pattern
                  id="dashboardGrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#d9e7f4"
                    strokeWidth="1"
                  />
                </pattern>
                <filter
                  id="softGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>

              <rect
                x="0"
                y="0"
                width="1300"
                height="600"
                rx="28"
                fill="url(#canvasBg)"
              />
              <rect
                x="0"
                y="0"
                width="1300"
                height="600"
                rx="28"
                fill="url(#dashboardGrid)"
                opacity="0.65"
              />
              <rect
                x="18"
                y="18"
                width="1264"
                height="564"
                rx="24"
                fill="none"
                stroke="#d5e3ef"
                strokeWidth="1.5"
              />

              <text x="40" y="52" fill="#0f172a" fontSize="22" fontWeight="700">
                เว็บแอปจำลองระบบควบคุมพัดลม วาล์ว และถังเก็บน้ำ
              </text>
              <text x="40" y="76" fill="#64748b" fontSize="13">
                  โมเดลกราฟิกถูกออกแบบด้วย Adobe Illustrator และส่งออกเป็น SVG ก่อนนำมาแปลงเป็น React Components เพื่อใช้จำลองระบบ SCADA
              </text>

              {/* พัดลม */}
              <NodeBox
                id="fan"
                x={positions.fan.x}
                y={positions.fan.y}
                onMove={handleMove}
              >
                <Fan isRunning={isFanRunning} duration={fanSpeed} />
              </NodeBox>

              {/* ท่อ: พัดลม → วาล์ว */}
              <LinkLine
                x1={positions.fan.x + 134}
                y1={positions.fan.y + 60}
                x2={positions.valve.x + 30}
                y2={positions.valve.y + 94}
                isFlowing={isFlowing}
              />

              {/* วาล์ว */}
              <NodeBox
                id="valve"
                x={positions.valve.x}
                y={positions.valve.y}
                onMove={handleMove}
              >
                <Valve
                  isOpen={isValveOpen}
                  onToggle={() => setIsValveOpen((prev) => !prev)}
                  width={100}
                  height={100}
                />
              </NodeBox>

              {/* ถังน้ำ */}
              <NodeBox
                id="waterTank"
                x={positions.waterTank.x}
                y={positions.waterTank.y}
                width={500}
                height={500}
                onMove={handleMove}
              >
                <WaterTank level={waterLevel} />
              </NodeBox>

              {/* ท่อ: วาล์ว → ถังน้ำ */}
              <LinkLine
                x1={positions.valve.x + 130}
                y1={positions.valve.y + 94}
                x2={positions.waterTank.x + 10}
                y2={positions.waterTank.y + 162}
                isFlowing={isFlowing}
              />
            </svg>
          </div>
        </div>
        
      </div>

      <style jsx>{`
        .fan-range {
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            #7dd3fc 0%,
            #38bdf8 35%,
            #0f172a 100%
          );
          outline: none;
        }

        .fan-range::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid #0ea5e9;
          box-shadow: 0 6px 14px rgba(14, 165, 233, 0.24);
          cursor: pointer;
        }

        .fan-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border: 3px solid #0ea5e9;
          border-radius: 9999px;
          background: #ffffff;
          box-shadow: 0 6px 14px rgba(14, 165, 233, 0.24);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
