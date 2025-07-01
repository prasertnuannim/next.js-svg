import Fan from "@/components/svg/Fan";
import Valve from "@/components/svg/Valve";
import WaterTank from "@/components/svg/WaterTank";
import React from "react";

export default function page() {
    return (
       <main className="flex justify-center items-center min-h-screen bg-white gap-7">
            <Fan />;
            <WaterTank level={2} />
          <Valve width={300} /> 
        </main>
    );
}
