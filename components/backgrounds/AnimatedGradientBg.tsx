"use client";

export function AnimatedGradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden ">
      {/* Main gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 58.77034358047016% 29.546139927623642%, #0439CC 0px, transparent 50%), radial-gradient(at 23.508137432188065% 57.290410132689985%, #050547 0px, transparent 50%), radial-gradient(at 97.92043399638337% 100%, #D77AFF 0px, transparent 50%), radial-gradient(at 70.97649186256781% 90.10102533172497%, #050547 0px, transparent 50%), radial-gradient(at 2.5316455696202533% 84.31091676718938%, #2459ED 0px, transparent 50%), radial-gradient(at 87.25135623869801% 19.051568154402894%, #050547 0px, transparent 50%) #050548
          `,
          mixBlendMode: "normal",
        }}
      />

      {/* Removed frosted backdrop to eliminate white bleeding */}
    </div>
  );
}
