// Configuración de redes sociales
let socials = {
  facebook: {
    url: 'https://facebook.com/tu-perfil',
    icon: 'icon/facebook.png'
  },
  youtube: {
    url: 'https://youtube.com/tu-canal',
    icon: 'icon/youtube.png'
  },
  twitter: { 
    url: 'https://twitter.com/tu-usuario',
    icon: 'icon/twitter.png'
  },
  linkedin: {
    url: 'https://linkedin.com/in/tu-perfil',
    icon: 'icon/linkedin.png'
  },
  github: {
    url: 'https://github.com/tu-usuario',
    icon: 'icon/github-logo.png'
  },
  whatsapp: {
    url: 'https://wa.me/1234567890',
    icon: 'icon/whatsapp.png'
  },
  instagram: {
    url: 'https://instagram.com/tu-usuario',
    icon: 'icon/instagram.png'
  },
  telegram: {
    url: 'https://t.me/tu-usuario',
    icon: 'icon/telegram.png'
  },
  mail: {
    url: 'mailto:tu-email@ejemplo.com',
    icon: 'icon/mail.png'
  }
}

// Variables globales para la firma
let currentSignatureData = {
    nombre: '',
    titulo: '',
    empresa: '',
    telefono: '',
    email: '',
    website: '',
    foto: 'perfil_foto/IMG_2542.JPEG',
    colorPrincipal: '#25C9FF',
    colorTexto: '#282d31'
};

// Función para actualizar la vista previa de la firma
function actualizarVistaPrevia() {
    const preview = document.getElementById('preview');
    const socialesActivos = obtenerSocialesActivos();
    
    const firmaHTML = generarFirmaHTML(currentSignatureData, socialesActivos);
    preview.innerHTML = firmaHTML;
}

// Función para obtener las redes sociales activas
function obtenerSocialesActivos() {
    const socialesActivos = {};
    
    Object.keys(socials).forEach(social => {
        const checkbox = document.getElementById(social);
        const urlInput = document.getElementById(social + 'Url');
        
        if (checkbox && checkbox.checked && urlInput && urlInput.value.trim()) {
            let url = urlInput.value.trim();
            
            // Manejo especial para el campo de email
            if (social === 'mail' && !url.startsWith('mailto:')) {
                url = 'mailto:' + url;
            }
            
            socialesActivos[social] = {
                url: url,
                icon: socials[social].icon
            };
        }
    });
    
    return socialesActivos;
}

// Función para generar el HTML de la firma
function generarFirmaHTML(data, socialesActivos) {
    let socialIcons = '';
    for(let social in socialesActivos) {
        socialIcons += `<a href="${socialesActivos[social].url}" style="display:inline-block;margin-right:6px"><img src="${socialesActivos[social].icon}" width="20" style="display: block"></a>`
    }
    
    // Crear hipervínculos automáticos para teléfono y email
    const telefoneHTML = data.telefono ? `<br><a href="tel:${data.telefono}" style="margin: 0; color: #666; text-decoration: none;">${data.telefono}</a>` : '';
    const emailHTML = data.email ? `<br><a href="mailto:${data.email}" style="margin: 0; color: #666; text-decoration: none;">${data.email}</a>` : '';
    const empresaHTML = data.empresa ? `<br><span style="margin: 0; color: #666">${data.empresa}</span>` : '';
    
    // Mejorar el formato del website
    let websiteHTML = '';
    if (data.website) {
        let websiteUrl = data.website;
        let websiteText = data.website;
        
        // Si no tiene protocolo, agregarlo
        if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
            websiteUrl = 'https://' + websiteUrl;
        }
        
        // Limpiar el texto mostrado
        websiteText = websiteText.replace(/^https?:\/\//, '').replace(/^www\./, '');
        
        websiteHTML = `<br><a href='${websiteUrl}' style="color: ${data.colorPrincipal}; font-weight: bold; text-decoration: none;">${websiteText}</a>`;
    }
    
    return `
    <div style="border: 1px solid ${data.colorPrincipal}80; display: inline-block; border-radius: 3px;">
        <table style="font-family: arial; height:90px; border-collapse: collapse;">
          <tr>
            <td style="padding: 7px">
              <img src="${data.foto}" 
                 alt="" 
                 width="80" 
                 height="80" 
                 style="display:block; border-radius: 50%; margin-right: 7px; float: left"
               >
              <div style="width: 5px; height: 80px; background:${data.colorPrincipal}; float: right"></div>
            </td>
            <td style="vertical-align:top; padding:7px 14px 7px 3px">
              <strong style="margin: 0; font-size:17px; color: ${data.colorTexto}; line-height: 24px; height: 24px; display:block">${data.nombre}</strong>
              <p style='font-size:12px; margin: 0px 0 6px; min-height: 30px'>
                <span style="margin: 0; color: #666">${data.titulo}</span>
                ${empresaHTML}
                ${telefoneHTML}
                ${emailHTML}
                ${websiteHTML}
              </p>
              <div style="margin-top: 5px;">${socialIcons}</div>
            </td>
          </tr>
        </table>
    </div>`;
}

