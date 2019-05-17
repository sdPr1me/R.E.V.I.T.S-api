 function putSeatsSleeper(){
     let totalCoops = 9;
     let count = 1;
     for(let i=1;i<=totalCoops;i++){
         count = addACoop3Tier(count);
     } 
 }

 function putSeats3AC(){
    let totalCoops = 8;
    let count = 1;
    for(let i=1;i<=totalCoops;i++){
        count = addACoop3Tier(count);
    } 
}

function putSeats2AC(){
    let totalCoops = 8;
    let count = 1;
    for(let i=1;i<=totalCoops;i++){
        count = addACoop2Tier(count);
    } 
}

 
function aSeat(id)
 {
    let seat = `<input type="checkbox" name="seats" id="${id}" value="${id}"><label for="${id}" class="trainseat">${id}</label>`;
    return seat;
 }


 function addACoop3Tier(count)
 {
     let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                             ${aSeat(count+6)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+7)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+5)}
                             ${aSeat(count+4)}
                             ${aSeat(count+3)}
                        </span>
                    </div>
                </div>`
     $('#layout').append(coop);
     return (count+8);
 }

 function addACoop2Tier(count)
 {
     let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                             ${aSeat(count+4)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+5)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+3)}
                             ${aSeat(count+2)}
                        </span>
                    </div>
                </div>`
     $('#layout').append(coop);
     return (count+6);
 }