const esBisiesto = (year) => {
    return year/4;
}

const months= [{value:"01", name: "Jan"}, {value:"02", name: "Feb"}, {value:"03", name: "Mar"}, {value:"04", name: "Apr"}, {value:"05", name: "May"}, {value:"06", name: "Jun"}, {value:"07", name: "Jul"}, {value:"08", name: "Aug"}, {value:"09", name: "Sep"}, {value:"10", name: "Oct"}, {value:"11", name: "Nov"}, {value:"12", name: "Dec"}]

const dia= "30"
let mes= "Jun"
let mesString= mes
const anio= "2020"

let releaseDate= `${mes} ${dia} ${anio}`

for (periodo of months) {
    if(mes == periodo.name) {
        mes=  parseInt(periodo.value)
    }
}

let object = {
    dia: parseInt(dia),
    mes: mes,
    anio: parseInt(anio)
}

console.log(`Fecha de lanzamiento pelicula: ${releaseDate} (debemos correrlo un dia hacia adelante)`)

if(object.dia<=27) {
    object.dia ++
    console.log("dia <= 27")
} else { 
    switch (object.dia) {
        case 28:
            if (object.mes == 2) {
                if(object.anio%4==0) {
                    object.dia ++

                    console.log("dia = 28, es Febrero, año bisiesto")
                } else {
                    object.dia= 1
                    object.mes= 3

                    console.log("dia = 28, es Febrero, año no bisiesto")
                }
            } else {
                object.dia ++  
                console.log("dia = 28, no es Febrero")
            }
            break
        case 29:
            if (object.mes == 2) {
                object.dia= 1
                object.mes= 3
                console.log("dia = 29, es Febrero")
            } else {
                object.dia ++
                console.log("dia = 29, no es Febrero")
            }
            break
        case 30:       
            if(object.mes==4 || object.mes==6 || object.mes==9 || object.mes==11) {
                object.dia= 1    
                object.mes ++
                console.log("dia = 30, es Abril, Junio, Septiembre o Noviembre")
            } else {
                object.dia ++
                console.log("dia = 30, no es ni Abril, ni Junio, ni Septiembre ni Noviembre")
            }
            break
        case 31:
            if (object.mes == 12) {
                object.dia= 1
                object.mes= 1
                object.anio ++
                console.log("Es 31 de Diciembre")
            } else {
                object.dia= 1    
                object.mes ++
                console.log("No es Diciembre así que tranqui")
            }
            break   
    }
}

console.log(object);



/* let diaNumber= parseInt(dia)

let mesNumber= parseInt(mes)
let anioNumber= parseInt(anio);
console.log(diaNumber);
console.log(mesNumber);
console.log(anioNumber);

let month= releaseDate.slice(0,3)
console.log("mes: " + month);

let day= releaseDate.slice(4,6)
console.log("dia: " + day);

const year= releaseDate.slice(7,11)
console.log("año: "+year);

if(day<=27) {
    day= parseInt(day)+1
} else {
    if (month== "28") { */

    
    /* 
    28 -> Febrero?
        Si Febrero -> año bisiesto?

    */

// Mar 27 2021

/* let month= releaseDate.slice(0,3)
console.log("mes: " + month); */



/* 
dia= 28
if(febrero) {
    

} else if (31) {

}

*/




/* let day= releaseDate.slice(4,6)
console.log(day);
console.log(day.length);
day= parseInt(day)+1
day= `0${day+1}`
day= `0${day}`

console.log("dia: " + day);
            
const year= releaseDate.slice(7,11)
console.log("año: "+year);

for (mes of months) {
if(month == mes.name) {
    month= mes.value
}

}

console.log("mes numerico: "+month); 


const releaseDateString= (`${year}-${month}-${day}`)  
console.log(releaseDateString); */