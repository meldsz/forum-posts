# Forum Posts

Application Stack:
* Vue
* Express
* Node.js


Libraries Used:
* [Lodash](https://lodash.com/)
* [Vuetify](https://vuetifyjs.com) (UI styling)
* [Jest](https://jestjs.io/) (testing)

## Pre-requisites:

You need to have Node.js and Vue-cli installed on your system.

Download Node.js from [here](https://nodejs.org/en/download/)

To install Vue CLI globally, run

```
npm install -g @vue/cli
```

## Project setup

1. Clone this repository
2. Install all the dependencies:
    ```
    npm install
    ```
3. Run the application for development: 
    ```
    cd posts-app
    ```
    ```
    npm run dev
    ```
   The above command runs both the Frontend and backend application
### Runs Unit Tests

```
npm run test:unit
```


### Compiles and minifies for production
```
npm run build
```

### Features:
* Application displays posts on a tree view initially grouped by the posting week.
* The posting weeks have been determined with respect to the current date.
* User has the option to override the default settings and group the posts by location or author of the post.
* Each post contains a form to edit the location and author of the post.

