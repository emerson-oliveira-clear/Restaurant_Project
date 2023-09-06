const connection = require("./db")

module.exports = {

    getEmails(){
        return new Promise((s,f)=>{
            connection.query('SELECT * FROM tb_emails', (err, result)=>{

                if(err){
                    f(err);
                }
                else{
                    s(result);
                }
            })
        })
        
    },

    delete(id) {

        return new Promise((resolve, reject) => {
          id = id.replace(':', "");
          connection.query('DELETE FROM tb_emails WHERE id = ?', [id], (err, results) => {
    
            if (err) {
              reject(err);
            } else {
              resolve(results)
            }
    
          })
      
        })
    
      }

}