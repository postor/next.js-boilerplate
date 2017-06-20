export default function(path,req){
  return req?req.protocol + '://' + req.get('host') + path : path  
}