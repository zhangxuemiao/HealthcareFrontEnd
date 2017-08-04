/**
 @Name：
 @Author：
 @version 1.0 2017-06-27
 */
$(function () {
    initCommonSenseRecords();
    bindEvent();
    
    function initCommonSenseRecords() {
        var url = getFullUrl('showAllCommonSenseRecords/');
        var options = {
            type: 'GET',
            url: url,
            dataType: "json",
            data: {},
            timeout: 4000,
            success: function (data) {
                initTpl(data, $("#firstAid_commonSense_template"), $("#firstAid_commonSense_view"),bindEvent);
            },
            error: function (data) {
                alert('网络异常！');
            }
        };
        $.ajax(options);
    }

    function bindEvent() {

        $('.showCommonSenseDetail').on('click', function () {
            var commonSense_id = $(this).attr("commonSense_id");
            var commonSenseTitle = $(this).attr("commonSenseTitle");

            alert("commonSense_id->"+commonSense_id+",commonSenseTitle->"+commonSenseTitle);

            var localStorage = window.localStorage;
            localStorage.setItem('commonSense_id',commonSense_id);
            localStorage.setItem('commonSenseTitle',commonSenseTitle);

            window.open('./commonSenseDetail.html', '_self')
        });



        $('#checkListCreateBtn').on('click', function () {
            window.open('../checkListCreate.html', '_self');
        });

        $('.drugEvaluationCommit').on('click', function () {
            window.open('../drugEvaluation.html', '_self');
        });
    }

    /**
     * 获取医生的所有信息
     */
    function getAllInformationById() {
        var defer = $.Deferred();
        var urlDoctor = getFullUrl('api/mobile/doctor/getAllDoctor.do');
        var options = {
            url: urlDoctor,
            dataType: "JSONP",
            success: function (doctor) {
                if (doctor.result == 1) {
                    var doctorJsonList = doctor.data;
                    for (var i = 0; i < doctorJsonList.length; i++) {
                        if (doctorJsonList[i].doctor_id == doctorID) {
                            defer.resolve(doctorJsonList[i]);
                            break;
                        }
                    }
                }
            }
        };
        $.ajax(options);
        return defer.promise();
    }

    /**
     * 提交用户修改的信息，更新医生用户
     */
    function submitChanges() {

        $.when(getAllInformationById()).done(function (doctorInfoByID) {
            var dataAjax = new Object();
            // dataAjax.reg_name = $('#userName').val();
            dataAjax.password = $('#password').val();
            // dataAjax.confirm_password = $('#confirmPassword').val();
            dataAjax.goodAt = $('#goodAt').val();
            dataAjax.profile = $('#selfIntroduction').val();
            dataAjax.doctor_id = doctorInfoByID.doctor_id;
            dataAjax.oldPassword = doctorInfoByID.password;
            // dataAjax.type = doctorInfoByID.type;
            // dataAjax.hospital = doctorInfoByID.hospital;
            // dataAjax.real_name = doctorInfoByID.real_name;
            // dataAjax.sex = doctorInfoByID.sex;
            // dataAjax.title = doctorInfoByID.title;
            // dataAjax.department = doctorInfoByID.department;

            // if (checkInfo(dataAjax)) {
            // delete dataAjax.confirm_password;
            updateDoctor(dataAjax);
            // }
        });
    }

    /**
     *判断字符串是否包含中文
     */
    function includeChinese(str) {
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) > 0x4E00 && str.charCodeAt(i) < 0x9FA5) {
                return true;
            }
        return false;
    }

});