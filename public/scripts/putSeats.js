 function createLayout(journeyClass){
    let classes = {
        chairCar : putSeatsCC,
        chairCarShatabdi:putSeatsCCShatabdi,
        secondSitting : putSeats2S,
        secondSittingJanShatabdi:putSeats2SJanShatabdi,
        secondTierAc : putSeats2AC,
        thirdTierAc : putSeats3AC,
        sleeper : putSeatsSleeper,
        executiveChairCar : putSeatsEC,
    }
    classes[journeyClass]();
 }
 
 function putSeatsSleeper(){
     $('#layout').css("width","50%");
     let totalCoops = 9;
     let count = 1;
     for(let i=1;i<=totalCoops;i++){
         count = addACoop3Tier(count);
     } 
 }

 function putSeats3AC(){
    $('#layout').css("width","50%");
    let totalCoops = 8;
    let count = 1;
    for(let i=1;i<=totalCoops;i++){
        count = addACoop3Tier(count);
    } 
}

function putSeats2AC(){
    $('#layout').css("width","50%");
    let totalCoops = 8;
    let count = 1;
    for(let i=1;i<=totalCoops;i++){
        count = addACoop2Tier(count);
    } 
}

function putSeats2S(){
    $('#layout').css("width","60%");
    let count = 1 ;
    for(let i =1;i<=9 ; i++){
        count = addACoop2S(count);
    }
}
function putSeats2SJanShatabdi(){
    $('#layout').css("width","60%");
    let count = 1;
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                            ${aSeat(count+4)}
                            ${aSeat(count+3)}
                            ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+1)}
                            ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
    count += 5;
    $('#layout').append(coop);
    for(let i =1;i<=7 ; i++){
        count = addACoop2SRowTop(count);
    }
    count = addMiddleCoop2S(count);
    for(let i =1;i<=7 ; i++){
        count = addACoop2SRowDown(count);
    }
    coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+4)}
                             ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
}

function putSeatsCCShatabdi(){
    $('#layout').css("width","50%");
    let count = 1;
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                            ${aSeat(count+3)}
                            ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+1)}
                            ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
    $('#layout').append(coop);
    count += 4 ;
    for(let i = 1 ; i <=6; i++){
        count = addACoopCCRowTop(count);
    }
    count = addMiddleCoopCC(count);
    for(let i = 1 ; i <= 6; i++){
        count = addACoopCCRowDown(count);
    }
    coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+3)}
                             ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
}

function putSeatsCC(){
    $('#layout').css("width","50%");
    let count = 1;
    let coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                            ${aSeat(count+3)}
                            ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+1)}
                            ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
    $('#layout').append(coop);
    count += 4 ;
    for(let i = 1 ; i <= 13; i++){
        count = addACoopCCRowDown(count);
    }
    coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+3)}
                             ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
}

function putSeatsEC(){
    $('#layout').css("width","50%");
    let count = 1 ;
    for(let i=1 ;i<=6;i++){
        count = addACoopECRowTop(count);
    }
    count = addMiddleCoopEC(count);
    for(let i=1 ;i<=6;i++){
        count = addACoopECRowDown(count);
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
                </div>`;
     $('#layout').append(coop);
     return (count+8);
 }

 function addACoop2S(count)
 {
     let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                            ${aSeat(count+5)}
                            ${aSeat(count+4)}
                            ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                    <div class="row2 clearfix">
                        <span class="side">
                            ${aSeat(count+11)}
                            ${aSeat(count+10)}
                            ${aSeat(count+9)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+8)}
                             ${aSeat(count+7)}
                             ${aSeat(count+6)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+12);
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
                </div>`;
     $('#layout').append(coop);
     return (count+6);
 }

 function addACoop2SRowTop(count)
 {
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                             ${aSeat(count+5)}
                             ${aSeat(count+4)}
                             ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+6);
 }
 function addACoop2SRowDown(count)
 {
    let coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+5)}
                             ${aSeat(count+4)}
                             ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+6);
 }

 function addMiddleCoop2S(count)
 {
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                            ${aSeat(count+5)}
                            ${aSeat(count+4)}
                            ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+2)}
                            ${aSeat(count+1)}
                            ${aSeat(count+0)}
                        </span>
                    </div>
                    <div class="row2 clearfix">
                        <span class="side">
                            ${aSeat(count+11)}
                            ${aSeat(count+10)}
                            ${aSeat(count+9)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+8)}
                            ${aSeat(count+7)}
                            ${aSeat(count+6)}
                        </span>
                    </div>
                </div>`;
    $('#layout').append(coop);
    return (count+12);
 }

 function addMiddleCoopCC(count)
 {
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                            ${aSeat(count+4)}
                            ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+2)}
                            ${aSeat(count+1)}
                            ${aSeat(count+0)}
                        </span>
                    </div>
                    <div class="row2 clearfix">
                        <span class="side">
                            ${aSeat(count+9)}
                            ${aSeat(count+8)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+7)}
                            ${aSeat(count+6)}
                            ${aSeat(count+5)}
                        </span>
                    </div>
                </div>`;
    $('#layout').append(coop);
    return (count+10);
 }

 function addACoopCCRowDown(count)
 {
    let coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+4)}
                             ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+5);
 }

 function addACoopCCRowTop(count)
 {
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                             ${aSeat(count+4)}
                             ${aSeat(count+3)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+2)}
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+5);
 }

 function addACoopECRowTop(count)
 {
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                             ${aSeat(count+3)}
                             ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+4);
 }

 function addACoopECRowDown(count)
 {
    let coop = `<div class="coop">
                    <div class="row2 clearfix">
                        <span class="side">
                             ${aSeat(count+3)}
                             ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                             ${aSeat(count+1)}
                             ${aSeat(count+0)}
                        </span>
                    </div>
                </div>`;
     $('#layout').append(coop);
     return (count+4);
 }

 function addMiddleCoopEC(count)
 {
    let coop = `<div class="coop">
                    <div class="row1 clearfix">
                        <span class="side">
                            ${aSeat(count+3)}
                            ${aSeat(count+2)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+1)}
                            ${aSeat(count+0)}
                        </span>
                    </div>
                    <div class="row2 clearfix">
                        <span class="side">
                            ${aSeat(count+7)}
                            ${aSeat(count+6)}
                        </span>
                        <span class="normal">
                            ${aSeat(count+5)}
                            ${aSeat(count+4)}
                        </span>
                    </div>
                </div>`;
    $('#layout').append(coop);
    return (count+8);
 }