// Función para manejar la subida de archivos de imagen
function manejarArchivoImagen(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagenUrl = e.target.result;
            currentSignatureData.foto = imagenUrl;
            
            // Actualizar vista previa
            const imagenPrevia = document.getElementById('imagenPrevia');
            if (imagenPrevia) {
                imagenPrevia.src = imagenUrl;
            }
            
            // Actualizar estado con mensaje de éxito para archivo
            actualizarEstadoImagen('✅ Archivo subido correctamente', 'success');
            
            actualizarVistaPrevia();
        };
        reader.readAsDataURL(file);
    } else {
        alert('❌ Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, WebP)');
    }
}

// Función para actualizar el estado de la imagen
function actualizarEstadoImagen(mensaje, tipo = 'info') {
    const estadoElement = document.getElementById('estadoImagen');
    if (estadoElement) {
        const colores = {
            'success': '#4caf50',
            'error': '#f44336',
            'warning': '#ff9800',
            'info': '#2196f3'
        };
        estadoElement.innerHTML = mensaje;
        estadoElement.style.color = colores[tipo] || colores.info;
    }
}

// Función para abrir el selector de archivos
function abrirSelectorArchivo() {
    const archivoInput = document.getElementById('archivoFoto');
    if (archivoInput) {
        archivoInput.click();
    }
}

// Función para agregar event listeners a todos los campos
function agregarEventListeners() {
    // Campos de texto
    const campos = ['nombre', 'titulo', 'empresa', 'telefono', 'email', 'website'];
    campos.forEach(campo => {
        const input = document.getElementById(campo);
        if (input) {
            input.addEventListener('input', (e) => {
                currentSignatureData[campo] = e.target.value;
                actualizarVistaPrevia();
            });
        }
    });
    
    // Ya no necesitamos manejar campos URL de foto
    // Solo manejamos la subida de archivos
    
    // Input de archivo
    const archivoFoto = document.getElementById('archivoFoto');
    if (archivoFoto) {
        archivoFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                manejarArchivoImagen(file);
            }
        });
    }
    
    // Colores
    const colorPrincipal = document.getElementById('colorPrincipal');
    const colorTexto = document.getElementById('colorTexto');
    
    if (colorPrincipal) {
        colorPrincipal.addEventListener('input', (e) => {
            currentSignatureData.colorPrincipal = e.target.value;
            actualizarVistaPrevia();
        });
    }
    
    if (colorTexto) {
        colorTexto.addEventListener('input', (e) => {
            currentSignatureData.colorTexto = e.target.value;
            actualizarVistaPrevia();
        });
    }
    
    // Checkboxes y URLs de redes sociales
    Object.keys(socials).forEach(social => {
        const checkbox = document.getElementById(social);
        const urlInput = document.getElementById(social + 'Url');
        
        if (checkbox) {
            checkbox.addEventListener('change', actualizarVistaPrevia);
        }
        
        if (urlInput) {
            urlInput.addEventListener('input', actualizarVistaPrevia);
        }
    });
    
    // Drag and drop para imágenes
    const vistaFoto = document.getElementById('vistaFoto');
    if (vistaFoto) {
        vistaFoto.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#25C9FF';
            this.style.backgroundColor = '#f0f8ff';
        });
        
        vistaFoto.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
            this.style.backgroundColor = '#f9f9f9';
        });
        
        vistaFoto.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
            this.style.backgroundColor = '#f9f9f9';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                manejarArchivoImagen(files[0]);
            }
        });
    }
}

