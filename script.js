window.onload = function () {
    $.ajax({
        type: 'GET',
        url: 'http://igreja.patobranco.tec.br:81/api/igreja/read_last_status.php',
        success: function (result) {
            // Convert json to string
            let jsonData = JSON.stringify(result);
            // Converts the data to js object
            let status = JSON.parse(jsonData);
            lastStatus = status;

            console.log(lastStatus);
        }
    });
}