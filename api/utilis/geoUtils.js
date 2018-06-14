//This file is used for utils function with coordinates
var rad2deg = require('rad2deg');
var deg2rad = require('deg2rad');
//Math var
var acos = Math.acos;
var cos = Math.cos;
var sin = Math.sin;
var atan2 = Math.atan2;
var sqrt = Math.sqrt;

/**
 * 
 * @param {Number} lat1 - first point lat
 * @param {Number} lat2 - second point lat
 * @param {Number} long1 - first point long
 * @param {Number} long2 - second point long
 * @returns {Number} - destance between 2 point (KM)
 * @author Martin Allimonier <martin@noosys.fr>
 */
module.exports.computeDistanceBetween2Point = function(lat1, lat2, long1, long2){
    const R = 6371 // Earth Radius
    var dlat = deg2rad(lat1 - lat2);
    var dlong = deg2rad(long1 - long2);

    var a = sin(dlat/2) * sin(dlat/2) + cos(deg2rad(lat1)) * cos(deg2rad(lat2)) * sin(dlong/2) * sin(dlong/2);
    var c = 2*atan2(sqrt(a), sqrt(1-a));
    var d = R*c;
    return d;
}