import React from 'react'
import login from '@public/assets/images/login-screen.png';
import Image, { StaticImageData } from 'next/image';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomInputField } from '@/components/common/input-field';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';

const Login = () => {
  return (
    <div style={{display:"flex",flexDirection:"row"}}>
        <div>
        <Image
                src= {login}
                alt={"login"}
                style={{width:"60vw",height:"100vh"}}
                
              />
           
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:'center',width:"40vw",backgroundColor:'black',flexDirection:"column"}}>
          <CustomInputlabel htmlfor={''} label={'Login'}/>
          <CustomInputField type={'email'} name={'email'}   placeholder='Email'/>
          <CustomInputField type={'password'} name={'password'} placeholder='Password'/>
          <CustomDisplayButton displayButtonLabel={'Login'}/>

        </div>
    </div>
  )
}
export default Login