# air-quality-monitor


### Project URL
```
https://airqualitymonitor-dip.netlify.app/
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Development
```

It took me around 4-5 of work to get it done from stratch.

We are storing the historical data in the local storage, ideally we could be storing this data in the database since it would be more efficient. 

As future improvements we could add data segregation by time( hourly, daily, monthly)

I have used a standard vue boilerplate with vuetify as the UI library and chartjs for charting.

I have used netlify to host the application.


```

### Usage
```

The homepage shows the AQI of the cities realtime,

We can deepdive into a single city by clicking the row. 

The deepdive has historical data with a table view and a chart view as well.
