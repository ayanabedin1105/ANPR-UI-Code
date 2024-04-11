$(document).ready(function () {
  // Event listener for clicking the run script button
  $("#runScriptBtn").click(function () {
    $.ajax({
      type: "GET",
      url: "/run_script",
      success: function (response) {
        alert(response);
      },
      error: function (xhr, status, error) {
        alert("Error occurred while executing script: " + error);
      },
    });
  });

  //run OCR code
  "#runOCRBtn".click(function () {
    $.ajax({
      type: "GET",
      url: "/run_ocr",
      success: function (response) {
        alert(response);
      },
      error: function (xhr, status, error) {
        alert("Error occurred while executing script: " + error);
      },
    });
  });
});
