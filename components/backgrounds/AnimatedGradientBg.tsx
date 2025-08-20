"use client";

export function AnimatedGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden ">
      {/* Main gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 80.1989150090416% 0.7162243667068757%, #0439CC 0px, transparent 50%), radial-gradient(at 92.58589511754069% 60.06483715319663%, #050547 0px, transparent 50%), radial-gradient(at 13.924050632911392% 39.075693606755124%, #050547 0px, transparent 50%), radial-gradient(at 3.52622061482821% 92.8754523522316%, #2459ED 0px, transparent 50%), radial-gradient(at 72.69439421338156% 26.047949336550058%, #050547 0px, transparent 50%), radial-gradient(at 88.42676311030742% 88.05036188178529%, #D77AFF 0px, transparent 50%) #050548
          `,
          mixBlendMode: "normal",
        }}
      />

      {/* Removed frosted backdrop to eliminate white bleeding */}
    </div>
  );
}
