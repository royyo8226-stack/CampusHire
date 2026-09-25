// src/components/Avatar.jsx
// Simple initials-based avatar with a colored background (no image assets).
import { getInitials, colorFromString } from '../utils/helpers';

export default function Avatar({ name = '', color, size = 44, square = false }) {
  const bg = color || colorFromString(name);
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.4,
        borderRadius: square ? '12px' : '50%',
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
