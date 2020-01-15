// Aqui primero escribimos nuestros test y luego cresamos el codigo correspondiente
// para que los pasara felizmente

function buildMessage(entity, action){
  if(action === 'list'){
    return `${entity}s ${action}ed`;
  }
  return `${entity} ${action}d`
}

module.exports = buildMessage
