/* filepath: c:\Users\rafam\OneDrive\Área de Trabalho\Challenge\scripts.js */
document.addEventListener('DOMContentLoaded', function() {
    const startCameraBtn = document.getElementById('startCameraBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const retakePhotoBtn = document.getElementById('retakePhotoBtn');
    const continueBtn = document.getElementById('continueBtn');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const videoElement = document.getElementById('videoElement');
    const capturedPhoto = document.getElementById('capturedPhoto');
    let stream = null;
    
    // Iniciar câmera
    startCameraBtn.addEventListener('click', function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(streamObj) {
                    stream = streamObj;
                    videoElement.srcObject = stream;
                    photoPlaceholder.style.display = 'none';
                    videoElement.style.display = 'block';
                    startCameraBtn.style.display = 'none';
                    cameraBtn.style.display = 'block';
                })
                .catch(function(error) {
                    console.error('Erro ao acessar a câmera:', error);
                    alert('Não foi possível acessar a câmera. Verifique suas permissões de dispositivo.');
                });
        } else {
            alert('Seu navegador não suporta acesso à câmera. Por favor, use um navegador mais recente.');
        }
    });
    
    // Tirar foto
    cameraBtn.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0);
        
        capturedPhoto.src = canvas.toDataURL('image/png');
        capturedPhoto.style.display = 'block';
        videoElement.style.display = 'none';
        cameraBtn.style.display = 'none';
        
        // Parar stream da câmera
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        retakePhotoBtn.style.display = 'inline-block';
        continueBtn.style.display = 'inline-block';
    });
    
    // Nova foto
    retakePhotoBtn.addEventListener('click', function() {
        capturedPhoto.style.display = 'none';
        retakePhotoBtn.style.display = 'none';
        continueBtn.style.display = 'none';
        startCameraBtn.style.display = 'block';
        photoPlaceholder.style.display = 'flex';
    });
    
    // Continuar para próxima etapa
    continueBtn.addEventListener('click', function() {
        alert('Foto capturada com sucesso! Avançando para a próxima etapa...');
        window.location.href = '../success/index.html'; // Redireciona para sucess/index.html
    });
});