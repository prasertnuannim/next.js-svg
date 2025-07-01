import React from "react";

type NodeBoxProps = {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    onMove?: (id: string, pos: { x: number; y: number }) => void;
    children?: React.ReactNode;
};

export default function NodeBox({ id, x, y, width, height, onMove, children }: NodeBoxProps) {
    const handleMouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const onMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (onMove) onMove(id, { x: x + dx, y: y + dy });
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <g transform={`translate(${x}, ${y})`} onMouseDown={handleMouseDown} style={{ cursor: "move" }}>
            <foreignObject width={width ?? 160} height={height ?? 160}>
                <div className="w-full h-full flex items-center justify-center">{children}</div>
            </foreignObject>
        </g>
    );
}
