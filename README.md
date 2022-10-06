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
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="about" element={<About />} />
  <Route path="login" element={<Login />} />
</Route>
```

Now, rather than being sibling route's, the `Dashboard`, `About`, and `Login`
route's are children of the `App` route. As children of the `App` route, not
only can the components be rendered within the `App` component, but the URL
paths are nested as well.

Meaning, child routes are _relatively pathed_ and will take on the parent
route's path as a prefix. In our example, that would mean `Dashboard`'s full
path is technically: `/ + dashboard = /dashboard`. If the parent `App`'s path
was `/app` instead, then `Dashboard`'s full path would be
`/app + dashboard = /app/dashboard`.

> **Note**: When nesting routes, the leading `/` in front of the nested paths
> are unecessary. React Router will add those in automatically.

### Outlet

We've nested the routes, but now we can't our nested components. Even if we try
going to `/dashboard`, all we see is the header that says `My App!`, but we
don't see the `Dashboard!` text. That's because for nesting to work, we need to
provide the parent component with an _outlet_ in which to display the nested
components.

React Router provides an `Outlet` component to do exactly that. All we need to
do is import it into the parent component, and render it wherever we want the
nested components to show up.

```jsx
import ReactDOM from "react-dom";
import "./index.css";
// Step 1. Import the Outlet component
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// ... all the other components

function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
      {/* Step 2. Render the Outlet component where we want the nested components to render */}
      <Outlet />
    </div>
  );
}

// ... DOM render
```

When we go to `http://localhost:3000/dashboard` or any of the other nested
routes now, we should see _both_ the `My App!` header and the appropriate
component.

### Recap

We've already learned a lot of stuff so far. Let's take some time here to recap
what we've learned:

- We imported the `BrowserRouter`, `Routes`, and `Route` components from the
  `react-router-dom` package into our `index.js` file
- We wrapped `BrowserRouter` around the top level component in our React
  application
- Inside that `BrowserRouter`, we then wrapped `Routes` around all our
  individual `Route` components.
- We defined four possible routes with `Route`, each of which is doing the
  following:
  - defining what URLs to match on
  - defining what component should be rendered, should a match return true
- We nested three of our routes inside one parent route.
  - We imported and used the `Outlet` component to tell the parent component
    where to render the nested ones.

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
rendered element **when it matches the current URL**. In other words, `NavLink`
knows when its link is active. `NavLink` works well for creating a navigation
bar, since it allows us to add styling to indicate which link is currently
selected.

`Link` is a good option for creating standard hyperlinks. For this example, we
will be using `NavLink`; we will see examples of using `Link` in later lessons.

Let's work on adding in the `NavLink` component to our application:

```jsx
// src/index.tsx

// Step 1. Import NavLink
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";

// Step 2. Define the NavBar component
function NavBar() {
  return (
    <div className="nav-bar">
      {/* add a className to the wrapper div for styling purposes, we will define this class in the CSS later */}
      {/* Step 3. Define the NavLink's */}
      <NavLink
        /* specify where the link should point to */
        to="/"
        /* add styling to Navlink, we will define this class in the CSS later */
        className="nav-link"
      >
        Home
      </NavLink>
      <NavLink to="/dashboard" className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
    </div>
  );
}

// .. all other components

// Step 4. Add the NavBar component to our App component underneath the header and above the Outlet
function App() {
  return (
    <div>
      <h1 className="app-header">My App!</h1>
      <NavBar />
      <Outlet />
    </div>
  );
}

// ... DOM render
```

Load up the browser again and you should see all your links bunched up together.
While they don't look pretty, they're functional as is. Try it out by clicking
through all the links and watch as the nested component changes appropriately
with each one.

Let's make them look better by adding some styling in our `index.css`. We
already added the class names necessary onto the elements themselves, we just
need to define the actual classes. Feel free to copy and paste:

```css
/* src/index.css */

.nav-bar {
  width: 100%;
  background-color: beige;
}

.nav-link {
  display: inline-block;
  width: 23.65%;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  color: darkseagreen;
}
```

Great! They work and look great now, too. However, we're still not taking
advantage of how `NavLink` components know when they're the active link. So, how
exactly _do_ the comopnents know? React Router handles this by adding a class of
`active` onto the active one. We can check this out ourselves by investigating
the Elements tab in the browser's developer tools and clicking on one of the
`NavLink`'s:

![Investigating the Elements tab in developer tools](https://imgur.com/JNfKcV5.gif)

We can see the `active` class get added onto the link. To make use of that, all
we have to do is define and style the `active` class in our `index.css`. We'll
make ours simple and just change the background color. Again, feel free to copy
and paste:

```css
/* src/index.css */
.active {
  background-color: rgb(59, 60, 60);
}
```

When we try it out again, the active link should have a different background
color from the rest. Except, wait... the `Home` link always thinks it's active.
This is because the all the other links start with `/`, so `Home` assumes it's
active as well.

We can get around that by specifying that the `Home` link should only be
considered active when the URL is _just_ `/`. To do so, we add the `end` prop
onto the `NavLink`, like so:

```jsx
<NavLink
  to="/"
  className="nav-link"
  end
>
```

It doesn't take any value, simply providing the prop is enough. Now it should
only have a different background when we're exactly at `http://localhost:3000/`.
Pretty nifty!

### Refactoring

Now that we've added several components into our app, our `index.tsx` file has
grown considerably. Let's refactor by removing the components we defined in
`index.js` and placing them in their own files in `src/components`. You can also
see the completed version of this code in the solution branch.

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
  `<Routes>` and `<Route>` components)
- Nest copmonents within one another (using the `<Route>` and `<Outlet>`
  components)
- Change the URL using JavaScript, without making a GET request and reloading
  the HTML document (using the `<Link>` or `<NavLink>` components)

In the coming lessons, we'll explore more of the advanced functionality provided
by React Router. You are also strongly encouraged to look at the [React Router
docs][react router docs], and in particular at the examples section, to get more
ideas on how to use React Router to build common features in your own
applications.

## Resources

- [React Router docs][react router docs]

[react router docs]: https://reactrouter.com/en/main
[soils]: https://en.wikipedia.org/wiki/Soil_type
