
var conn = require('./db')
const moment = require('moment')
module.exports = {

    render(req,res,error){

        res.render('admin/login',{

            body: req.body,
            error

        })

    },

    login(email, password){

        return new Promise((resolve,reject) =>{

            conn.query(
            `
                SELECT * FROM tb_users WHERE email = ?
            `
            ,[
                email
            ],(err,results)=>{

                if(err){

                    reject(err);

                }else{  
                    
                    if(!results.length > 0){ 
                        reject('Usuario ou senha incorretos.');
                    }else{

                        let row = results[0];
                        
                        if(row.password !== password){

                            reject('Usuario ou senha incorretos.')

                        }else{

                            resolve(row)
                        }

                        
                    }

                }

            })

        })

    },

    getUsers() {

        return new Promise((resolve, reject) => {

            conn.query(
                `SELECT * FROM tb_users ORDER BY id  `
                , (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results)
                });
        })

    },

    delete(id) {

        return new Promise((resolve, reject) => {
    
          conn.query('DELETE FROM tb_users WHERE id = ?', [id], (err, results) => {
    
            if (err) {
              reject(err);
            } else {
              resolve(results)
            }
    
          })
      
        })
    
      },

      save(fields) {

        return new Promise((resolve, reject) => {

            console.log('fields:', fields)

            let date;
            
            if(fields.date){

                date = fields.date.split('-')
                fields.date = `${date[0]}-${date[1]}-${date[2]}`;
            }
            else{
                console.log('Fields date nao existe')

                console.log('new date:', moment(new Date()).format('YYYY-MM-DD'))
                fields.date = moment(new Date()).format('YYYY-MM-DD')

                date = new Date()
                let hours = date.getHours();
                let minutes =date.getMinutes();
                let seconds = date.getSeconds()

                fields.time = `${hours}-${minutes}-${seconds}`
                console.log('Fields time:', fields.time)
            }

            let query, params
            if (parseInt(fields.id) > 0) {

                if(fields.password){

                    query = `
                    UPDATE tb_users
                    SET
                    password = ?
                    WHERE id = ?
                    `;
                    params=[fields.password, fields.id]
    

                }else{

                    query = `
                    UPDATE tb_users
                    SET
                        name = ?,
                        email = ?
                    WHERE id = ?
                    `;
                    params = [

                        fields.name,
                        fields.email
                    ]
        
                    params.push(fields.id)
                    
                }


            } else {

                query =

                    `INSERT INTO tb_users (name, email, password, register) VALUES(?,?,?,?)`
                params = [
                    fields.name,
                    fields.email,
                    fields.password,
                    new Date()
                ]

            }


            conn.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },


}