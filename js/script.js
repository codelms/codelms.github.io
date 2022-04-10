const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list .menus-ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list .menus-ul .menus-li a');
const header = document.querySelector('.header.container1');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 355) {
		header.style.backgroundColor = 'var(--menuBarColor)';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// typing text animation script
var typed = new Typed(".typing-text", {
	strings: ["Code:<br><span> </span>LM(<span class='x-class'>S</span>);"],
	typeSpeed: 100,
	backSpeed: 100,
	showCursor: false,
	loop: false
});
var typed = new Typed(".typing-text-1", {
	strings: ["Code:<br><span> </span><span> </span><span> </span>LM(<span class='x-class'>S</span>);"],
	typeSpeed: 100,
	backSpeed: 100,
	showCursor: false,
	loop: false
});

//open-button1 function
// const open_button1 = document.getElementById('open_button1');
// const classDissolve_Container = document.getElementById('classDissolve_Container');
// const close_button1 = document.getElementById('close_button1');

// open_button1.addEventListener('click', () => {
// 	classDissolve_Container.classList.add('show');
// });
// close_button1.addEventListener('click', () => {
// 	classDissolve_Container.classList.remove('show');
// });
const buttonChemOpen = document.getElementById('buttonChemOpen');
const chemistry = document.getElementById('chemistry');
const buttonChemClose = document.getElementById('buttonChemClose');

buttonChemOpen.addEventListener('click' , () => {
	chemistry.classList.add('show');
});
buttonChemClose.addEventListener('click' , () => {
	chemistry.classList.remove('show');
});

//Physics
const error1ButtonClose = document.getElementById('error1ButtonClose');
const error1 = document.getElementById('error1');
const buttonPhyOpen = document.getElementById('buttonPhyOpen');

buttonPhyOpen.addEventListener('click' , () => {
	error1.classList.add('showError1');
});
error1ButtonClose.addEventListener('click' , () => {
	error1.classList.remove('showError1');
});

//##################################################################################################################################################
// gen1
