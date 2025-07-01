type LinkLineProps = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeWidth?: number; //ขนาดท่อ
    isFlowing?: boolean;
    isOpen?: boolean;
};

export default function LinkLine({ x1, y1, x2, y2, strokeWidth = 16, isFlowing = true, isOpen = true }: LinkLineProps) {
    const dx = Math.abs(x2 - x1);
    const controlX1 = x1 + dx / 2;
    const controlY1 = y1;
    const controlX2 = x2 - dx / 2;
    const controlY2 = y2;

    const d = `M ${x1},${y1} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${x2},${y2}`;

    return (
        <>
            <path d={d} stroke="#000" strokeWidth={strokeWidth + 8} fill="none" />
            <path d={d} stroke="#fff" strokeWidth={strokeWidth} fill="none" />
            <path
                d={d}
                stroke="#4CAF50"
                strokeWidth={strokeWidth}
                strokeDasharray={isOpen ? "26 24" : "0"}
                className={isFlowing ? "animated-dash" : ""}
                fill="none"
            />
            <style jsx>{`
                .animated-dash {
                    animation: dashmove 0.5s linear infinite;
                }

                @keyframes dashmove {
                    to {
                        stroke-dashoffset: -50;
                    }
                }
            `}</style>
        </>
    );
}
