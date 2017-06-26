var data = {}

export default async function get(keyPath, getMethod, options){
  var {parent,finalKey} = getObjectPath(data,keyPath)

  if(parent[finalKey]){
    return Promise.resolve(parent[finalKey])
  }
  
  parent[finalKey] = await getMethod()

  return parent[finalKey]
}

function getObjectPath(obj,keyPath,autoCreate=true){
  var keys = keyPath.split('.')
  var finalKey = keys.pop()
  var parent = keys.reduce((obj,key)=>{
    if(obj === false){
      return false
    }else if(obj[key]){
      return obj[key]
    }else if(autoCreate){
      obj[key] = {}
      return obj[key]
    }else{      
      return false
    }
  },obj)
  return {parent,finalKey}
}