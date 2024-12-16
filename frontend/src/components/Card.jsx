import React from "react";

const Card = (props) => {
  const { image, title, description, authorName, authorDetails } = props;
  return (
    <div className="bg-white flex gap-5 mt-8 w-[55rem] shadow-lg">
      <img src={`/${image}`} alt="" />
      <div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-400">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-5 pr-8">
          <div className="flex flex-col">
            <h2 className="text-md">{authorName}</h2>
            <p className="text-gray-400">{authorDetails}</p>
          </div>
          <button className="py-2 px-5 rounded-md bg-gradient-to-br from-[#f49a20] to-[#feca62] text-white">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
