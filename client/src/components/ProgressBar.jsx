import React from 'react';

const ProgressBar = ({ progress }) => {
  const colors = [
    'rgb(255,214,161)',
    'rgb(255,175,163)',
    'rgb(108,115,148)',
    'rgb(141,181,145)',
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className='flex justify-between items-center'><div className='w-[15rem] h-[0.88rem] bg-zinc-200 rounded-[0.4rem] overflow-hidden'>
      <div
        className={`h-[0.88rem] ${color} w-${progress}%`}
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
      
    </div>
    <p className='pl-5'>{progress}% complete</p></div>
    
  );
};

export default ProgressBar;