// Función para copiar la firma al portapapeles
function copiarFirma() {
    const socialesActivos = obtenerSocialesActivos();
    const firmaHTML = generarFirmaHTML(currentSignatureData, socialesActivos);
    
    // Crear un elemento temporal para copiar el contenido
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = firmaHTML;
    document.body.appendChild(tempDiv);
    
    try {
        // Seleccionar y copiar el contenido
        const range = document.createRange();
        range.selectNode(tempDiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        const successful = document.execCommand('copy');
        if (successful) {
            alert('✅ ¡Firma copiada al portapapeles! Ahora puedes pegarla en tu cliente de correo.');
        } else {
            throw new Error('No se pudo copiar');
        }
    } catch (err) {
        // Fallback para navegadores modernos
        navigator.clipboard.writeText(firmaHTML).then(() => {
            alert('✅ ¡Firma copiada al portapapeles!');
        }).catch(() => {
            alert('❌ No se pudo copiar la firma. Intenta seleccionar y copiar manualmente desde la vista previa.');
        });
    } finally {
        document.body.removeChild(tempDiv);
        window.getSelection().removeAllRanges();
    }
}

// Función para descargar la firma como archivo HTML
function descargarFirma() {
    const socialesActivos = obtenerSocialesActivos();
    const firmaHTML = generarFirmaHTML(currentSignatureData, socialesActivos);
    
    const htmlCompleto = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firma de ${currentSignatureData.nombre}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
    ${firmaHTML}
</body>
</html>`;
    
    const blob = new Blob([htmlCompleto], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `firma_${currentSignatureData.nombre.replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('📁 ¡Firma descargada exitosamente!');
}

// Función para resetear el formulario
function resetearFormulario() {
    if (confirm('¿Estás seguro de que quieres resetear todos los campos?')) {
        // Resetear valores por defecto
        document.getElementById('nombre').value = '';
        document.getElementById('titulo').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('email').value = '';
        document.getElementById('website').value = '';
        document.getElementById('foto').value = 'perfil_foto/IMG_2542.JPEG';
        document.getElementById('colorPrincipal').value = '#25C9FF';
        document.getElementById('colorTexto').value = '#282d31';
        
        // Resetear archivo de foto
        const archivoFoto = document.getElementById('archivoFoto');
        if (archivoFoto) archivoFoto.value = '';
        
        // Resetear vista previa de imagen a la imagen por defecto
        const imagenPrevia = document.getElementById('imagenPrevia');
        if (imagenPrevia) {
            imagenPrevia.src = 'perfil_foto/IMG_2542.JPEG';
        }
        actualizarEstadoImagen('✅ Imagen por defecto cargada', 'success');
        
        // Resetear URLs de redes sociales
        document.getElementById('facebookUrl').value = 'https://facebook.com/tu-perfil';
        document.getElementById('youtubeUrl').value = 'https://youtube.com/tu-canal';
        document.getElementById('twitterUrl').value = 'https://twitter.com/tu-usuario';
        document.getElementById('linkedinUrl').value = 'https://linkedin.com/in/tu-perfil';
        document.getElementById('githubUrl').value = 'https://github.com/tu-usuario';
        document.getElementById('whatsappUrl').value = 'https://wa.me/1234567890';
        document.getElementById('instagramUrl').value = 'https://instagram.com/tu-usuario';
        document.getElementById('telegramUrl').value = 'https://t.me/tu-usuario';
        document.getElementById('mailUrl').value = 'tu-email@ejemplo.com';
        
        // Marcar todos los checkboxes
        Object.keys(socials).forEach(social => {
            const checkbox = document.getElementById(social);
            if (checkbox) checkbox.checked = true;
        });
        
        // Actualizar datos globales
        currentSignatureData = {
            nombre: '',
            titulo: '',
            empresa: '',
            telefono: '',
            email: '',
            website: '',
            foto: 'perfil_foto/IMG_2542.JPEG',
            colorPrincipal: '#25C9FF',
            colorTexto: '#282d31'
        };
        
        actualizarVistaPrevia();
        alert('🔄 ¡Formulario reseteado exitosamente!');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    agregarEventListeners();
    actualizarVistaPrevia();
    
    console.log('🎨 Generador de Firma de Correo inicializado correctamente');
    console.log('📝 Completa el formulario para generar tu firma personalizada');
});