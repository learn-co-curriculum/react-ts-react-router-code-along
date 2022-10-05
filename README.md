# React Router Code-Along

## Learning Goals

- Add `react-router-dom` to an existing React application
- Create multiple client-side routes

## Introduction

So far, we have been building our applications without any navigation, so
everything in the app has lived at the same URL. Currently, we can make it look
like we are changing the page based on state by showing or hiding some
components, but none of these changes are dependent on a change in the URL.

Now this may seem like a small quibble, but web addresses are the backbone of
the Internet. The web is just a series of links to other pages, after all.

Let's imagine that we have a React application hosted at `www.loveforsoils.com`
(not a real website) dedicated to sharing knowledge about [soil types][soils].
As a facet of our React application, we want to provide users with the option to
see a list of our favorite soils. Currently, instead of sharing a link to a list
of our favorite soils, we can only provide a link to our "Love for soils"
homepage. Following which, users are required to interact with our application
to see a favorite soil list.

Because our personal opinion on the best soils is so important, we want to
provide users with the opportunity to go straight to this list of the favorite
soils view with a URL at `www.loveforsoils.com/favorites`. Enter **React
Router**: a routing library for **React** that allows us to link to specific
URLs and conditionally render components depending on which URL is displayed.

React Router is a collection of navigational components and custom hooks that
are implemented using declarative programming and [compose with][composition]
the components in your application. Whether you want to have bookmark-able URLs
for your web app, or a composable way to navigate in React Native, React Router
works wherever React is rendering — so take your pick!

[composition]: https://reactjs.org/docs/composition-vs-inheritance.html

To demonstrate some of the key features of React Router, we have an exercise to
code along with, so let's get going!

## Code Along

### Setting up our Main Route

To get started, fork and clone down this repo and run `npm install`.

If you open up `src/index.tsx`, you will see that currently we are defining
`Home` and `App` components, and then rendering the `App` component in the DOM.

```jsx
// ./src/index.tsx
import ReactDOM from "react-dom";
import "./index.css";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard!</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

To start using React Router, we need to install `react-router-dom`:

```console
$ npm install react-router-dom
```

To start implementing routes, we first need to import `BrowserRouter`, `Routes,`
and `Route` from `react-router-dom`:

```jsx
// .src/index.tsx

import ReactDOM from "react-dom";
import "./index.css";
// Step 1. Import react-router components
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard!</h1>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
    </div>
  );
}

