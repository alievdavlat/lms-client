import React from "react"

export const useInputValues = (sxema:object) => {
  const [ values , setValues ] = React.useState(sxema)


  return { 
    values, 
    change: (e:any) => setValues({...values, [e.target.name]: e.target.value}),
  }
}