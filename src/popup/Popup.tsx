import React from 'react';

interface Props {
  openPopUp: boolean;
  closePopUp: () => void;
}

const PopUp: React.FC<Props> = ({ openPopUp, closePopUp }) => {
  const handlelosePopUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target && (e.target as HTMLElement).id === 'ModelContainer') {
      closePopUp();
    }
  };

  if (!openPopUp) return null;

  return (
    <div
      id='ModelContainer'
      onClick={handlelosePopUp}
      className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'
    >
      <div className='p-2 bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5'>
        <div className='w-full p-3 justify-center items-center'>
          <h2 className='font-semibold py-3 text-center text-xl'>My PopUP</h2>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
