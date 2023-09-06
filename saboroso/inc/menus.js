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
  async getPhotoById(fields) {

    return new Promise((s, f) => {
      let query = 'SELECT * FROM tb_menus WHERE id = ?';
      let params = [
        fields.id
      ]
      conn.query(query, params, (err, result) => {
        if (err) {
          f(err);
        }
        else {
          s(result);
        }

      })
    })
  }
  ,
  async save(fields, files) {
    console.log('Fields:', fields)
    console.log('FIles:', files)
    let query, params;


    if (Object.keys(files).length === 0) {


      await this.getPhotoById(fields).then(result => {

        fields.photo = result[0].photo

      })

    }


    else if (files.filepath) {
      fields.photo = `images/${files.newFilename}`
    }



    if (parseInt(fields.id) >= 0) {


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
  },

  delete(id) {

    return new Promise((resolve, reject) => {

      conn.query('DELETE FROM tb_menus WHERE id = ?', [id], (err, results) => {

        if (err) {
          reject(err);
        } else {
          resolve(results)
        }

      })
  
    })

  }



}