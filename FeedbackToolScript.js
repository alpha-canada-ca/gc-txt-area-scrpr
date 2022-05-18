$(document).on("wb-ready.wb", function () {
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };
  var device = getDeviceType();
  console.log(device);

  $("#btnno").click(function (e) {
    $(".gc-pg-hlpfl-no").removeClass("nojs-show");
    $(".gc-pg-hlpfl-btn").addClass("hide");
    $("#helpful").val("No");
    $("input[name='deviceType']").val(device);
  });
  $("#gc-pg-hlpfl-frm").submit(function (e) {
    e.preventDefault();
    $(".gc-pg-hlpfl-thnk").removeClass("hide");
    $("#gc-pg-hlpfl-frm").addClass("hide nojs-show");
    $.ajax({
      url:
        "https://pagesuccessemailqueue.azurewebsites.net/api/QueueProblemForm",
      type: "POST",
      dataType: "text",
      data: $("form#gc-pg-hlpfl-frm").serialize(),
      success: function (data) {},
      error: function (xhr, status, err) {
        console.log(xhr.responseText);
      },
    });
  });
});
