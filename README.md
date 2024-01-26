Sachin Kumar Gurjar
Run: 
    1-> npm install || npm install --force (if you get some error on npm or other,dependency compatibility)
    2-> npm start
    
How would your tables and apis change for the following scenarios. What tables and api endpoints would you add? Which tables and api endpoints would need to be updated?

1. If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed
Ans. We can create a schema for stages and have the functionality to add stages with different names/titles.
The NoSQL database schema would look something like this:
Stages: {
  title: {
      type: String
  },
  tasks: {
     [ {
       type: ObjectId,
        Ref: 'Tasks',
        }
     ]
  },
noOfTasks: {
      type: Number
  }
}

As for api calls we can have post and patch calls to update this table in the database.

2. If users can comment on tasks
Ans. We have to create a table for tasks and each task entry should have a list of comments associated with them. To store the text of each comment we can have a seperate table for comments.
As for API calls we will require a post call to create the comments and a get call to fetch the comments for each task. We can have a tertiary table containing the task Id , userId and commentId to fetch the comments for each user with lower time complexity.

3. How will you do error handling?
Error handling can be done at multiple stages of the work flow. Initial data handling needs to be done at user verfication to create users for the application.
Next step has to be handling server errors for different api calls and also looking for other bad request errors by keeping the code in a try catch block.
Checks for base url encoding of the images also need to be taken care of, if it exceeds the limits of database.
All api calls must be tested using Jest before deploying the application to production.



The link to the deployed app:
https://taskmanagersachinassignment.netlify.app/
