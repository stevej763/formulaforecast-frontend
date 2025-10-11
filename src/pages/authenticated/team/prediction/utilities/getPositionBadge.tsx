export const getPositionBadge = (position: number) => {
  const labels = ['1st', '2nd', '3rd'];
  const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-700'];
  return (
    <div className={`${colors[position]} text-white text-xs font-bold px-2 py-1 rounded`}>
      {labels[position]}
    </div>
  );
};
