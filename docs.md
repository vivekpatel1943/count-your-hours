the intention is to create a journal app;

=> i think that the app should be much simpler, the app should simply track how many hours the user is spending on doing the task that he had scheduled to do , then simply add up how many hours he had done it this week , this month so a monthly a yearly graph , just keep adding up the hours,

=> when the task saved is equal to any other task already saved then the number of hours simply get added to the previous task,

=> the next challenge will be to create graphs dynamically with the available data, 


28th march 2025

i want the edit-modal to open when we click the graph lines or even the bar graph , that isn't happening,


users 
1. {username:doraemon,email:doraemon@gmail.com,password:"doraemonisanidiot"}
2. {username:chhota-bheem,email:chhota-bheem@gmail.com,password:chhota-bheem-from-dholakpur}
3. {username:"r",email:"r@gmail.com",password:"r-password"}


=> sign-up page will be our first page,
=> then the login page,
=> if they are signed up for them only the login page will appear (i don't how i will achieve that),
=> once they are logged in everything else will be same, they can get task/tasks,create task , update task, delete task, 

=> let's start by creating the sign-up and login page,

1st of april, 2025
=> at this point of time , i am simply trying to access the username and email-id of the person who is logged-in  


=> useEffect is used to deal with the systems which are not part of the react ecosystem,

2nd of april, 2025
=> once the whole app is working we will try to make it work with cookies
=> till then we will be using localStorage to store our tokens
=> you really have to make sense of why and how Root.jsx sort of works,
=> plan is to write here everything that is happening in Root.jsx
=> let's get started

3rd of april, 2025
=> the signup,login route works , the profile route doesn't work, 
=> the best thing i can do is try to understand what is going on in my root.jsx, then only i will be able to fix the problems , and complete the Sign-up.jsx and Log-in.jsx,   

6th of april,2025 , sunday
previous data is not being shown in the weekly data, the data from the previous day => it was because in dayjs a week means sunday to saturday with sunday being the first day and today is sunday so the data which has been entered yesterday(saturday) shall not be shown as this week's data,


6th of april, 2025
=> you should have added a logout route, tomorrow add a logout route, 
=> when the user is logged in redirect them directly to profile page, if they try to access the login page,

7th of april , 2025
=> the route for logout will also be written in the authRoutes folder as the logout will obviously require authentication, not it will not as once you are logged-in anybody who has your device can log you out,

=> i just realised that login and signup buttons should be on the website's landing page and not on the page which is showing the graph of the user,on that page we can show the logout button 

=> our default page should be our landing page, with the endpoint '/', and the endpoint for our first page should be '/home', when the user is logged-in the website should start at '/home' else it should start at '/', 

=> every new user will land at the endpoint '/' whereas every logged in user will land at the endpoint '/home' when he starts the app,

=> in our signup and login page, instead of using the home button we can simply use a backward arrow, this will redirect to the landing-page,

=> in our profile page we can redirect it to the home page, using the arrow button

pending-task => 
=>tomorrrow on 8th of april, i need to make sure that the user's profile automatically loads up after the app has been routed to the endpoint '/profile'; 