# full-pos-app

👋 Hello! This app is a very simple POS (point-of-sale) application that supports three main use cases: creating orders, adding items to an order, and completing or exiting an order. This also allows you to view an itemized view of all completed orders. It uses [Serialized](https://serialized.io/) to keep track of events and to pull the data.

![full-pos-gif](https://user-images.githubusercontent.com/12901850/160322699-bb6adea6-6a48-482f-b0db-a005c105a397.gif)

## Getting started

To start, fork it and then clone this repository locally onto your machine or download it as a .ZIP file.

Once you have the repository on your machine, follow the steps to get started:

### 1. Initial configuration

- Set up your `.env` files - you will need a `.env` file in the `api` directory (to be used by the backend to authenticate into the Serialized API). You will need a [Serialized](https://serialized.io/) account and within that, a project created in your account.
- Your `.env` file will look like this:

```
SERIALIZED_ACCESS_KEY=
SERIALIZED_SECRET_ACCESS_KEY=
```

To find the `SERIALIZED_ACCESS_KEY` and `SERIALIZED_SECRET_ACCESS_KEY` values, go to Settings > API Keys in your Serialized dashboard for the project you created and set the environment variables to the corresponding values.

### 2. Install dependencies

Once your `.env` is set up, install dependencies. You'll need to do the following:

- In the `api` directory, run `npm install` (installs general back-end dependencies)
- In the `client` directory, run `npm install` (installs React project dependencies)

### 3. Run application

To run your application, open a new window or tab in the Terminal so that you have two tabs or windows open.
In one tab, run `npm start` in the `api` folder. (The back-end will run on `localhost:9000`)
In another tab, run `npm start` in the `client` folder.

Once `localhost:3000` launches the front-end, you’ll see the following screen:

<img width="653" alt="Screen Shot 2022-02-25 at 11 49 28 PM" src="https://user-images.githubusercontent.com/12901850/155829552-50aa411d-c3b4-4f10-8cfa-4310cf7c037c.png">

## View aggregates and data:

To confirm an order was created, go to your [Serialized](https://serialized.io/) Dashboard for your project you created and go to the Data Explorer page. You'll see a list of orders that have been created.

To confirm items have been added to an order or that your order has been completed, go to your Serialized Dashboard > Data explorer > Aggregates > order (under Aggregate type column) > Aggregates > click the Aggregate ID of the top (and most recent) entry.

To see details on events within an Aggregatem you can click on Event IDs within this view.

To confirm your projections have been created for viewing your completed orders, go to your Serialized Dashboard for your project > Projections. You should be able to see your created projections from here. If you click into the projections, you can view the schema of the projection.
