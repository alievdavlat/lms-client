import React from 'react'
import CommenItem from './CommenItem'

type Props = {
  data:any;
  activeVideo:number;
  answer:string;
  setAnswer: (answer:string) => void;
  handleAnswerSubmit:any;
  user:any;
  setQuestionId:(answerId:string) => void;
  answerLoading:any
  questionId:string;
}

const CommentReply:React.FC<Props> = ({activeVideo,questionId, answer, data, handleAnswerSubmit, setAnswer, setQuestionId, user, answerLoading}) => {
  return (
    <>
      <div className='w-full my-3'>
          {
            data[activeVideo] && data[activeVideo]?.questions?.map((item:any, index:number) => (
              <CommenItem
                key={index}
                data={data}
                activeVideo={activeVideo}
                item={item}
                index={index}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                setQuestionId={setQuestionId}
                answerLoading={answerLoading}
                questionId={questionId}
              />
            ))
          }
      </div>
    </>
  )
}

export default CommentReply