$(".collapseSidebar").on("click", function (e) {
    $(".vertical").hasClass("narrow")
      ? $(".vertical").toggleClass("open")
      : ($(".vertical").toggleClass("collapsed"),
        $(".vertical").hasClass("hover") &&
          $(".vertical").removeClass("hover")),
      e.preventDefault();
  })

  $( "#form-create-new-product" ).on( "submit", function( event ) {
    $(".spin-layout").removeAttr("hidden");
  });