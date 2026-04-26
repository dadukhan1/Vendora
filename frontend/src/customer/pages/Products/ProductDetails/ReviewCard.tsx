/** @format */

import { Avatar, Rating } from "@mui/material";

const ReviewCard = ({ review }: any) => {
  return (
    <div className='py-6 border-b border-gray-100 last:border-0'>
      <div className='flex justify-between items-start mb-3'>
        <div className='flex items-center gap-3'>
          <Avatar 
            src={review.user?.profilePicture} 
            sx={{ width: 44, height: 44, bgcolor: '#0F52FF' }}
          >
            {review.user?.fullName?.[0]}
          </Avatar>
          <div>
            <h4 className='font-bold text-[#1E293B] text-[0.95rem]'>
              {review.user?.fullName}
            </h4>
            <div className='flex items-center gap-2'>
               <Rating value={review.rating} readOnly size='small' />
               <span className='text-[0.75rem] text-[#94A3B8] font-medium'>
                  {new Date(review.createdAt).toLocaleDateString()}
               </span>
            </div>
          </div>
        </div>
      </div>
      
      <p className='text-[#475569] leading-relaxed text-[0.9rem] whitespace-pre-line'>
        {review.reviewText}
      </p>

      {review.images?.length > 0 && (
        <div className='flex gap-2 mt-4 overflow-x-auto pb-2'>
          {review.images.map((img: string, i: number) => (
            <img 
              key={i} 
              src={img} 
              alt='review' 
              className='w-20 h-20 object-cover rounded-lg border border-gray-100 shadow-sm'
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
