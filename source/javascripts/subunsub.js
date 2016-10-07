// SendInBlue subscribe/unsubscribe forms
$.ready().then(function(){

    var showalert = function(id,type,msg) {
        var alert = document.getElementById(id);
        alert.innerHTML = msg;
        alert.classList.remove("newsletterform_alert-error");
        alert.classList.remove("newsletterform_alert-success");
        alert.classList.add("newsletterform_alert-"+type)
        alert.setAttribute("aria-hidden", "false");
    }
    var hidealert = function(id) {
        var alert = document.getElementById(id);
        alert.innerHTML = "&nbsp;";
        alert.classList.remove("newsletterform_alert-error");
        alert.classList.remove("newsletterform_alert-success");
        alert.setAttribute("aria-hidden", "true");
    }

    // TODO add to bliss helpers
    var serialize = function(form) {
        var field, l, s = [];
        if (typeof form == 'object' && form.nodeName == "FORM") {
            var len = form.elements.length;
            for (var i=0; i<len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        l = form.elements[i].options.length; 
                        for (var j=0; j<l; j++) {
                            if(field.options[j].selected)
                                s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
        }
        return s.join('&').replace(/%20/g, '+');
    }

    var submitForm = function(processResult) {
        return function(e){

            var theForm = $(this);

            if (theForm.classList.contains("sib_processing")) {
                return false;
            }

            // Error messages

            // Validate form
            var emailField = $("input[type='email']",theForm);
            var emptyError = emailField.getAttribute('data-msg-empty');
            var invalidError = emailField.getAttribute('data-msg-invalid');

            if (emailField.value == "") {
                emailField.classList.add("error");
                showalert("form-alert","error",emptyError);
            }
            else {
                if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailField.value)) {
                    emailField.classList.add("error");
                    showalert("form-alert","error",invalidError);
                } else {
                    emailField.classList.remove("error");
                }
            }

            // POST form data
            if (!emailField.classList.contains("error")) {
                var request_url = theForm.getAttribute("action");
                var post_data = serialize(theForm);
                var loadingGif = $("#loading-gif",theForm.parentNode);
                if (loadingGif != null) {
                    loadingGif.style.display = "block";
                }
                theForm.classList.add("sib_processing");
                theForm.style.opacity = "0.5";

                $.fetch(request_url, {
                    method: "POST",
                    data: post_data,
                    responseType: "json"
                }).then(function(xhr){
                    var result = xhr.response.result;
                    var theForm = $(".sib_processing");
                    if (loadingGif != null) {
                        loadingGif.style.display = "none";
                    }
                    theForm.style.opacity= "1";
                    if (result != undefined) {
                        var message = processResult(result,theForm,emailField);
                        showalert("form-alert",(result.result == "success")?"success":"error",message);
                        theForm.classList.remove("sib_processing");
                    }
                }).catch(function(error){
                    console.error(error, "code: " + error.status);
                });
            }
            return false;
        };
    };


    var unsubForm = $("#unsubscribe-form");
    if (unsubForm != undefined) {
        unsubForm.onsubmit = submitForm(function(result,form,emailField){
        var message="";
        if (result.result == "success") {
            message += result.succcess_msg;
            form.style.display = "none";
        }
        else if (result.result == "already_blacked") {
            message += result.already_msg;
            form.style.display = "none";
        }
        else if(result.result == "invalid_request" || result.result == "reqMiss") {
            message += result.invalid_err_msg;
            emailField.classList.add("error");
        }
        else if(result.result == "invalidEmail") {
            message += result.general_err_msg;
            emailField.classList.add("error");
        }
        else {
            message += result.general_err_msg;
            emailField.classList.add("error");
        }
        return message;
    });
    }
    

    $("#subscribe-form").onsubmit = submitForm(function(result,form,emailField){
        var message="";
        if (result.result == "success") {
            message += result.succcess_msg;
        } else if(result.result == 'emailExist') {
            message += result.exist_err_msg;
        } else if(result.result == "invalid_request" 
             || result.result == "invalidEmail") {
            message += result.invalid_err_msg;
            emailField.classList.add("error");
        }
        else if(result.result == "reqMiss") {
            message += result.general_err_msg;
            emailField.classList.add("error");
        }
        else {
            message += result.general_err_msg;
            emailField.classList.add("error");
        }
        return message;
    });

    // Reset input field error markers on focus
    $$("input")._.addEventListener("focus", function(){
        if ($(this).classList.contains("error") ) {
            $(this).classList.remove("error");
        }
        hidealert("form-alert");
    });

});
