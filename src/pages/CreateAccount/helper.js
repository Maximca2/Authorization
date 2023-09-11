export function isObject(value) {
    let valued = false;
    Object.values(value).forEach(it=>it.length<=2 ? valued : valued=true)

   if(Object.values(value).length<4 ||valued===false){
    return false
   }
   return true


}
  