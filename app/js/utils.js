/**
 * Created by Akinsete on 6/2/17.
 */
window.showLoading = function () {
    swallowLoading({element: 'swallow', show: true});
};


window.hideLoading = function () {
    swallowLoading({element: 'swallow', show: false});
};



function apiConnect(params,callBackData,hideLoading) {

    // $.ajaxSetup({
    //     headers: {"Access-Control-Request-Headers": "Content-Type"},
    // });

    logMessage(hideLoading);

    $.ajax({
        beforeSend:function (xhr) {
            if(!hideLoading){
                swallowLoading({element:'swallow',show:true});
            }
            xhr.setRequestHeader("Authorization", "Basic " + params.api_key);
            xhr.setRequestHeader("Content-Type", 'application/json');
            //xhr.setRequestHeader("Authorization", "Basic " + params.api_key);

        },
        url: params.base_url + params.endpoint,
        type: params.request_type,
        data: params.data,
        dataType: "json",
        crossDomain: true,
        //headers: {'access-control-allow-headers': 'Content-Type, Authorization','Authorization': "Basic " + params.api_key, 'Content-Type':'application/json'},
        success: function (data) {
            callBackData(data);
        },
        error: function (e) {
            callBackData({error: e});
            if(!hideLoading) {
                swallowLoading({element: 'swallow', show: false});
            }
        },
        complete:function () {
            if(!hideLoading) {
                swallowLoading({element: 'swallow', show: false});
            }
        },
        fail:function (e) {
            Materialize.toast('e',2000);
            if(!hideLoading) {
                swallowLoading({element: 'swallow', show: false});
            }
        }
    });

}
