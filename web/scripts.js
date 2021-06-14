window.addEventListener('load', ()=>{
    const power_range_element = document.getElementById('power')
    const stream_decoder = new TextDecoder();
    const status_socket = new WebSocket(`ws://${location.host}/status`);
    status_socket.onmessage = (ev => {
        const status = JSON.parse(ev.data);
        if (status.hasOwnProperty('triac'))
        {
            power_range_element.value = status.triac.target
            console.log(status.triac.target);
        }

    })


    power_range_element.addEventListener('change', async (ev) => {
        const response = await fetch('/power', {
                method: 'PUT',
                body: JSON.stringify({'power': ev.target.value})
            });
    })

    document.getElementById('run').addEventListener('click', (ev) => {
        fetch('/start', {
            method: 'POST',
            body: new FormData(document.getElementById('run_form'))
        })
    });

    document.getElementById('stop').addEventListener('click', async () => {
        await fetch('/stop');
    })



    // new Promise(async () => {
    //     const data = {
    //       datasets: [{
    //           label:'PMS 5003',
    //           backgroundColor: 'rgb(255, 99, 132)',
    //           borderColor: 'rgb(255, 99, 132)',
    //           data: [],
    //       }]
    //     };
    //     const plot_config = {
    //         type: 'bar',
    //         data,
    //         options: {}
    //     }
    //     const pms_chart = new Chart(document.getElementById('pms_info'), plot_config);
    //     const stream = await fetch('/pms');
    //     const reader = stream.body.getReader();
    //     while (1) {
    //         const result = await reader.read();
    //         const pms_data = JSON.parse(new TextDecoder().decode(result.value));
    //         pms_chart.data.datasets[0].data = pms_data;
    //         pms_chart.update();
    //     }
    // })
})