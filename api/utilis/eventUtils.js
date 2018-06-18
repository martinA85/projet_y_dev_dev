'use strict';

/**
 * @description function that check if an event is still valid or not with his validation list
 * @param {JSONCollection} lstValidations - Validations list of an event
 * @returns {Boolean}
 * @author Martin Allimonier <martin@noosys.fr>
 */
exports.checkIfValid = function(lstValidations){
    console.log("checkIfValid");
    
    if(lstValidations.length > 15){
        let goodCount = 0;
        let badCount = 0;
        for(let i=0; i<lstValidations.length;i++){
            if(lstValidations[i].good){
                goodCount += 1;
            }else{
                badCount +=1;
            }
        }
        let ratio = goodCount / badCount
        if(ratio <= 0.25){
            console.log("false : " + ratio);
            return false
        }else{
            console.log("true : " + ratio);
            return true
        }
    }else{
        return true;
    }
}