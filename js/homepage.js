/**
 @Name：
 @Author：
 @version 1.0 2017-06-27
 */
$(function () {
    initAllDepartment();
    initCommonSenseCategories();
    bindEvent();
    
    function initAllDepartment() {
        var url = getFullUrl('getAllDepartment/');
        var options = {
            type: 'GET',
            url: url,
            dataType: "json",
            data: {},
            timeout: 4000,
            success: function (data) {
                var firstUl = data.firstUl;
                initTpl(firstUl, $("#disease_html_templet_1"), $("#disease_html_view_1"),bindEvent);

                var sencondUl = data.secondUl;
                initTpl(sencondUl, $("#disease_html_templet_2"), $("#disease_html_view_2"),bindEvent);
            },
            error: function (data) {
                alert('网络异常！');
            }
        };
        $.ajax(options);
    }


    function initCommonSenseCategories() {
        var url = getFullUrl('showCommonSenseCategories/');
        var options = {
            type: 'GET',
            url: url,
            dataType: "json",
            data: {},
            timeout: 4000,
            success: function (data) {
                var firstUl = data.firstUl;
                initTpl(firstUl, $("#firstAid_html_template_1"), $("#firstAid_html_view_1"),bindEvent);

                var sencondUl = data.secondUl;
                initTpl(sencondUl, $("#firstAid_html_template_2"), $("#firstAid_html_view_2"),bindEvent);
            },
            error: function (data) {
                alert('网络异常！');
            }
        };
        $.ajax(options);
    }
    //
    function bindEvent() {
        $('.temp').on('click', function () {
            window.open('../drugReactionReportQuery.html', '_self');
        });
        $('#show_firstAid_sense').on('click', function () {
            window.open('./commonSenseCategories.html', '_self');
        });
        $('#show_disease_sense').on('click', function () {
            window.open('./all_departments.html', '_self');
        });
        $('#all_classify_a').on('click', function () {
            window.open('./commonSenseCategories.html', '_self');
        });
        $('#all_classify_a').on('click', function () {
            window.open('./commonSenseCategories.html', '_self');
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