// Step 2. Use <BrowserRouter> component to wrap the entire application and provide React Router context features
ReactDOM.render(
  <BrowserRouter>
    {/* Step 3. Inside the <BrowserRouter>, use the <Routes> component in which we can define all our individual <Route>'s*/}
    <Routes>
      {/* Step 4. Define the individual <Route>'s */}
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```

In the code above, there are three components that we are importing from **React
Router**. We use them in turn:

1. The `BrowserRouter` component is the base for our application's routing. It
   is where we declare how **React Router** will be used. Notice that the
   `BrowserRouter` component is wrapped around our entire application. This lets
   us use the `Route` component and other React Router components anywhere in
   our app.
2. The `Routes` component wraps around all the individual `Route` components.
   Whenever the URL changes, `Routes` will look through all its children to find
   the best match to render.
3. The `Route` component is in charge of saying: "when the URL matches this
   specified `path`, render this `element` (component)." This handles the
   conditional rendering based on the URL path. The `Route` component has two
   props in our example: `path` and `element`.

Let's try it. Copy the above code into `src/index.tsx` and run `npm start` to
boot up the application. Once it is running on `http://localhost:3000/`, we
should see it displays the `Welcome to My App!` text from the `App` component.
Now if we go to `http://localhost:3000/dashboard`, we should see it displays the
`Dashboard!` text from the `Dashboard` component.

### Adding Additional Routes

In the last two steps, we learned how to set up the basic `BrowserRouter`
component and inject our very first `Route` components wrapped inside `Routes`.

Let's practice that again by creating two new components for `About` and
`Login`. As we're doing all this within one file, make sure you define these
components _above_ the `App` component:

```jsx
// ./src/index.tsx

function About() {
  return (
    <div>
      <h1>This page is about me!</h1>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
```

Now let's add our `/about` and `/login` routes to our routing logic:

```jsx
// ./src/index.tsx
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```

Now go back to the browser and test out your new routes to make sure
everything's working correctly.

As you test each route, you may notice that the header from the `App` element
disappears unless you're on the root `/` route. Sometimes, that effect desired
when you don't want two components displaying simultaneously.

Other times, however, there are components that you may want to stick throughout
several pages. For example, a header that displays the name or logo of the app,
or a navigation bar. Fortunately, this kind of behavior is baked right into
React Router with nested routing.

### Nested Routes

Nesting routes is easier than it might sound. It only takes two steps to do:

1. Nest the `Route` components within the parent `Route` component they should
   be nested in.
2. Render an `Outlet` component in the parent `Route` component.

Let's start with the first step, nesting the routes.

For our particular example, we want our `App` header that says `My App!` to be
visible on all other pages. In other words, the `Dashboard`, `About`, and
`Login` routes should be nested within the `App` route:

```jsx
<Route path="/" element={<App />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/about" element={<About />} />
  <Route path="/login" element={<Login />} />
</Route>
```

Now, rather than being sibling route's, the `Dashboard`, `About`, and `Login`
route's are children of the `App` route. As children of the `App` route, not
only can the components be rendered within the `App` component, but the URL
paths are nested as well.

Meaning, child routes will take on the parent route's path as a prefix. In our
example, that would mean `Dashboard`'s full path is technically:
`/ + /dashboard = //dashboard`. As we can see, the leading `/` in front of
`dashboard` is unecessary, so we can refactor our code to remove those leading
`/` from the children:

```jsx
<Route path="/" element={<App />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="about" element={<About />} />
  <Route path="login" element={<Login />} />
</Route>
```

In this particular case the leading `/` doesn't break anything, so,
functionally, the removal changes nothing. However, removing the leading `/`
becomes important when the parent path is something other than just the root
`/`.

Let's actually try that out by changing the `App` path to `/app` and adding back
the leading `/` to `Dashboard`:

```jsx
<Route path="/app" element={<App />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="about" element={<About />} />
  <Route path="login" element={<Login />} />
</Route>
```

Uh-oh, that broke our app. Nothing loads anymore! Remove the leading `/` again
from `Dashboard`. This now means our path to `Dashboard` is
`/app + dashboard = /app/dashboard`. React Router will automatically add the `/`
where necessary between the two paths.

Try going to `http://localhost:3000/app/dashboard` to check it out! It should
work just fine now.

### Recap

<!-- Update this with nested route stuff -->

- We imported the `BrowserRouter` and the `Route` components from the
  `react-router-dom` package into our `index.js` file
- We wrapped `BrowserRouter` around the top level component in our React
  application
- We defined three possible routes, each of which is doing the following:
  - defining what URLs to match on
  - defining what component should be rendered, should a match return true
  - for our `/` route, setting a prop of `exact`, which ensures that you will
    only see the component if you go to the exact path.

We have made great progress so far!

Now that we have the tools to enable routing, let's look into how we can enable
users to trigger our `Route`s without requiring a manual change of the address
bar.

### Links and NavLinks

What good are routes if users don't know how to find them or what they are?

React Router provides two components that enable us to trigger our routing:
`Link` and `NavLink`. They both have the same base level functionality:

- They render an `<a>` tag to the DOM
- When the `<a>` tag is clicked, they change the URL and tell React Router to
  re-render our routes, displaying the component that matches the new URL

`NavLink` acts as a superset of `Link`, adding **styling attributes** to a
rendered element **when it matches the current URL**. `NavLink` works well for
creating a navigation bar, since it allows us to add styling to indicate which
link is currently selected. `Link` is a good option for creating standard
hyperlinks. For this example, we will be using `NavLink`; we will see examples
of using `Link` in later lessons.

Let's work on adding in the `NavLink` component to our application:

```jsx
import React from "react";
import ReactDOM from "react-dom";
/* Add NavLink to import */
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

/* Add basic styling for NavLinks */
const linkStyles = {
  display: "inline-block",
  width: "50px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

/* define the NavBar component */
function NavBar() {
  return (
    <div>
      <NavLink
        to="/"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={linkStyles}
        /* add prop for activeStyle */
        activeStyle={{
          background: "darkblue",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Login
      </NavLink>
    </div>
  );
}

function Home() {
  return <h1>Home!</h1>;
}

function About() {
  return <h1>This is my about component!</h1>;
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

/* add the NavBar component to our App component */
function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
```

Load up the browser again and you should see beautiful blue NavLinks that load
up the desired component. Note that, because we've rendered the `NavBar`
component outside the `Switch` component, it appears on each page, as desired.

For more practice, implement `/signup` and `/messages` routes, NavLinks and
components.

### Refactoring

In anticipation of a growing codebase, let's refactor by removing the components
we defined in `index.js` and placing them in their own files in
`src/components`. You can also see the completed version of this code in the
solution branch.

```jsx
// src/components/Home.js
import React from "react";

function Home() {
  return <h1>Home!</h1>;
}

export default Home;
```

```jsx
// src/components/About.js
import React from "react";

function About() {
  return <h1>This is my about component!</h1>;
}

export default About;
```

```jsx
// src/components/Login.js
import React from "react";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
```

```jsx
// src/components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  display: "inline-block",
  width: "50px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

function NavBar() {
  return (
    <div>
      <NavLink
        to="/"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Login
      </NavLink>
    </div>
  );
}

export default NavBar;
```

```jsx
// src/components/App.js
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
```

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

## Conclusion

You've now seen all the core functionality of React Router required for
client-side routing! We've met the requirements so that our app can:

- Conditionally render a different component based on the URL (using the
  `<Route>` and `<Switch>` components)
- Change the URL using JavaScript, without making a GET request and reloading
  the HTML document (using the `<Link>` or `<NavLink>` components)

In the coming lessons, we'll explore more of the advanced functionality provided
by React Router. You are also strongly encouraged to look at the [React Router
docs][react router docs], and in particular at the examples section, to get more
ideas on how to use React Router to build common features in your own
applications.

## Resources

- [React Router docs][react router docs]

[react router docs]: https://v5.reactrouter.com/web/guides/quick-start
[soils]: https://en.wikipedia.org/wiki/Soil_type
