import Link from 'next/link'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { use, useState } from 'react'
import styles from "./info.module.css"
import { Button, Checkbox, Form, Input, Select} from 'antd';
import { parseStyle } from '@ant-design/cssinjs/lib/hooks/useStyleRegister';
import Router  from 'next/router';
import firebaseConfig from '../firebase';




export default function Info(){
  
    const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  
    
    let auth = getAuth(app)
    const[cname,setCName] = useState("")
    const[ename,setEName] = useState("")

    const [industry,setIndustry] = useState("")
    const [company,setCompany] = useState("")
    const [jobtitle, setJobtitle] = useState("")
    const [area, setArea] = useState("")
    const [agree, setAgree] = useState(true)
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    
    
    


    let submit = (e)=>{
      e.preventDefault()
      // if(!cname|| !ename||!industry||!company||!jobtitle||!area||!agree||!email||!password){}
        console.log(industry,password,cname);
        createUserWithEmailAndPassword(auth,email,password).then
          (async (userCredential)=>{
            const idtoken = await auth.currentUser.getIdToken(true);
            const uid = auth.currentUser.uid
            console.log("aha")
            await fetch(`http://localhost:4000/user/verify/${uid}/${idtoken}`,{
              method:'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({cname:cname,ename:ename, industry:industry, id:uid})

            })
          }
        ).catch((error)=>{
          console.log(error.code)
        })
        Router.push('/')
      
    }
  
    const comfirmpw = ()=>{
      if(password != password_two){
        console.log("您两次输入的密码不一致")
      }
    }
    const onFinish = ()=>{
        console.log('Success')
    };
    const onFinishFailed = ()=>{
        console.log('Failed')
    }
    return (
    <div className={styles.body}>
      <h1 className={styles.alumregister}>校友注册</h1>
      <div >
        <Form className = {styles.form} name="basic" labelCol={{
            span: 8,
          }}
          layout = {{}}
          wrapperCol={{
            span: 40,
          }}
          initialValues={{
            remember: true,
          }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        //   autoComplete="off"
        >
          <Form.Item label='中文姓名(如有)' name='cname'>
            <Input onChange={(e)=>setCName(e.target.value)}></Input>
          </Form.Item>

          <Form.Item label='英文姓名(如有)' name='ename'>
            <Input onChange={(e)=>setEName(e.target.value)}></Input>
          </Form.Item>

          <Form.Item label='邮箱: ' name = 'email' 
            rules={[
              {
                required: true,
                message: '请输入您的邮箱！',
              },
            ]}>
            <Input type='email' onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Item >
          <Form.Item label = '设置密码: ' name='password' rules={[
              {
                required: true,
              },
            ]}>
          <Input type='password' onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Item>
          <Form.Item label = '确认密码: ' name='password_two' rules={[
              {
                required: true,
                message: '请输入您的密码',
              },
            ]}>
          <Input type='password'/>
          </Form.Item>
          <Form.Item label = '您所在的领域是：'  
            name = 'industry'
            rules={[
              {
                required: true,
                message: '请输入您的职称！',
              },
            ]}>
            <Select>
              <Select.Option value ="tech" onChange = {(e)=>setIndustry(e.target.value)}>科技/互联网</Select.Option>  
              <Select.Option value ="hardware" onChange = {(e)=>setIndustry(e.target.value)}>通信/硬件</Select.Option> 
              <Select.Option value ="media" onChange = {(e)=>setIndustry(e.target.value)}>新媒体/设计</Select.Option> 
              <Select.Option value ="humanresources" onChange = {(e)=>setIndustry(e.target.value)}>人事/行政/财务</Select.Option> 
              <Select.Option value ="finance" onChange = {(e)=>setIndustry(e.target.value)}>金融/投资</Select.Option> 
              <Select.Option value ="consulting" onChange = {(e)=>setIndustry(e.target.value)}>咨询</Select.Option> 
              <Select.Option value ="production" onChange = {(e)=>setIndustry(e.target.value)}>制造业</Select.Option>
              <Select.Option value ="education" onChange = {(e)=>setIndustry(e.target.value)}>教育</Select.Option> 
              <Select.Option value ="biomedical" onChange = {(e)=>setIndustry(e.target.value)}>生物医疗</Select.Option> 

            </Select>
          </Form.Item>
          <Form.Item label="您工作的公司是： " name = 'company name' rules={[{required: false}]}>
            <Input onChange = {(e)=>setCompany(e.target.value)}></Input>
          </Form.Item>
          <Form.Item
            label="职务："
            name="jotitle"
            rules={[
              {
                required: true,
                message: '请输入您的职务(job title)',
              },
            ]}
          >
            <Input onChange={(e)=>setJobtitle(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="您是否同意校友通过邮件联系您?"
            name = 'agreement'
            valuePropName="checked"
            // wrapperCol={{
            //   offset: 2,
            //   span: 16,
            // }} 
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          >
            <Checkbox onChange={(e)=>setAgree(e.target.checked)}>Yes</Checkbox>
            {/* <Checkbox>No</Checkbox> */}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={submit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    )
}


