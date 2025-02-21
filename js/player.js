// Obtener elementos del DOM Video
const CerrarVideo = document.getElementById('cerrar-video');
const VentanaVideo = document.getElementById('ventana-video');
const videoPlayer = document.getElementById('video-player');
const overlay = document.getElementById('overlay');

// Obtener elementos del DOM Pagina
const CerrarPagina = document.getElementById('cerrar-pagina');
const VentanaPagina = document.getElementById('ventana-pagina');
const iframe = document.getElementById('frame-pagina');

// Función para cargar el video usando hls.js
function AbrirVideo(videox) {
	const videoUrl = videox;
	
	if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(videoUrl);
			hls.attachMedia(videoPlayer);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {
					videoPlayer.play();
			});
	} else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
			// Si el navegador soporta HLS nativamente (Safari)
			videoPlayer.src = videoUrl;
			videoPlayer.addEventListener('loadedmetadata', function () {
					videoPlayer.play();
			});
	}
	
	VentanaVideo.style.display = 'block';
	overlay.style.display = 'block';
}

// Evento para cerrar la ventana flotante
CerrarVideo.addEventListener('click', function () {
		VentanaVideo.style.display = 'none';
		overlay.style.display = 'none';
		videoPlayer.pause();
});

// Función para abrir la ventana flotante Pagina
function AbrirPagina(urlx) {
		const pageUrl = urlx
		VentanaPagina.style.display = 'block';
		overlay.style.display = 'block';
		iframe.src = pageUrl; // Cargar la página en el iframe
}

// Función para cerrar la ventana flotante
function CerrarVentanaPagina() {
		VentanaPagina.style.display = 'none';
		overlay.style.display = 'none';
		iframe.src = ''; // Limpiar el iframe al cerrar
}

// Evento para cerrar la ventana flotante
CerrarPagina.addEventListener('click', CerrarVentanaPagina);

//
function AbrirVentana(enlace) {
	let m3u8x = enlace.includes('.m3u8')
	let tsx = enlace.includes('.ts')

	if ( m3u8x ) {
		AbrirVideo(enlace);
	} else if ( tsx ) {
		AbrirVideo(enlace);
	} else {
		AbrirPagina(enlace)
	}
}
