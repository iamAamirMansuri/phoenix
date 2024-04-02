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

### Basic Usage

useApiHook Parameters
The useApiHook is designed to make API calls with ease while providing built-in state management for your React components. It accepts two parameters to control its behavior:

#### initialConfig (Object): 
This configuration object defines the settings for the Axios request. It includes:

- url (string): The endpoint URL for the API request.
- method (string): HTTP method (e.g., 'GET', 'POST', 'PUT'). Defaults to 'GET' if not specified.
- data (Object): The payload for POST/PUT requests.
- headers (Object): Any custom headers you wish to include in your request.
This object allows you to customize the API request according to your needs, utilizing Axios' flexibility directly within your hook.

#### autoload (boolean): 
A flag to control the automatic fetching behavior when the component mounts.

If true, the hook automatically initiates the API call with the provided initialConfig when the component renders.
If false, the API call must be manually triggered using the refetch function.
This parameter provides control over when the data fetching should occur, enabling use cases where an immediate fetch isn't desired or needs to be triggered by a user action.

#### Utilize Prebuilt States
Import useApiHook in your component to leverage prebuilt states (loading, error, data) for managing API interactions:

``` jsx
Copy code
import React from 'react';
import { useApiHook } from 'phoenix-hook';

const MyComponent = () => {
  const { data, loading, error, refetch } = useApiHook({
    url: 'https://api.example.com/data',
  }, true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => refetch()}>Refetch Data</button>
    </div>
  );
};

```

#### Flexible Data and Error Handling with Promises
useApiHook also facilitates promise chaining with .then and .catch, enabling flexible data handling and error management:

``` jsx
Copy code
import React, { useEffect } from 'react';
import { useApiHook } from 'phoenix-hook';

const MyComponent = () => {
  const { refetch } = useApiHook({
    url: 'https://api.example.com/data',
  }, false); // Disable autoload to manually trigger the fetch

  useEffect(() => {
    refetch().then(data => {
      console.log('Data fetched:', data);
      // Process the fetched data
    }).catch(error => {
      console.error('Fetching error:', error);
      // Handle error here
    });
  }, [refetch]);

  // Render component UI
};


```

### Configuring Request
You can easily customize the request method, headers, and body:

``` javascript
Copy code
const { data, loading, error, setConfig, refetch } = useApiHook();

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