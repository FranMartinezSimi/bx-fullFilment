function RadioIcon({ isActive, size, color, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={color || '#FF7A00'}
        strokeWidth="0.6"
        d="M12 22.7C6.09 22.7 1.3 17.91 1.3 12 1.3 6.09 6.09 1.3 12 1.3c5.91 0 10.7 4.79 10.7 10.7 0 5.91-4.79 10.7-10.7 10.7z"
      />
      {isActive && (
        <path
          fill={color || '#FF7A00'}
          d="M19 12a7 7 0 00-14 0 7 7 0 1014 0z"
        />
      )}
    </svg>
  );
}

export default RadioIcon;
