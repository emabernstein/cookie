const baseState = {
    numCookies: 0,
    cps: 0,
    clickValue: 1,
    buildings: {
        cursor: {
            baseCps: 0.1,
            baseCost: 15,
            numBuildings: 0,
        },
        grandma: {
            baseCps: 1,
            baseCost: 100,
            numBuildings: 0
        },
        farm: {
            baseCps: 8,
            baseCost: 1100,
            numBuildings: 0
        },
        mine: {
            baseCps: 47,
            baseCost: 12000,
            numBuildings: 0
        },
        factory: {
            baseCps: 260,
            baseCost: 130000,
            numBuildings: 0
        },
        bank: {
            baseCps: 1400,
            baseCost: 1400000,
            numBuildings: 0
        },
        irs: {
            baseCps: 7800,
            baseCost: 20000000,
            numBuildings: 0
        },
        state: {
            baseCps: 44000,
            baseCost: 330000000,
            numBuildings: 0
        },
        dasKapital: {
            baseCps: 260000,
            baseCost: 5100000000,
            numBuildings: 0
        },
    }
}

const state = JSON.parse(localStorage.getItem('state')) || baseState

function cookieClicking() {
    state.numCookies += state.clickValue
    updateCookies()
}

function updateCookies() {
    document.querySelector(".subtitle").innerHTML=[Math.floor(state.numCookies), "Cookies"].join(" ")
}

function buy(buildingName){
    const building = state.buildings[buildingName]
    if (! building){
        return
    } 
    const buildingCost = cost(building.baseCost, building.numBuildings)
    if(buildingCost < state.numCookies){
        state.numCookies -= buildingCost
        building.numBuildings ++
        state.cps += building.baseCps
        updateShops()
    }
}

function cost(baseCost, numBuildings){
    const multiplier = Math.pow(1.15, numBuildings)
    return Math.ceil(baseCost * multiplier)
}

function updateShops() {
    document.querySelector(".subtitle2").innerHTML=[Number(state.cps).toFixed(3), "Cookies/Click"].join(" ")
    const prices = document.querySelectorAll(".shop__text--price")
    const rates = document.querySelectorAll(".shop__rate")
    const nums = document.querySelectorAll(".shop__number")
    const buildings = Object.values(state.buildings)
    for(let i =0; i<buildings.length;i++){
        prices[i].innerHTML = `$${cost(buildings[i].baseCost, buildings[i].numBuildings)}`
        rates[i].innerHTML = `${(Number(buildings[i].numBuildings)*Number(buildings[i].baseCps)).toFixed(3)} cps`
        nums[i].innerHTML = buildings[i].numBuildings
    }
}


(function main() {
    setInterval(() => {
        localStorage.setItem("state", JSON.stringify(state))
    }, 5000);
    setInterval(() => {
        updateShops()
        state.numCookies+=state.cps
        updateCookies()
    }, 1000);
    updateCookies()
})()