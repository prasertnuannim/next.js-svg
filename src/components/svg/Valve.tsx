"use client";
import React from "react";

type ValveProps = {
    width?: number | string;
    height?: number | string;
    className?: string;
    isOpen?: boolean;
    onToggle?: () => void;
};

const Valve: React.FC<ValveProps> = ({ width = "100%", height = "auto", className = "", isOpen, onToggle }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 475.5 399.75"
            width={width}
            height={height}
            className={className}
            style={{ cursor: "pointer" }}
            onClick={onToggle}
        >
            <defs>
                <linearGradient
                    id="linear-gradient"
                    x1="237.63"
                    y1="397.06"
                    x2="237.63"
                    y2="134.53"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#231f20" />
                    <stop offset=".1" stopColor="#282526" />
                    <stop offset=".24" stopColor="#393637" />
                    <stop offset=".39" stopColor="#555253" />
                    <stop offset=".56" stopColor="#7c7a7a" />
                    <stop offset=".75" stopColor="#aeacad" />
                    <stop offset=".94" stopColor="#eae9e9" />
                    <stop offset="1" stopColor="#fff" />
                </linearGradient>
                <linearGradient
                    id="linear-gradient1"
                    x1="458.66"
                    y1="374.35"
                    x2="458.66"
                    y2="166.3"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#231f20" />
                    <stop offset="1" stopColor="#3cbeee" />
                </linearGradient>
                <linearGradient
                    id="linear-gradient2"
                    x1="18.22"
                    y1="374.82"
                    x2="18.22"
                    y2="166.77"
                    xlinkHref="#linear-gradient1"
                />
                <linearGradient
                    id="linear-gradient3"
                    x1="237.81"
                    y1="135.97"
                    x2="237.81"
                    y2="103.26"
                    xlinkHref="#linear-gradient1"
                />
                <linearGradient
                    id="linear-gradient4"
                    x1="237.79"
                    y1="103.11"
                    x2="237.79"
                    y2="64.65"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#231f20" />
                    <stop offset="1" stopColor="#fff" />
                </linearGradient>
                <linearGradient
                    id="linear-gradient5"
                    x1="237.52"
                    y1="64.65"
                    x2="237.52"
                    y2="1.65"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#231f20" />
                    <stop offset="1" stopColor="#fff" />
                </linearGradient>
            </defs>

            {/* Main valve body */}
            <path
                fill="url(#linear-gradient)"
                stroke="#000"
                strokeMiterlimit="10"
                d="M32.39,207.06s.92-7.06,6.29-9.1,93.05,0,93.05,0c0,0,16.11-25.26,34.4-33.97v-20.76s.44-7.4,6.68-8.13l130.21-.58s6.39,1.89,6.53,7.84v20.9s21.48,15.68,33.53,33.53l.87,1.04h92.61s7.06,1.35,6.87,6.77-.19,129.48-.19,129.48c0,0-.58,7.35-7.35,7.74s-88.65,0-88.65,0c0,0-5.23,1.11-7.69,4.31s-32.87,49.26-100.8,50.61c0,0-54.19,7.26-102.67-50.81,0,0-2.61-3.63-7.55-4.5l-88.84-.15s-8.42-4.5-7.84-6.53.53-127.72.53-127.72Z"
            />

            {/* Status Text */}
            <text
                x="50%"
                y="70%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="90"
                fontWeight="bold"
                fill={isOpen ? "#4CAF50" : "#F44336"}
            >
                {isOpen ? "Open" : "Close"}
            </text>

            {/* Pipes */}
            <path
                fill="url(#linear-gradient1)"
                stroke="#000"
                strokeMiterlimit="10"
                d="M442.44,176.2v187.55s2.75,10.74,16.47,10.6c0,0,14.3.07,15.97-10.6l-.19-188.15s-2.61-9.44-16.11-9.29c0,0-15.38,1.45-16.13,9.9Z"
            />
            <path
                fill="url(#linear-gradient2)"
                stroke="#000"
                strokeMiterlimit="10"
                d="M1,176.67v187.55s2.75,10.74,16.47,10.6c0,0,14.3.07,17.97-10.6l-.19-188.15s-4.61-9.44-18.11-9.29c0,0-15.38,1.45-16.13,9.9Z"
            />
            <path
                fill="url(#linear-gradient3)"
                stroke="#000"
                strokeMiterlimit="10"
                d="M158.36,103.26h157.94s9.58,3.77,9.29,16.16c0,0,1.16,13.74-9.1,15.87l-158.13.68s-7.84-3.1-8.32-15.87c0,0-1.26-11.61,8.32-16.84Z"
            />
            <rect
                fill="url(#linear-gradient4)"
                stroke="#000"
                strokeMiterlimit="10"
                x="197.94"
                y="64.65"
                width="79.69"
                height="38.47"
            />
            <path
                fill="url(#linear-gradient5)"
                stroke="#231f20"
                strokeMiterlimit="10"
                d="M119.65,64.65h234.58s9.68-1.98,10.45-10.11V16.4s-1.55-10.89-13.55-14.76H124.69s-13.16,5.81-14.32,17.03v35.61s2.32,7.55,9.29,10.35Z"
            />
        </svg>
    );
};

export default Valve;
