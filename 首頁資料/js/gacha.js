var FiveStarCounter = 0
var FourStarCounter = 0
var UPrate = 0.5
function setWeight(five,four){
    w1 = Math.min(1,0.006 + (five>73?0.06*(five-73):0)) 
    w2 = Math.min(1,0.051 + (four>8?0.51*(four-8):0)) 
    return [w1,w2]
}
function pick(){
    console.log(FiveStarCounter, FourStarCounter,UPrate)
    FiveStarCounter+=1
    FourStarCounter+=1
    let [FiveStarWeight, FourStarWeight ]= setWeight(FiveStarCounter,FourStarCounter)
    ThreeStarWeight = 0.943
    r = Math.random()
    if(r<FiveStarWeight){
        FiveStarCounter=0
        if(Math.random()<=UPrate){UPrate=0.5;return 6}
        UPrate=1
        return 5
    }else if(r-FiveStarWeight<FourStarWeight){
        FourStarCounter=0
        return 4
    }else{
        return 3
    }
}
function reset(){
    FiveStarCounter = 0
    FourStarCounter = 0
    UPrate = 0.5
}




