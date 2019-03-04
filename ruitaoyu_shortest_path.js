Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

Array.min = function( array ){
    var min =1000;
    var result = [];
    var num = 100;
    if(num > array[0]){
        min = "left";
        num = array[0];
    } 
    if(num > array[1]){
        min = "top";
        num = array[1];
    } 
    if(num > array[2]) {
        min = "right";
        num = array[2];
    } 
    if(num > array[3]) {
        min = "bot";
        num = array[3];
    } 

    return [min,num];
};
var map = [

                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    
                [0,5,5,6,5,5,5,5,0,5,5,5,5,0,5,5,5,5,5,0],
    
                [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
    
                [0,5,0,0,0,0,0,8,8,8,8,0,0,0,0,0,0,0,5,0],
    
                [0,0,0,0,0,0,0,8,8,8,8,0,0,0,0,0,0,0,0,0],
    
                [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
    
                [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
    
                [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
    
                [0,5,5,5,5,5,5,5,5,0,7,7,7,7,0,5,5,5,5,0],
    
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    
    
    
            ]


// Array.from(Array(100).keys());

// var runThisNumOfTime = 100;

// var rowList = Array.from(Array(8).keys());
// var columnList = Array.from(Array(19).keys());
//     //    var num = numList.random();

// while(runThisNumOfTime !=0) {
//     console.log(ruitaoyu_shortest_path(map, [rowList.random(),columnList.random()], [rowList.random(),columnList.random()]));
//     runThisNumOfTime--;
// }





function ruitaoyu_shortest_path(map, src, des){
    //console.log("the src is " + src + "the des is " + des)

    if(src[0] == des[0] && src[1] == des[1]){
        return 0;
    }

    var mapCopy = [
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
                ];

    for(var i = 0; i< map.length; i++){
        for(var j = 0; j< map[i].length; j++){
            if(map[i][j] !=0) mapCopy[i][j] = 'x'
            else mapCopy[i][j] = '0';
        }   
    }

    // console.dir(map);
    //console.dir(mapCopy);

    
    var dis = 0;
    var currentSpots = [];
    currentSpots.push(src);
    mapCopy[src[0]][src[1]] = "-1";
    mapCopy[des[0]][des[1]] = "1000";
    while(currentSpots.length != 0) {
        var temp = [];
        for(var i = 0; i < currentSpots.length ; i++){

            var spot = currentSpots[i];
           if(spot[0]-1 < 0 ||
                mapCopy[spot[0]-1][spot[1]] != 0) {
           } else {
               mapCopy[spot[0]-1][spot[1]] = dis+1;
               temp.push([spot[0]-1,spot[1]]);
           }
       
           if(spot[0]+1 > 9 ||
               mapCopy[spot[0]+1][spot[1]] != 0) {
          } else {
              mapCopy[spot[0]+1][spot[1]] = dis+1;
              temp.push([spot[0]+1,spot[1]]);
          }
       
          if(spot[1]-1 <0 ||
               mapCopy[spot[0]][spot[1]-1] != 0) {
           } else {
                mapCopy[spot[0]][spot[1]-1] = dis+1;
               temp.push([spot[0],spot[1]-1]);
           }
       
           if(spot[1]+1 >19 ||
               mapCopy[spot[0]][spot[1]+1] != 0) {
           } else {
            mapCopy[spot[0]][spot[1]+1] = dis+1;
               temp.push([spot[0],spot[1]+1]);
           }
        }
        dis++;
        currentSpots = temp;
    }

    //return findSurrurandingLowest(mapCopy, [6,6]);
    return recovery(mapCopy,src,des);
    
}

function recovery(mapCopy, src, des){

    var trail = [];
    var currentspot = des;
    var dirs = [39, 40, 37, 38];
    var dir;
    var temp;
    var min = 100;

    var runtime = findSurrurandingLowest(mapCopy, des);

    while(runtime != 0){
        var result = findSurrurandingLowest(mapCopy, currentspot);
        if(result[1] == -1) {
            if(result[0] == "left") {
                return "right";
            } else if (result[0] == "right") {
                return "left";
            } else if (result[0] == "top") {
                return "bot";
            } else if (result[0] == "bot") {
                return "top";
            }
        } else if(result[0] == "left") {
            currentspot = [currentspot[0], currentspot[1]-1];
        } else if (result[0] == "top") {
            currentspot = [currentspot[0]-1, currentspot[1]];
        } else if (result[0] == "right") {
            currentspot = [currentspot[0], currentspot[1]+1];
        } else {
            if(result[0] == "bot"){
                currentspot = [currentspot[0]+1, currentspot[1]];
            } else {
                console.log("This should not print!")
            }
        }
        runtime--;
    }
}

function  findSurrurandingLowest(mapCopy, spot) {

    var left, top, right, bot;
    try {
        left = mapCopy[spot[0]][spot[1]-1];
    }catch(err) {
    }

    try {
        top = mapCopy[spot[0]-1][spot[1]];
    }catch(err) {
    }

    try {
        right = mapCopy[spot[0]][spot[1]+1];
        
    }catch(err) {
    }

    try {
        bot= mapCopy[spot[0]+1][spot[1]];
        
    }catch(err) {
    }

    //console.log([left,top,right,bot]);
    //console.log(Array.min([left,top,right,bot]))
    return Array.min([left,top,right,bot]);
}

