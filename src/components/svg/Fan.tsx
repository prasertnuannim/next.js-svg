"use client";

type FanProps = {
    isRunning?: boolean;
    duration?: number;
};
const Fan: React.FC<FanProps> = ({ isRunning, duration }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 454 340" className="w-[200px] h-auto">
                <g id="body">
                    <circle cx="226.65" cy="169.59" r="123.68" fill="#eee" />
                    <path
                        d="M75.68,51.72s7.55-31.94,34.84-32.52,232.26,0,232.26,0c0,0,35.42,7.55,35.42,32.52v231.1s-1.16,37.16-37.74,39.48H115.16s-39.48-1.16-39.48-42.97V51.72Z"
                        fill="#000"
                    />
                    <ellipse cx="224.9" cy="167.56" rx="121.94" ry="121.65" fill="#eee" />
                </g>

                <g
                    className={isRunning ? "spin" : ""}
                    style={{
                        transformOrigin: "226.65px 169.59px",
                        animationDuration: `${duration}s`,
                    }}
                >
                    <path
                        fill="#000"
                        d="M204.39,137.41s-20.32-19.6-43.69-24.24c0,0-23.81-7.98,2.9-28.02s52.26-20.61,52.26-20.61c0,0,13.35-1.45,20.03,17.42s6.1,52.84,6.1,52.84c0,0,7.26,2.76,7.69,4.5,0,0,8.42-8.56,10.31-47.61s41.37,1.74,41.37,1.74c0,0,12.19,12.05,16.4,20.18s15.82,25.11-8.13,39.48-23.08,13.79-44.56,19.02c0,0,1.16,7.11-1.02,9.29,0,0,19.31,4.65,45-3.48,25.69-8.13,25.84,5.81,18.58,26.27s-24.97,39.92-24.97,39.92c0,0-11.9,16.4-36.87-3.19s-28.6-33.97-28.6-33.97c0,0-2.76,2.03-9.29,1.16,0,0,1.31,22.94,20.9,46.16s-26.85,21.19-26.85,21.19c0,0-29.47-3.77-41.52-11.03s-18-15.39-6.24-43.84c0,0,4.06-10.16,20.47-28.89,0,0-4.79-6.24-4.5-10.6,0,0-24.68,16.4-32.95,29.32s-19.02,20.18-27.87-1.02-8.42-37.16-6.82-55.74,21.77-20.32,36.29-19.31,39.34,9.58,39.92,10.02.15-1.02,5.66-6.97Z"
                    />
                    <ellipse cx="226.68" cy="168.14" rx="17.27" ry="17.42" fill="#fff" />
                    <ellipse cx="225.41" cy="166.21" rx="17.27" ry="17.42" fill="#fff" />
                </g>
            </svg>

            <style jsx>{`
                .spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Fan;
