/**
 @Name：
 @Author：
 @version 1.0 2017-06-27
 */
$(function () {
    initAllDepartmentDiseases();
    bindEvent();
    
    function initAllDepartmentDiseases() {
        var url = getFullUrl('showAllDepartmentDiseases/');
        var options = {
            type: 'GET',
            url: url,
            dataType: "json",
            data: {},
            timeout: 4000,
            success: function (data) {
                initTpl(data, $("#department_disease_templet"), $("#department_disease_view"),bindEvent);
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

            var localStorage = window.localStorage;
            localStorage.setItem('disease_id',disease_id);
            localStorage.setItem('department_name',department_name);

            window.open('./diseaseDetail.html', '_self')
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