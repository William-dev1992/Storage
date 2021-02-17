
export default {
  itens: [
    
  ],

  getAll(){
    return this.itens
  },

  newItem(nome, quantidade, data){
    this.itens.push({id:generateID(), nome, quantidade, data});
  },

  del(id) {
    var itemDel = this.itens.findIndex(item => item.id === id)
    this.itens.splice(itemDel, 1)
  },

  edit(id){
    var itemToEdit = this.itens.filter(item => item.id === id)
    return itemToEdit
  }
}

function generateID(){
  return Math.random().toString(36).substr(2,9);
}
