    //скрипт выезжающего меню
	var toogle = document.querySelector('.nav-toggle');
    toogle.addEventListener("click", function(){
      var menu = document.querySelector('#menu');
      menu.classList.toggle('active');
      toogle.classList.toggle('toogle-active');
      var header = document.querySelector('header');
      header.classList.toggle('header-active');
    });  

	// скрипт слайдшоу
    var slideIndex = 0;
    var slides = document.getElementsByClassName("mySlides");
    slides[0].style.display ='block';
    showSlides();
    function showSlides() {
        var dots = document.getElementsByClassName("dot");
        for (var i = 0; i < slides.length; i++) {
           slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" dot-active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " dot-active";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
