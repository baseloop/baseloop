# Baseloop &middot; [![Discord](https://img.shields.io/discord/551772477165010959.svg?color=green&label=chat%20on%20Discord)](https://discord.gg/zMyuFwt)

Baseloop is a toolkit and guide (not a framework) which shows you how to build modern web applications that adhere to well-proven
principles such as functional and reactive programming.

![npm-version](https://img.shields.io/npm/v/@baseloop/core.svg?color=green&label=npm%20package)
![license](https://img.shields.io/npm/l/@baseloop/core.svg?color=green)

## Architecture

Baseloop architecture is based on reactive programming and a few principles.

The architecture relies on a few existing libraries:
- RxJS (reactive programming)
- React (views)

Example code uses Webpack for bundling, but it's not compulsory. The `@baseloop/dev` package uses Webpack.

### Atoms

Atoms are state containers. An Atom contains data, which can be updated and observed on. The point of Atoms is for
views and controllers to *observe* them. Events occur whenever an Atom is updated. Atoms can be combined with other
reactive utilities from RxJS.

### Controllers

Controllers are the what handle routing, user input and other high-level functionality.
Controllers are also responsible for creating views.

Controllers may listen to Atoms for their state changes as well as other generic state changes such as WebSocket message
events and Ajax responses. 

### Views

Views are responsible for rendering a user interface. Views may only contain ui-related logic (not business logic!).
Views may listen to Atoms for state changes.

Views commonly cause events such as mouse clicks or key presses. These are listened to by the controller. 

### Services

To avoid fat controllers, all domain specific business logic should be implemented in domain specific services.
An example could be ProfileService or AnalyticsService.

Common utility functions should be placed in utility related classes and files. Mappers, data clients and others
can be placed in their own files as well.

### Data flow

Baseloop architecture is based on the idea of a *unidirectional data flow*.
This means that data always flows in one direction.

A view can't call controller or service functionality. Views only emits events that others listen to.
