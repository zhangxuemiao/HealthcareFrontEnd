/**
 @Name：
 @Author：
 @version 1.0 2017-06-27
 */
$(function () {
    initCommonSenseDetail();
    bindEvent();
    
    function initCommonSenseDetail() {

        var localStorage = window.localStorage;
        var commonSense_id = localStorage.getItem('commonSense_id');
        var commonSenseTitle = localStorage.getItem('commonSenseTitle');

        var url = getFullUrl('showCommonSenseDetail/');
        var data = {
            "commonSense_id": commonSense_id,
            "title": commonSenseTitle
        };
        var options = {
            type: 'GET',
            url: url,
            dataType: "json",
            data: data,
            timeout: 4000,
            success: function (data) {
                var htmlData = data.htmlContent;
                $("#commonSenseDetail").html(htmlData);
            },
            error: function (data) {
                alert('网络异常！');
            }
        };
        $.ajax(options);
    }

    function bindEvent() {

        $('.showDiseaseDetail').on('click', function () {
            var disease_id = $(this).attr("disease_id");
            var department_name = $(this).attr("department_name");

            alert("disease_id->"+disease_id+",department_name->"+department_name);
            var url = getFullUrl('showDiseaseDetail/');
            alert(url);
            var options = {
                type: 'GET',
                url: url,
                dataType: "json",
                data: {},
                timeout: 4000,
                success: function (htmlData) {
                    $("#diseaseDetail").html(htmlData);
                },
                error: function (data) {
                    alert('网络异常！');
                }
            };
            $.ajax(options);

        });


        $('#gotohomepage').on('click', function () {
            window.open('./homepage.html', '_self');
        });

        $('.drugEvaluationCommit').on('click', function () {
            window.open('../drugEvaluation.html', '_self');
        });
    }
});