const movie_releaseDate = (string) => {
    const months= [{value:"01", name: "Jan"}, {value:"02", name: "Feb"}, {value:"03", name: "Mar"}, {value:"04", name: "Apr"}, {value:"05", name: "May"}, {value:"06", name: "Jun"}, {value:"07", name: "Jul"}, {value:"08", name: "Aug"}, {value:"09", name: "Sep"}, {value:"10", name: "Oct"}, {value:"11", name: "Nov"}, {value:"12", name: "Dec"}]

    string= string.toString()
    let month= string.slice(4,7)
    for (period of months) {
        if(month == period.name) {
            month=  parseInt(period.value)
        }
    }
    let object = {
        day: parseInt(string.slice(8,10)),
        month,
        year: parseInt(string.slice(11,15)),
    }

    if(object.day<=27) {
        object.day ++
        // console.log("day <= 27")
    } else { 
        switch (object.day) {
            case 28:
                if (object.month == 2) {
                    if(object.year%4==0) {
                        object.day ++
                        // console.log("day = 28, es Febrero, año bisiesto")
                    } else {
                        object.day= 1
                        object.month= 3

                        // console.log("day = 28, es Febrero, año no bisiesto")
                    }
                } else {
                    object.day ++  
                    // console.log("day = 28, no es Febrero")
                }
                break
            case 29:
                if (object.month == 2) {
                    object.day= 1
                    object.month= 3
                    // console.log("day = 29, es Febrero")
                } else {
                    object.day ++
                    // console.log("day = 29, no es Febrero")
                }
                break
            case 30:       
                if(object.month==4 || object.month==6 || object.month==9 || object.month==11) {
                    object.day= 1    
                    object.month ++
                    // console.log("day = 30, es Abril, Junio, Septiembre o Noviembre")
                } else {
                    object.day ++
                    // console.log("day = 30, no es ni Abril, ni Junio, ni Septiembre ni Noviembre")
                }
                break
            case 31:
                if (object.month == 12) {
                    object.day= 1
                    object.month= 1
                    object.year ++
                    // console.log("Es 31 de Diciembre")
                } else {
                    object.day= 1    
                    object.month ++
                    // console.log("No es Diciembre así que tranqui")
                }
                break   
        }
    }

    if(object.day<10) {
        object.day= `0${object.day}`
    }

    if(object.month<10) {
        object.month= `0${object.month}`
    }

    // console.log(object);
    // { day: 29, month: 2, year: 2020 }
    // value="2022-08-05"
    string= `${object.year}-${object.month}-${object.day}`
    return string
}

module.exports= movie_releaseDate

/*
middleware de Mameli

function adminUser(req, res, next) {
	let logged = req.session.userLogged;
	if((!logged) || (logged.admin == 0)){
		res.redirect ("/product")
	}
	next();
}
*/