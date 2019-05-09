Reveal.initialize({
	controls: true, //Display controls in the bottom right corner
	progress: true, //Display a presentation progress bar
	slideNumber: true, //Display the page number of the current slide
	history: true, //Push each slide change to the browser history
	keyboard: true, //Enable keyboard shortcuts for navigation
	overview: true, //Enable the slide overview mode
	center: true, //Vertical centering of slides
	touch: true, //Enables touch navigation on devices with touch input
	loop: false, //Loop the presentation
	rtl: false, //Change the presentation direction to be RTL
	fragments: true,  //Turns fragments on and off globally
	embedded: false, //Flags if the presentation is running in an embedded mode, i.e. contained within a limited portion of the screen
	help: true, //Flags if we should show a help overlay when the questionmark key is pressed
	showNotes: false, //Flags if speaker notes should be visible to all viewers
	autoSlide: 0, //Number of milliseconds between automatically proceeding to the next slide, disabled when set to 0, this value can be overwritten by using a data-autoslide attribute on your slides
	autoSlideStoppable: true, //Stop auto-sliding after user input
	mouseWheel: true, //Enable slide navigation via mouse wheel
	hideAddressBar: true, //Hides the address bar on mobile devices
	previewLinks: false, //Opens links in an iframe preview overlay
	transition: 'concave', //none/fade/slide/convex/concave/zoom
	transitionSpeed: 'slow', //default/slow/fast
	backgroundTransition: 'default', //none/fade/slide/convex/concave/zoom  //Transition style for full page slide backgrounds
});