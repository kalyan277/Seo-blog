const sgMail =require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



exports.contactForm =(req,res)=>{
 //   console.log(process.env.SENDGRID_API_KEY);
const {email,name,message} =req.body
const emailData ={
    to:process.env.EMAIL_TO,
    from:email,
    subject:`Contact form-${process.env.APP_NAME}`,
    text:`Email Received From Contact From \n Sender Name :${name} \n Sender email :${email} \n Sender Message :${message}`,
    html:`
    <h4>Email Recieved From Contact Form: </h4>
    <p>Sender Name :${name}</p>
    <p> Sender email :${email}</p>
    <p>Sender Message :${message}</p>
    <hr/>
    <p>This Email May Contain Sensetive Information</p>
    <p>https://SeoBlog.com</p>`
};
  sgMail
  .send(emailData)
  .then(() => {
   return res.json({
    success:true
   })
  })
  .catch((error) => {
    console.error(error)
  })
}


exports.contactBlogAuthorForm =(req,res)=>{
 //   console.log(process.env.SENDGRID_API_KEY);
const {authorEmail,email,name,message} =req.body
const emailData ={
    to:authorEmail,
    from:email,
    subject:`Someone message You From-${process.env.APP_NAME}`,
    text:`Email Received From Contact From \n Sender Name :${name} \n Sender email :${email} \n Sender Message :${message}`,
    html:`
    <h4>Message Recieved From: </h4>
    <p>Name :${name}</p>
    <p>email :${email}</p>
    <p>Message :${message}</p>
    <hr/>
    <p>This Email May Contain Sensetive Information</p>
    <p>https://SeoBlog.com</p>`
};
  sgMail
  .send(emailData)
  .then(() => {
     return res.json({
    success:true
   })
  })
  .catch((error) => {
    console.error(error)
  })
}





