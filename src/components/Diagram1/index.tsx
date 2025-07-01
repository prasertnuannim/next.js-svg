"use client";
import { useEffect, useState } from "react";
import NodeBox from "@/components/Diagram1/NodeBox";
import LinkLine from "@/components/Diagram1/LinkLine";
import Fan from "../svg/Fan";
import Valve from "../svg/Valve";
import WaterTank from "../svg/WaterTank";
import Slider from "@mui/material/Slider";

export default function DiagramPage() {
    const [isValveOpen, setIsValveOpen] = useState(false);
    const [isFanRunning, setIsFanRunning] = useState(true);
    const [fanSpeed, setFanSpeed] = useState(4);
    const [waterLevel, setWaterLevel] = useState(0);

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
        <div className="flex flex-col items-center justify-center h-screen gap-6 bg-white">
            <div className="flex flex-row">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFanRunning((prev) => !prev)}
                        className={`px-4 py-2 text-white rounded ${isFanRunning ? "bg-red-500" : "bg-green-500"}`}
                    >
                        {isFanRunning ? "หยุดหมุนพัดลม" : "เริ่มหมุนพัดลม"}
                    </button>
                    <input
                        type="range"
                        min={1}
                        max={10}
                        value={fanSpeed}
                        onChange={(e) => setFanSpeed(parseInt(e.target.value))}
                    />
                    <span>{fanSpeed} วินาที/รอบ</span>
                </div>
                <div className="ml-20">
                    <Slider
                        value={waterLevel}
                        onChange={(_, v) => typeof v === "number" && setWaterLevel(v)}
                        step={1}
                        min={0}
                        max={4}
                        marks={[
                            { value: 0, label: "0" },
                            { value: 1, label: "1" },
                            { value: 2, label: "2" },
                            { value: 3, label: "3" },
                            { value: 4, label: "4" },
                        ]}
                        sx={{ width: 300 }}
                    />
                </div>
            </div>
            <svg width={1300} height={600} style={{ border: "1px solid #ccc" }}>
                {/* พัดลม */}
                <NodeBox id="fan" x={positions.fan.x} y={positions.fan.y} onMove={handleMove}>
                    <Fan isRunning={isFanRunning} duration={fanSpeed} />
                </NodeBox>

                {/* ท่อ: พัดลม → วาล์ว */}
                <LinkLine
                    x1={positions.fan.x + 146}
                    y1={positions.fan.y + 60}
                    x2={positions.valve.x + 30}
                    y2={positions.valve.y + 94}
                    isFlowing={isFanRunning && isValveOpen}
                />

                {/* วาล์ว */}
                <NodeBox id="valve" x={positions.valve.x} y={positions.valve.y} onMove={handleMove}>
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
                    isFlowing={isFanRunning && isValveOpen}
                />
            </svg>
        </div>
    );
}
