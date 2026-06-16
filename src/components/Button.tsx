import type { ReactNode } from "react"

const Button = ({onClick,children}:{onClick: ()=>void,children:ReactNode}) => {
  return (
    <button style={{backgroundColor:"black",color:'white'}} onClick={()=> onClick()}>
        {children}
    </button>
  )
}

export default Button