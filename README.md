# phoenix-hook

A custom React hook for simplifying API calls in your React applications. `phoenix-hook` provides an easy way to fetch data from an API, including handling loading states, errors, and updating data, with built-in support for GET, POST, PUT, and other HTTP methods. It leverages axios for making HTTP requests and is designed to make API integration in React components more intuitive and less boilerplate-heavy.

## Requirements

- React 16.8.0 or later.
- Axios (this package uses Axios internally for making HTTP requests).

This package lists `react` as a `peerDependency`, ensuring that it uses the React version installed in your project. Make sure you have a compatible version of React. Axios is a dependency of this package and will be installed when you install `use-api-call-hook`.

## Installation

Install `phoenix-hook` using npm or yarn:

```bash
npm install phoenix-hook

# or
yarn add phoenix-hook
```

### How to Use
First, import the hook in your React component:

``` jsx
Copy code
import {apihook} from 'phoenix-hook';
```
### Basic Usage
Here's a simple example to fetch data from an API on component mount:

``` jsx
Copy code
import React from 'react';
import {apihook} from 'phoenix-hook';

const MyComponent = () => {
  const { data, loading, error, refetch } = apihook({
    url: 'https://api.example.com/data',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Refetch Data</button>
    </div>
  );
};

export default MyComponent;

```
### Configuring Request
You can easily customize the request method, headers, and body:

``` javascript
Copy code
const { data, loading, error, setConfig, refetch } = apihook();

// To set up a POST request
setConfig({
  url: 'https://api.example.com/submit',
  method: 'POST',
  data: {
    key: 'value'
  },
});

// To manually trigger the API call
refetch();
```
## API Reference
The useApiCall hook returns an object containing:

- data: The data returned from the API.
- loading: Boolean indicating if the request is in progress.
- error: Any error that occurred during the request.
- success: Boolean indicating if the last request was successful.
- refetch: Function to manually trigger the API call again.
- setConfig: Function to update the request configuration.

## Contributing
Contributions are always welcome! Please feel free to submit any issues or pull requests.