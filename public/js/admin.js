$(".collapseSidebar").on("click", function (e) {
    $(".vertical").hasClass("narrow")
      ? $(".vertical").toggleClass("open")
      : ($(".vertical").toggleClass("collapsed"),
        $(".vertical").hasClass("hover") &&
          $(".vertical").removeClass("hover")),
      e.preventDefault();
  })