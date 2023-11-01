import React from "react";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import ReviewCard from '../ui/ReviewCard'

type Props = {};

const reviews = [
  {
    name: "Patrick Bateman",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    proffession: "Serios Killer",
    comment:
      "Lorem ipsum dolor sit  amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque!  amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque!, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis  amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:4,
  },
  {
    name: "Alicia",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    proffession: "princces of glass city",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:5,
  },
  {
    name: "clark kent",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    proffession: "superman",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque!  amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:2,
  },
  {
    name: "diana",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    proffession: "amazonka",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:3,
  },
  {
    name: "andrew gharfield",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    proffession: "Spiderman",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:5,
  },
  {
    name: "Tom hollond",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    proffession: "Spiderman",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:3,
  },
  {
    name: "Thomas Shelby",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    proffession: "buissnesman",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:5,
  },
  {
    name: "Jason statham",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    proffession: "killer",
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, quaerat illum ad perferendis quidem odio eveniet ipsam ex quibusdam neque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, tenetur?",
      rating:5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[98%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center justify-center">
        
        <div className="800px:w-[70%] w-full mb-[40px]">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
          Lets see our students  <span className="text-gradient">Reaction</span>{" "}
          </h3>
          <br />
          <p className={`${styles.label} text-center`}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, vel
            illo architecto ipsum inventore saepe minima, laboriosam deleniti
            dignissimos, officia suscipit. Sapiente excepturi harum rerum, illo
            error officiis quidem porro.
          </p>
        </div>
        <br /><br />
          
      </div>

      <div className="grid gird-cols-1 800px:px-0 px-4 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg-gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 ">
              {
                reviews && 
                  reviews?.map((i, index) => <ReviewCard item={i} key={index}/>)
              }
          </div>
    </div>
  );
};

export default Reviews;
