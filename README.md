# consumeapidemo
This tutorial will demonstrates both the API provider and API consumer journey using IBM API Connect as an API hub. We cover basic concepts and show API providers
how to use Node.js for internal service and how to use Node.js in an application for the API consumer to call the API.

To complete the steps in this tutorial, you need:

Node.js installed locally
A service of API Connect SaaS on IBM Cloud.
A Developer Portal setup
A user with permissions to draft and publish APIs in API Manager

What is API Connect?
IBM API Connect is a platform to create, manage, and securely socialize information via APIs. APIs are published in API Manager to the Developer 
Portal where API consumers register, create applications, and subscribe to APIs that are available to them.

Becoming an API provider
The API provider is the group that exposes backend services through an API. Follow the steps in this section to complete these tasks:

1. Create a backend service using Node.js to make a ‘call’ to a system of record.
2. Create An API using the API Connect WebGUI to call the backend service.
3. The API is exposed to the Developer Portal to be discovered by consumers.

Create a simple backend service

This backend service holds a JSON file to denote a System of Record with some mock customer data included. The microservice then awaits requests to the URL 
path /record before returning the named persons record details.

The backend-service folder contains a mock system of record called "customer.json" with some test data. This data is called by the microservice to provide the API 
with a single customer’s data as a response. It also contains the "index.js" file that creates a server and calls the customer.json file. Further explanations of 
what the code does can be found on https://developer.ibm.com/devpractices/api/tutorials/consume-provide-api-with-api-connect-node/

You can now deploy the microservice with the command: node index.js. Type the following URLs into the browser to test 
- localhost:6661/hello                                    //Redirects to the url help
-localhost:6661/customer?fname=sid&lname=james            //no customer data for: sid james
-localhost:6661/customer?fname=Elaine&lname=Rushmore      //{"name":"Elaine Rushmore","country":"United   Kingdom","occupation":"blacksmith"}

Because we will use a cloud version of API Connect software we need to deploy our backend on Cloud to reach it from the API. Alternatives can be the Kubernetes 
Cluster Service available on IBM Cloud as a trial free version. Dockerfile is already created and provided in the backend folder so you can create the image. 
At the end you will need to obtain an IP adress to reach the backend from the API in the next part of the tutorial.

Another way to do this is without having to deploy it directly on the Internet is to use localtunnel.me This is the easiest service you can use to expose your 
local app to the world.

Create an API

For this step we are going to use a Software as a Service version of API Connect on IBM Cloud Platform.

1. Go to cloud.ibm.com create an account if you have not created one yet.
2. Search for API Connect on the search button at the top of the screen.
3. Create the service and wait until it is provisioned. 
4. In the dashboard navigate to the Menu > Drafts > APIs > New API
5. Give the API the following settings 'name': provider-api 'title': provider-api 'base path': /provider-api and click create.
6. In the Paths tab, add a new Path by selecting the + button 'Path': /customer 'Operation': GET /customer
7. Expand the GET /customer path and select the Add parameter button and Add new parameter option
8. Create a parameter for first name input 'name': fname 'located in': Query 'required': yes 'type': string then create a second parameter for last name 
input 'name': lname 'located in': Query 'required': yes 'type': string
9. Navigate to the Assemble tab and select the Invoke policy
10 Replace the URL on the right pop-up screen with the URL of your backend (your kubernetes service or the one given by localtunnel.me) then save it

The file provider-api_1.0.0.yaml can be also used to avoid some steps you will just import it from the Menu > Drafts > APIs > Import from file. Be careful as you
will need to change the URL of the backend service anyway.

If you are OK, test your API by running the test procedure in API Manager’s Assemble tab with a random first name and last name, followed by “Elaine” and “Rushmore” 
for first and last name respectively to show a fail and pass scenario.

Expose the API

1. Navigate to the Menu -> Drafts -> Products -> Create New Product.
2. Give the Product a unique name: provider-product.
3. In the API section select the + button and add the provider-api to the product and then save it.
4. Select the Stage icon and select your catalog which normally is the only one you have because you are using the free instance of the service.
5. The provider-product shows as ‘Staged’. Select the Options icon next to the status and select Publish.

Now that you followed the three steps to become an API Provider, there is now a running backend service listening on port 6661 or your Kubernetes service or whatever
way of deployment you have used and an API that was deployed onto API Manager and exposed onto the portal ready for consumption.

API consumer

The API consumers wish to get the provided information from the provider that is using the API. They use client credentials to make calls to the API Gateway 
through applications.

In this section, you will complete the following tasks:

A consumer developer registers to join the Developer Portal.
The consumer organization creates an application in the Developer Portal and subscribes to the API.
An application is created in Node.js to call the subscribed API and expose it to an application user.

For this part of the tutorial follow the steps provided in from the section Register to the Portal to the end. 
https://developer.ibm.com/devpractices/api/tutorials/consume-provide-api-with-api-connect-node/

Any doubts feel free to reach me.
alexborc@gmail.com
