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
        if((document.getElementById('sourceStn').validity.valid) && (document.getElementById('destStn').validity.valid) && (document.getElementById('doj').validity.valid)){
            $('#trains-list').html("");
            $('#trains-list').append(`<h1 style="text-align:center; margin:100px 0px 30px;">Found Trains</h1>`);
            $('html, body').animate({
                scrollTop: $('#trains-list').offset().top
              }, 1000);
            findingTrains(allTrains,source,destination)
            .then((foundTrains)=>{
                if(JSON.stringify(foundTrains) === '[]'){
                    $('#trains-list').append(`<h3 style="color: white;padding:10px 10px; background-color:#B33A3A;box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);border-radius:5px;">No Trains Found...Please try different search parameters...</h3>`);
                }
                else{
                    $('#trains-list').append(generateTrainList(foundTrains));
                }
            })
            .catch((e)=>{
                $('#trains-list').append("<h4>Something went wrong !!! try again....</h4>");
            });
        }
        else{
            alert("Please Fill all the fields");
        }
    });
});



let generateTrainList = (foundTrains)=>{
    let coaches = {
        chairCar : "AC Chair Car (CC)",
        secondSitting : "Second Sitting (2S)",
        firstTierAc : "AC First Class (1A)",
        secondTierAc : "AC 2 Tier (2A)",
        thirdTierAc : "AC 3 Tier (3A)",
        sleeper : "Sleeper (SL)",
        executiveChairCar : "Exec. Chair Car (EC)",
        thirdAcEconomy : "AC 3 Economy (3E)",
        anubhutiClass : "Anubhuti Class (EA)"
    }
    let htmlData = '';
    for(let train of foundTrains){
         htmlData += `<div class="row trains">
                            <div class="col-md-1"><center><img src="img/train.png" style="margin:20px 0px;"></center></div>
                            <div class="col-md-4">
                                <h4 style="font-weight:700; margin:20px 0px 5px;">${train.trainName} (${train.trainNo})</h4>
                                <h5>${train.source} <span class="glyphicon glyphicon-arrow-right"></span> ${train.destination}</h5>
                            </div>
                            <div class="col-md-2"></div>
                            <div class="col-md-3">
                                <span class="form-label">Preferred Class *</span>
                                <select class="form-control" required>
                                    <option value="">Select Class</option>`;
                                for(let i= 0 ; i < train.coachTypes.length ; i++){
                                    htmlData += `<option value="${train.coachTypes[i]}">${coaches[train.coachTypes[i]]}</option>`;
                                }

                            htmlData +=`</select>
                            </div>
                            <div class="col-md-2"><button class="submit-btn btn-block" style="margin:20px 0px;">Check Seats</button></div>
                        </div>` ;
    }
    return htmlData;
}

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