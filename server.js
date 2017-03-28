const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.get('/api/todos', function (req, res) {
  const dataName = 'todo';
  handleGetAll(req, res, dataName);
});

app.post('/api/todos', function (req, res) {
  const dataName = 'todo';
  handlePost(req, res, dataName);
});

app.put('/api/todos/:id', function (req, res) {
  const dataName = 'todo';
  handlePut(req, res, dataName);
});

app.delete('/api/todos/:id', function (req, res) {
  const dataName = 'todo';
  handleDelete(req, res, dataName);
});

app.get('/api/visibilityFilter', function (req, res) {
  fs.readFile(
    path.resolve(__dirname, 'api', 'visibility-filter.json'),
    'utf-8',
    function (err, data) {
      if (err) {
        res.status(500).send('Error reading visibility filter');
      } else {
        const allData = JSON.parse(data);
        res.status(200).json(allData);
      }
    }
  );
});

app.put('/api/visibilityFilter', function (req, res) {
  fs.readFile(
    path.resolve(__dirname, 'api', 'visibility-filter.json'),
    'utf-8',
    function (readErr, data) {
      if (readErr) {
        res.status(500).send('Error reading visibility filter');
      } else {
        const jsonData = JSON.parse(data);
        const updatedJsonData = {
          filter: req.body.filter,
        };

        fs.writeFile(
          path.resolve(__dirname, 'api', 'visibility-filter.json'),
          JSON.stringify(updatedJsonData),
          'utf-8',
          function (writeErr) {
            if (writeErr) {
              res.status(500).send('Error writing visibility filter');
            } else {
              res.status(200).json(updatedJsonData);
            }
          }
        );
      }
    }
  );
});

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port);
console.log('server started on port ' + port);

// function to handle get all requests and queries
function handleGetAll(req, res, dataName) {
  fs.readFile(
    path.resolve(__dirname, 'api', dataName + 's.json'),
    'utf-8',
    function (err, data) {
      if (err) {
        res.status(500).send('Error reading ' + dataName + 's');
      } else {
        const dataKey = dataName + 's';
        const allData = JSON.parse(data)[dataKey];
        res.status(200).json(allData);
      }
    }
  );
}

// function to handle post requests
function handlePost(req, res, dataName) {
  fs.readFile(
    path.resolve(__dirname, 'api', dataName + 's.json'),
    'utf-8',
    function (readErr, data) {
      if (readErr) {
        res.status(500).send('Error reading ' + dataName + 's');
      } else {
        const dataKey = dataName + 's';
        const jsonData = JSON.parse(data);
        const allData = jsonData[dataKey];
        const latestId = jsonData.latestId;

        const newData = Object.assign(
          {
            id: latestId + 1,
          },
          req.body
        );
        const newAllData = allData.concat(newData);
        var newAllDataObj = {};
        newAllDataObj[dataKey] = newAllData;

        const newJsonData = Object.assign(
          newAllDataObj,
          {
            latestId: latestId + 1,
          }
        );

        fs.writeFile(
          path.resolve(__dirname, 'api', dataName + 's.json'),
          JSON.stringify(newJsonData),
          'utf-8',
          function (writeErr) {
            if (writeErr) {
              res.status(500).send('Error writing ' + dataName + 's');
            } else {
              res.status(201).json(newData);
            }
          }
        );
      }
    }
  );
}

// function to handle put requests
function handlePut(req, res, dataName) {
  fs.readFile(
    path.resolve(__dirname, 'api', dataName + 's.json'),
    'utf-8',
    function (readErr, data) {
      if (readErr) {
        res.status(500).send('Error reading ' + dataName + 's');
      } else {
        const dataKey = dataName + 's';
        const jsonData = JSON.parse(data);
        const allData = jsonData[dataKey];
        const latestId = jsonData.latestId;

        const targetData = allData.find(function (dataItem) {
          return dataItem.id == req.params.id;
        });

        if (!targetData) {
          res.status(404).send(
            dataName + ' with id ' + req.params.id + ' does not exist'
          );
        }

        const updatedData = Object.assign(
          targetData,
          req.body
        );

        const updatedAllData = allData.map(function (dataItem) {
          if (dataItem.id == req.params.id) {
            return updatedData;
          }

          return dataItem;
        });

        var updatedAllDataObj = {};
        updatedAllDataObj[dataKey] = updatedAllData;

        const updatedJsonData = Object.assign(
          updatedAllDataObj,
          {
            latestId: latestId,
          }
        );

        fs.writeFile(
          path.resolve(__dirname, 'api', dataName + 's.json'),
          JSON.stringify(updatedJsonData),
          'utf-8',
          function (writeErr) {
            if (writeErr) {
              res.status(500).send('Error writing ' + dataName + 's');
            } else {
              res.status(200).json(updatedData);
            }
          }
        );
      }
    }
  );
}

// function to handle delete requests
function handleDelete(req, res, dataName) {
  fs.readFile(
    path.resolve(__dirname, 'api', dataName + 's.json'),
    'utf-8',
    function (readErr, data) {
      if (readErr) {
        res.status(500).send('Error reading ' + dataName + 's');
      } else {
        const dataKey = dataName + 's';
        const jsonData = JSON.parse(data);
        const allData = jsonData[dataKey];
        const latestId = jsonData.latestId;

        const filteredDataArray = allData.filter(function (dataItem) {
          return dataItem.id != req.params.id;
        });

        if (filteredDataArray.length === allData.length) {
          res.status(404).send(
            dataName + ' with id ' + req.params.id + ' does not exist'
          );
        }

        var filteredDataObj = {};
        filteredDataObj[dataKey] = filteredDataArray;

        const filteredJsonData = Object.assign(
          filteredDataObj,
          {
            latestId: latestId,
          }
        );

        fs.writeFile(
          path.resolve(__dirname, 'api', dataName + 's.json'),
          JSON.stringify(filteredJsonData),
          'utf-8',
          function (writeErr) {
            if (writeErr) {
              res.status(500).send('Error writing ' + dataName + 's');
            } else {
              res.sendStatus(204);
            }
          }
        );
      }
    }
  );
}
