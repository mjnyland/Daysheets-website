"use client";

export function AnimatedGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden ">
      {/* Main gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 63.29113924050633% 14.588359469240048%, #176ED1 0px, transparent 50%), 
            radial-gradient(at 73.77938517179024% 54.154101326899884%, #050547 0px, transparent 50%), 
            radial-gradient(at 90.32549728752261% 81.77774427020506%, #D77AFF 0px, transparent 50%), 
            radial-gradient(at 33.815551537070526% 37.1456574185766%, #050547 0px, transparent 50%), 
            radial-gradient(at 17% 70%, #176ED1 0px, transparent 50%), 
            radial-gradient(at 68.80650994575045% 76.59077201447528%, #050547 0px, transparent 50%),
            #050548
          `,
          mixBlendMode: "normal",
        }}
      />

      {/* Removed frosted backdrop to eliminate white bleeding */}
    </div>
  );
}
