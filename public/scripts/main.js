$(document).ready(()=>{
    let allTrains = new Array();
    $.get("https://us-central1-ticketchecker-d4f79.cloudfunctions.net/getAllTrains",(data,status)=>{
        allTrains = data;
    },"json");
    $('#findBtn').click((e)=>{
        e.preventDefault();
        let source = document.getElementById('sourceStn').value;
        let destination = document.getElementById('destStn').value;
        let doj = document.getElementById('doj').value;
        findingTrains(allTrains,source,destination)
        .then((foundTrains)=>{
            $('#data').append(JSON.stringify(foundTrains));
        })
        .catch((e)=>{
            alert("try again....");
        });
    });
});

let findingTrains = (allTrains,source,destination)=>{
    let foundTrains = new Array();
    allTrains.forEach((train)=>{
        let routes = train.route;
        for(let i = 0 ; i < routes.length-1; i++){
            if(routes[i].stationCode === source){
                for(let j = i+1 ; j < routes.length ; j++){
                    if(routes[j].stationCode === destination){
                        let data = {
                            "trainName" : train.trainName,
                            "trainNo" : train.trainNo,
                            "source" : routes[i].stationCode,
                            "destination":routes[j].stationCode,
                            "departure" : routes[i].departureTime,
                            "arrival" : routes[j].arrivalTime,
                            "coachTypes" : train.coach.coachType
                        };
                        foundTrains.push(data);
                    }
                }
            }
        }
    });
    return Promise.resolve(foundTrains);
}