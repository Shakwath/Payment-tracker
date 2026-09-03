/**
 * @typedef {Object} GradientTransitionProps
 * @property {string|number} [height="420px"] - Height of the gradient section
 * @property {string} [className=""] - Additional CSS/Tailwind classes
 */

/**
 * GradientTransition Component
 * A full-color deep purple → dark navy section divider gradient,
 * styled after modern SaaS landing pages (e.g., Cue, Linear).
 * Top edge fades in from white/transparent; bottom stays rich dark navy.
 *
 * @param {GradientTransitionProps} props
 */
const GradientTransition = ({
  height = "420px",
  className = "",
}) => {
  const formattedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: formattedHeight }}
      aria-hidden="true"
    >
      {/* ── Base: full deep purple → dark navy gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(120, 5, 245, 0.55) 18%,
            rgba(100, 0, 220, 0.85) 38%,
            rgba(68, 0, 180, 0.95) 58%,
            rgba(38, 0, 120, 1) 78%,
            rgba(18, 0, 80, 1) 100%
          )`,
        }}
      />

      {/* ── Radial center bloom for depth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 80% 60% at 50% 60%,
            rgba(150, 3, 248, 0.35) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* ── Left ambient warm scatter ── */}
      <div
        className="absolute bottom-0 left-0 w-[55%] h-[65%]"
        style={{
          background: `radial-gradient(
            ellipse at bottom left,
            rgba(120, 80, 255, 0.18) 0%,
            transparent 65%
          )`,
        }}
      />

      {/* ── Right ambient cool scatter ── */}
      <div
        className="absolute bottom-0 right-0 w-[55%] h-[65%]"
        style={{
          background: `radial-gradient(
            ellipse at bottom right,
            rgba(80, 20, 220, 0.18) 0%,
            transparent 65%
          )`,
        }}
      />

      {/* ── Top feather: blend seamlessly from white page background ── */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, var(--color-base-100, #ffffff) 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};

export default GradientTransition;
