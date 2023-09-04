let conn = require('./db')
let path = require('path')

module.exports = {

    getMenus() {

        return new Promise((resolve, reject) => {

            conn.query(
            `SELECT * FROM tb_menus ORDER BY title  `  
           , (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results)
            });
        }) 

    },

    async save(fields, files) {
        console.log('CHEGOU EM SAVE')
        let query, params;
        //Verifies if 'files' is empty
        if (Object.keys(files).length === 0) {
          //if it's empty, then search in db the current photo src and atributtes it to fields.photo
          await this.getPhotoById(fields).then(result => {
            fields.photo = result[0].photo
          })
        }
        //If the 'files' has the property filepath, then  attributtes directly to fields.photo the
        else if (files.filepath) {
          fields.photo = `images/${files.newFilename}`
        }
        //verifies if fields.id is bigger than 0, this specifies if we are creating or updating a query
        if (parseInt(fields.id) >= 0) {
          //UPDATE
          query = 'UPDATE tb_menus SET title = ?, description = ?, price = ?, photo = ? WHERE id = ?'
          params = [
            fields.title,
            fields.description,
            fields.price,
            fields.photo,
            fields.id
          ]
        }
        else {
          //INSERT
          query = "INSERT INTO tb_menus (title, description, price, photo) VALUES (?, ?, ? ,?)"
          params = [
            fields.title,
            fields.description,
            fields.price,
            fields.photo
          ]
        }
        return new Promise((resolve, reject) => {
          conn.query(query, params, (err, result) => {
            if (err) {
              reject(err)
            }
            else {
              resolve(result)
            }
          })
        })
      }

}