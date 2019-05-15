const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const getTime = () =>{
  var date = new Date();
  var hour = (date.getHours()+6) % 24;
  hour = (hour < 10 ? "0" : "")+hour ;
  var minutes = date.getMinutes();
  minutes = (minutes <10 ? "0": "")+minutes;
  var time = `${hour}:${minutes}`;
  console.log(time);
  return time;
}



const getDate = () =>{
  var date = new Date();
  var day = date.getDate();
  day = (day < 10 ? "0": "")+day;
  var month = date.getMonth()+1;
  month = (month < 10 ? "0": "")+month;
  var year = String(date.getFullYear()).substring(2,4);
  var todaysdate = `${day}.${month}.${year}`;
  console.log(todaysdate);
  return todaysdate;
}

exports.testpoint = functions.https.onRequest((req,res)=>{
  let dateToday = getDate();
  res.send(dateToday);
})



exports.getAllTrains = functions.https.onRequest((req,res)=>{
    let trainsToday = new Array();
    let trainDetails = firestore.doc('Root/TrainDetails').listCollections();
    trainDetails.then((collrefs)=>{
      const promises = [];
      for(let collref of collrefs){
        const p = collref.listDocuments();
        promises.push(p);
      }
      return Promise.all(promises);
    })
    .then((docpromises)=>{
      const promises = [];
      for(let docs of docpromises){
        for(let doc of docs){
          let trains = doc.collection('Trains');
          const p = trains.listDocuments();
          promises.push(p);
        }
      }
      return Promise.all(promises);
    })
    .then((docpromises)=>{
      const promises = [] ;
      for(let docs of docpromises){
        for(let doc of docs){
          const p = doc.get();
          promises.push(p);
        }
      }
      return Promise.all(promises);
    })
    .then((trainsnaps)=>{
      trainsnaps.forEach((trainsnap)=>{
        if(trainsnap.exists){
          const data = trainsnap.data();
          trainsToday.push(data);
        }
      });
      res.set('Access-Control-Allow-Origin', "*");
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.send(trainsToday);
      return;
    })
    .catch((error)=>{
      console.log(error);
      res.set('Access-Control-Allow-Origin', "*");
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.status(500).send(error);
    });
});



exports.getTrainsToday = functions.https.onRequest((req,res)=>{
  let trainsToday = new Array();
  let allTrains = new Array();
  let depTime = getTime();
  let trainDetails = firestore.doc('Root/TrainDetails').listCollections();
  trainDetails.then((collrefs)=>{
    const promises = [];
    for(let collref of collrefs){
      const p = collref.listDocuments();
      promises.push(p);
    }
    return Promise.all(promises);
  })
  .then((docpromises)=>{
    const promises = [];
    for(let docs of docpromises){
      for(let doc of docs){
        let trains = doc.collection('Trains');
        const p = trains.listDocuments();
        promises.push(p);
      }
    }
    return Promise.all(promises);
  })
  .then((docpromises)=>{
    const promises = [] ;
    for(let docs of docpromises){
      for(let doc of docs){
        const p = doc.get();
        promises.push(p);
      }
    }
    return Promise.all(promises);
  })
  .then((trainsnaps)=>{
    trainsnaps.forEach((trainsnap)=>{
      if(trainsnap.exists){
        const data = trainsnap.data();
        allTrains.push(data);
      }
    });
    return Promise.resolve(allTrains);
  })
  .then((allTrains)=>{
    for(let train of allTrains){
      let trainNo = train.trainNo ;
      let trainDepTime = train.route[0].departureTime;
      if(depTime === trainDepTime){
        trainsToday.push(train);
      }
    }
    //res.send(trainsToday);
    return Promise.resolve(trainsToday);
  })
  .then((trainsToday)=>{
    const promises = [];
    for(let train of trainsToday){
      train.tteAllocatedStatus = 0 ;
      let trainNo = train.trainNo;
      let docref = firestore.doc(`DynamicRoot/TrainDetails/RunningTrains/${trainNo}`);
      const p = docref.set(train);
      promises.push(p);
    }
    return Promise.all(promises);
  })
  .then((createresponse)=>{
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.send(trainsToday);
    return;
  })
  .catch((error)=>{
    console.log(error);
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.status(500).send(error);
  });
});



exports.addPassengers = functions.firestore.document('DynamicRoot/TrainDetails/RunningTrains/{train}')
  .onCreate((train,context)=>{
    let trainData = train.data();
    let trainNo = trainData.trainNo;
    let dateToday = getDate();
    let colref = firestore.collection(`Root/Passengers/${trainNo}/${dateToday}/PassengerDetails`);
    return colref.listDocuments()
    .then((docrefs)=>{
      const promises = [];
      for(let docref of docrefs){
        const p = docref.get();
        promises.push(p);
      }
      return Promise.all(promises);
    })
    .then((docsnaps)=>{
      const promises = [];
      let colref = firestore.collection(`DynamicRoot/TrainDetails/RunningTrains/${trainNo}/Passengers`);
      for(let docsnap of docsnaps){
        let data = docsnap.data();
        let id = docsnap.id;
        let docref = colref.doc(`${id}`);
        const p = docref.set(data);
        promises.push(p);
      }
      return Promise.all(promises);
    })
    .then((createrpromise)=>{
      const p = Promise.resolve(createrpromise);
      return p;
    })
    .catch((error)=>{
      console.log(error);
    });
  });