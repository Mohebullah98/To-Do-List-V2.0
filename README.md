# To-Do-List-V2.0
To Do List Version 2.0 supports Database storage and management with mongo DB and custom lists.

Basic To do list for daily life and work. Built using node and Express JS with EJS. Database support with mongoDB and mongoose.

mongoDB

I used mongoDB with mongoose in order to support data storage and deletion. So you can now add and remove list items. Custom lists are now supported as well.
Using express routing parameters, you cantype any list you want to make from the home URL and the custom list will be created and loaded on a dynamic web page.
ex: "/School" will create a new school list with the default items.

EJS

I used Embedded Javascript templating to print out the current date on the to do list. I also used EJS to help add new items to the lists. EJS also provided for easy layouts. I was able to just put my header and footer code into 2 seperate ejs files and include them in all my other files using the <%- include("header"); -%> command.

Express

I used Express to render the web pages on the server side and to perform the appropriate get and post requests for the forms and pages. Date calculation was also done on the server side.

How to run

1.Clone the project onto your local machine.

2.Enter the project's directory in your CLI.

3.)Run with Node using 'node app.js' command.

4.) Type http://localhost:3000/ into your browser.

or access it online:  https://radiant-fortress-95954.herokuapp.com/
