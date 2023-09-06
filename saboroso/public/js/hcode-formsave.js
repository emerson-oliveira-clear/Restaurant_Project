HTMLFormElement.prototype.save = function () {

    let form = this;

    return new Promise((resolve, reject) => {

        form.addEventListener('submit', e => {

            e.preventDefault();

            let formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                credentials: 'include',
                body: formData
            })
                .then(response => response.json())
                .then(json => {

                    resolve(json)

                }).catch(err =>{

                    reject(err)
                })

        });

    })

}