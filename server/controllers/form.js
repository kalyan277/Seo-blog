const nodemailer = require('nodemailer'); 

const mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    } 
}); 


exports.contactForm =(req,res)=>{
const {email,name,message} =req.body    
let mailDetails = { 
    from: email, 
    to: process.env.EMAIL_TO, 
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
  try {
    mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
    console.log('Email sent successfully'); 
    return res.json({
    success:true
   })
    } 
  });
  } catch (error) {
   console.error(error) 
  }
 
}


exports.contactBlogAuthorForm =(req,res)=>{
const {authorEmail,email,name,message} =req.body;
let mailDetails = { 
    from:email , 
    to: authorEmail, 
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
  try {
    mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
    console.log('Email sent successfully'); 
    return res.json({
    success:true
   })
    } 
  });
  } catch (error) {
   console.error(error) 
  }
}
