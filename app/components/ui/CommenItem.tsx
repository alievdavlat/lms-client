import Image from "next/image";
import React from "react";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {
  data: any;
  activeVideo: number;
  item: any;
  index: number;
  answer: any;
  setAnswer: (answer: any) => void;
  handleAnswerSubmit: any;
  setQuestionId: any;
  answerLoading: any;
  questionId:string
};

const CommenItem: React.FC<Props> = ({
  activeVideo,
  answer,
  data,
  handleAnswerSubmit,
  index,
  item,
  setAnswer,
  setQuestionId,
  answerLoading,
  questionId
}) => {
  const [replyActive, setReplyActive] = React.useState(false);

  return (
    <>
      <div className="my-6">
        <div className="flex mb-2">
          <div className="w-[50px] h-[50px">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <h1 className="uppercase text-[18px]">
                {item?.user?.avatar ? (
                  <img
                    src={item?.user?.avatar?.url}
                    alt="user"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span>{item.user && item.user.name.slice(0, 2)}</span>
                )}
              </h1>
            </div>
          </div>
          <div className="pl-2">
            <div className="flex items-center">
            <h5 className="text-[20px] text-[#000000b8] dark:text-white">
              {item?.user && item?.user?.name} 
            </h5>
            {item.user.role == 'admin'  && <VscVerifiedFilled className="text-blue-500 ml-2 text-[20px]"/>}
            </div>
            <p className="text-[#000000b8] dark:text-white">
              {item?.question && item?.question}
            </p>
            <small className="dark:text-[#ffffff83]  text-[rgba(0,0,0,0.72)]">
              {item?.createdAt && format(item?.createdAt)} ●{" "}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-3"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}>
            {!replyActive
              ? item?.questionReplies?.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>

          <BiMessage
            size={20}
            className="cursor-pointer text-[#000000b8] dark:text-[#ffffff83]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item?.questionReplies?.length}
          </span>
        </div>

        {replyActive && questionId === item?._id && (
          <>
            {item?.questionReplies?.map((q: any, qIndex:number) => (
              <div key={qIndex} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div>
                  <Image
                    src={
                      q?.user?.avatar
                        ? q?.user?.avatar.url
                        : require("../../../public/assets/avatar.png")
                    }
                    width={50}
                    height={50}
                    alt="avatar"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                  <h5 className="text-[20px] text-[#000000b8] dark:text-white">
                    {q?.user && q?.user?.name} 
                  </h5>
                  {q.user.role == 'admin'  && <VscVerifiedFilled className="text-blue-500 ml-2 text-[20px]"/>}
                  </div>
                  <p className="text-[#000000b8] dark:text-white">
                    {q?.answer && q?.answer}
                  </p>
                  <small className="dark:text-[#ffffff83]  text-[rgba(0,0,0,0.72)]">
                    {q?.createdAt && format(q?.createdAt)} ●{" "}
                  </small>
                </div>
              </div>
            ))}

            <>
              <div className="w-full flex relative mt-5">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 outline-none bg-transparent border-b border-[#376DD4] dark:border-[#fff] p-[5px] dark:text-white text-black w-[100%] ${
                    answer === ""
                      ? "cursor-not-allowed"
                      : "" || answerLoading
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 dark:text-white text-black"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerLoading}>
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CommenItem;
