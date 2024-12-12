import React from 'react';

const MessageCloud = ({ message, sender, imageUrl, imageTitle }) => {
  const messageStyles = sender === 'user' ? 'w-full flex justify-end m-1' : 'w-full flex justify-start m-1';
  return (
    <div className={`${messageStyles}`}>
      <div className='h-10 w-10 bg-black p-2 text-center rounded-full font-bold text-white mx-1'>
        {sender === 'system' || sender === 'bot' ? (
          <span>AI</span>
        ) : (
          <span>S</span>
        )}
      </div>
      <div className='bg-[#CE4760] p-1 px-2 rounded-md'>
        {message}
        {imageUrl && (
          <div className="mt-2">
            <div className="font-bold">{imageTitle}</div>
            <img src={imageUrl} alt="Illustration" className="w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCloud;