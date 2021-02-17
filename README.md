INTRODUCTION
------------
Seo Blog is a Monolithic Functional Based Application,build with the help of Next js(mongoDb,express and react js).

It Comprises of A Multiuser Login System ,where a user can get register and update basic information(profile).They can post view update and delete their blog.They can also comment and view others blog.

Admin has the responsibility to add new Tags and Categories and Deleted user from the system.Basically manage the application.  

Bootstrap and AntDesign is used for styling.

For FrontEnd It's React With Redux. 

For Backend It's Express.

Database That i used is Mongodb Atlas


The Thing To Look For
------------
Email Is Send With The Help Of Node Mailer.I Have Used oauth 2.0 for authentication.it is achieve with the help of oauthplayground.Once The Authentication is done,A token is generated it is used with googleapis for futher validation.After all steps A mail is Sent to the recipient.

Disqus Commenting System is to keep track of the comments.It is really interactive and has a pretty good interface for commenting.

Redux Form Validation is used for client side validation.One Of the Example is in Signin Page.

Tried To Used The Redux Hook In Most Efficient Fashion.

Formidable package is used for Capturing the Complex form data in the backend,submitted from frontend.

Axios package is used for Making Network Calls (Client Side).

Googleapis package is used for Generating the token for outh validation.
  
Jsonwebtoken package is used for Generating validation token from server side so that it could be used in client side for user authentication.

Moment package is used for changing the time format.

Nprogress package is used for show a loding effect switching from one page to another.
  
React-quill package is used for creating blog in client side.It Is Very Efficient.
 
Deal With The Functional Components.

Tried To Keep The UI As Simple As Possible.

Gave Stress In Code Reusability and redability.


DEPLOYED LINK
------------
https://seo-blog-kalyan.herokuapp.com/

REQUIREMENTS
------------
Node js is to be installed in the system.

INSTALLATION
------------
Download this Project.

Some of the require variable are expected to be passed as environmental variable.

=>Run npm install

=>Run npm start



