# react-bootstrap-notify

This package provides functionality for managing in-page notifications in [React](https://reactjs.org/)
applications as [Bootstrap Toasts](https://getbootstrap.com/docs/4.3/components/toasts/).

## Installation

This package is currently only available for installation directly from GitHub:

```sh
yarn add react-bootstrap-notify@github:cedadev/react-bootstrap-notify
```

## Usage

`react-bootstrap-notify` exports only three variables:

  * `NotificationProvider` - context provider that must be used to wrap your application.
  * `useNotifications` - hook that returns a function that can be used to show a notification.
  * `Notifications` - component that renders the current notifications.

A notification, as given to the function returned by the `useNotifications` hook, is just an
object with the following properties:

  * `level` - the level of the notification, one of `success`, `info`, `warning` or `danger`.
  * `title` - the title of the notification, will be used in the toast header.
  * `message` - the message for the notification, will be used in the toast body.
  * `duration` - the duration of time to show the notification in ms (OPTIONAL).


## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Notifications, { NotificationProvider, useNotifications } from 'react-bootstrap-notify';


const NotifyButton = () => {
    // Components anywhere in the tree can use the notify function returned
    // by useNotifications to display notifications
    const notify = useNotifications();

    const onButtonClick = () => notify({
        level: 'info',
        title: 'Button clicked',
        message: 'The button was clicked!',
        duration: 5000
    });

    return <Button onClick={onButtonClick}>Show notification</Button>;
};


const App = () => (
    <Container fluid>
        {/* Render the notifications somewhere near the top level of the app */}
        <Notifications />
        <Row><Col><NotifyButton /></Col></Row>
    </Container>
);


// Wrap the application in the notification provider
ReactDOM.render(
    <React.StrictMode>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
```
