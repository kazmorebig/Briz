
window.addEventListener('load', ()=>{

    document.getElementById('run').addEventListener('click', (ev) => {
        document.getElementById('stop').removeAttribute('disabled');
        fetch('/start', {
            method: 'POST',
            body: new FormData(document.getElementById('run_form'))
        }).then((stream) => {
            const reader = stream.body.getReader();
            reader.read().then(function processData({done, value}) {
                if (!done) {
                    const r_time = new TextDecoder().decode(value)
                    console.log('Remaining time: ' + r_time);
                    document.getElementById('remaining_time').innerHTML = r_time;
                    reader.read().then(processData);
                }
                else {
                    console.log('Done');
                    document.getElementById('remaining_time').innerHTML = '0';
                    document.getElementById('stop').setAttribute('disabled', '');
                }
            })
        })
    });

    document.getElementById('stop').addEventListener('click', async () => {
        await fetch('/stop');
    })

    // fetch('/pms')
    //     .then((stream) => {
    //         const reader = stream.body.getReader();
    //         reader.read().then(function processData({done, value}) {
    //             console.log(new TextDecoder().decode(value));
    //             reader.read().then(processData);
    //         });
    //     })
})