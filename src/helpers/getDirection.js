

export const getDirection = (lat1,lng1,lat2,lng2) => {

  var dLon = (lng2-lng1);
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  var brng = toDeg(Math.atan2(y, x));
  return 360 - ((brng + 360) % 360);
}
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  function toDeg(rad) {
    return rad * 180 / Math.PI;
}