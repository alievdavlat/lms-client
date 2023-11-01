import React, {FC} from 'react'

interface HeadProps {
  title: string;
  desciption: string;
  keywords: string;
}


const Heading:FC<HeadProps> = ({title, desciption, keywords}) => {

  return (
    <>
      <title>{title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name='description' content={desciption} />
      <meta name='keywords' content={keywords} />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

    </>

    
  )
}

export default Heading