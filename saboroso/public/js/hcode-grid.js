class HcodeGrid {

    constructor(configs) {

        this.options = config;
        


    }

}

initForms(){

    let formCreate = document.querySelector(this.options.formCreate);

    formCreate.save().then(json => {
        window.location.reload()
    }).catch(err => {
        console.log(err)
    })
    //------------------------------------------------------

    let formUpdate = document.querySelector(this.options.formUpdate);
    formUpdate.save().then(json => {
        window.location.reload()
    }).catch(err => {
        console.log(err)
    })

}

iniButtons(){

    document.querySelectorAll(this.options.btnUpdate).forEach(btn => {
        btn.addEventListener('click', e => {
            let tr = e.composedPath().find(el => {
                return (el.tagName.toUpperCase() === 'TR');
            });
            let data = JSON.parse(tr.dataset.row);
            for (let name in data) {
                let input = formUpdate.querySelector(`[name=${name}]`);
                switch (name) {
                    case 'date':
                        if (input) input.value = moment(data[name]).format('YYYY-MM-DD')
                        break
                    default:

                        if (input) input.value = data[name]
                }
            }
            $(` #modal-update`).modal('show');
        });
    });

    document.querySelectorAll(this.options.btnDelete).forEach(btn => {
        btn.addEventListener('click', e => {
            let tr = e.composedPath().find(el => {
                return (el.tagName.toUpperCase() === 'TR');
            });
            let data = JSON.parse(tr.dataset.row);
            if (confirm(options.deleteMsg)) {
               
                fetch(this.options.deleteUrl, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log('json', json)
                        window.location.reload();
                    });
            }
        });
    });

}
