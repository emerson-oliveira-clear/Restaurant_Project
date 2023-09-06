
var conn = require('./db')
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

                    `INSERT INTO tb_users (name  ,email,people,date,time)
                VALUES(?,?,?,?,?)   
               `
                params = [
                    fields.name,
                    fields.email,
                    fields.people,
                    fields.date,
                    fields.time
                
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