import React from 'react';

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white bg-[#519444] px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Stay Ahead in Tech, QA & Business Operations
          </h1>
          <p>
            Subscribe to our newsletter for insights on digital transformation, emerging tools, and smarter outsourcing strategies.
          </p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black bg-white'
              type='email'
              placeholder='Enter your email'
            />
            <button className='bg-white text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3 hover:bg-black hover:text-white transition duration-300 ease-in-out'>
              Subscribe
            </button>
          </div>
          <p className='text-sm'>
            We respect your privacy. Read our{' '}
            <span className='text-black underline cursor-pointer'>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
