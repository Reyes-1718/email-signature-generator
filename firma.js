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

// Función para generar el HTML de la firma optimizada para Gmail
function generarFirmaHTML(data, socialesActivos) {
    let socialIcons = '';
    for(let social in socialesActivos) {
        socialIcons += `<a href="${socialesActivos[social].url}" style="text-decoration: none; margin-right: 8px;"><img src="${socialesActivos[social].icon}" width="20" height="20" style="border: 0; vertical-align: middle; border-radius: 2px;"></a>`
    }
    
    // Crear información de contacto sin <br> tags (problemáticos en algunos clientes)
    const contactInfo = [];
    
    if (data.titulo) {
        contactInfo.push(`<span style="color: #444; font-weight: 500;">${data.titulo}</span>`);
    }
    
    if (data.empresa) {
        contactInfo.push(`<span style="color: #666;">${data.empresa}</span>`);
    }
    
    if (data.telefono) {
        contactInfo.push(`<a href="tel:${data.telefono}" style="color: #666; text-decoration: none;">${data.telefono}</a>`);
    }
    
    if (data.email) {
        contactInfo.push(`<a href="mailto:${data.email}" style="color: #666; text-decoration: none;">${data.email}</a>`);
    }
    
    if (data.website) {
        let websiteUrl = data.website;
        let websiteText = data.website;
        
        // Si no tiene protocolo, agregarlo
        if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
            websiteUrl = 'https://' + websiteUrl;
        }
        
        // Limpiar el texto mostrado
        websiteText = websiteText.replace(/^https?:\/\//, '').replace(/^www\./, '');
        
        contactInfo.push(`<a href="${websiteUrl}" style="color: ${data.colorPrincipal}; font-weight: bold; text-decoration: none;">${websiteText}</a>`);
    }
    
    // Estructura de tabla compatible con Gmail, iCloud, Outlook y otros clientes de correo
    return `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; border-collapse: collapse; max-width: 600px; width: auto;">
        <tr>
            <td style="vertical-align: middle; padding-right: 15px; text-align: center;">
                <!-- Foto de perfil centrada -->
                <img src="${data.foto}" 
                     alt="${data.nombre}" 
                     width="80" 
                     height="80" 
                     style="border-radius: 40px; display: block; border: 3px solid ${data.colorPrincipal}; margin: 0 auto;"
                >
            </td>
            <td width="4" style="background-color: ${data.colorPrincipal}; padding: 0; width: 4px; min-width: 4px; max-width: 4px;"></td>
            <td style="vertical-align: middle; padding-left: 15px;">
                <!-- Contenedor con fondo y bordes redondeados -->
                <table cellpadding="0" cellspacing="0" border="0" style="background-color: #fafafa; border: 2px solid ${data.colorPrincipal}; border-radius: 12px; width: 100%; min-width: 280px;">
                    <tr>
                        <td style="padding: 15px 20px;">
                            <!-- Información principal -->
                            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                                <tr>
                                    <td style="padding-bottom: 8px;">
                                        <strong style="font-size: 18px; color: ${data.colorTexto}; font-weight: 700; margin: 0; display: block;">${data.nombre}</strong>
                                    </td>
                                </tr>
                                ${contactInfo.map(info => `
                                <tr>
                                    <td style="padding-bottom: 4px; font-size: 13px; line-height: 1.3;">
                                        ${info}
                                    </td>
                                </tr>
                                `).join('')}
                                ${socialIcons ? `
                                <tr>
                                    <td style="padding-top: 12px; border-top: 1px solid #cccccc;">
                                        ${socialIcons}
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;
}

// Función para generar una versión súper simplificada para Gmail (si la principal no funciona)
function generarFirmaSimpleGmail(data, socialesActivos) {
    let socialLinks = '';
    for(let social in socialesActivos) {
        socialLinks += `<a href="${socialesActivos[social].url}" style="color: ${data.colorPrincipal}; text-decoration: none; margin-right: 10px;">${social.charAt(0).toUpperCase() + social.slice(1)}</a>`;
    }
    
    return `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; border-collapse: collapse; max-width: 500px;">
        <tr>
            <td style="padding-right: 15px; vertical-align: middle; text-align: center;">
                <img src="${data.foto}" width="60" height="60" style="border-radius: 30px; border: 2px solid ${data.colorPrincipal}; display: block; margin: 0 auto;">
            </td>
            <td width="3" style="background-color: ${data.colorPrincipal}; width: 3px; min-width: 3px;"></td>
            <td style="vertical-align: middle; padding-left: 15px;">
                <table cellpadding="0" cellspacing="0" border="0" style="background-color: #f9f9f9; border: 1px solid ${data.colorPrincipal}; border-radius: 8px; width: 100%;">
                    <tr>
                        <td style="padding: 12px 16px;">
                            <div style="font-weight: bold; font-size: 16px; color: ${data.colorTexto}; margin-bottom: 5px;">${data.nombre}</div>
                            <div style="color: #666; margin-bottom: 3px;">${data.titulo}</div>
                            ${data.empresa ? `<div style="color: #666; margin-bottom: 3px;">${data.empresa}</div>` : ''}
                            ${data.telefono ? `<div style="margin-bottom: 3px;"><a href="tel:${data.telefono}" style="color: #666; text-decoration: none;">${data.telefono}</a></div>` : ''}
                            ${data.email ? `<div style="margin-bottom: 3px;"><a href="mailto:${data.email}" style="color: #666; text-decoration: none;">${data.email}</a></div>` : ''}
                            ${data.website ? `<div style="margin-bottom: 8px;"><a href="${data.website}" style="color: ${data.colorPrincipal}; text-decoration: none; font-weight: bold;">${data.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}</a></div>` : ''}
                            ${socialLinks ? `<div style="border-top: 1px solid ${data.colorPrincipal}; padding-top: 8px; margin-top: 8px; opacity: 0.8;">${socialLinks}</div>` : ''}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;
}

// Función para manejar la subida de archivos de imagen
function manejarArchivoImagen(file) {
    if (!file) {
        actualizarEstadoImagen('❌ No se seleccionó ningún archivo', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        actualizarEstadoImagen('❌ Formato no válido. Selecciona JPG, PNG, GIF o WebP', 'error');
        alert('❌ Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, WebP)');
        return;
    }
    
    // Validar tamaño del archivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        actualizarEstadoImagen('❌ La imagen es demasiado grande (máximo 5MB)', 'error');
        alert('❌ La imagen es demasiado grande. Por favor selecciona una imagen menor a 5MB.');
        return;
    }
    
    actualizarEstadoImagen('⏳ Cargando imagen...', 'info');
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const imagenUrl = e.target.result;
            currentSignatureData.foto = imagenUrl;
            
            // Actualizar vista previa
            const imagenPrevia = document.getElementById('imagenPrevia');
            if (imagenPrevia) {
                imagenPrevia.src = imagenUrl;
                imagenPrevia.onerror = function() {
                    actualizarEstadoImagen('❌ Error al cargar la imagen', 'error');
                };
            }
            
            // Actualizar estado con mensaje de éxito para archivo
            actualizarEstadoImagen('✅ Imagen cargada correctamente', 'success');
            
            actualizarVistaPrevia();
        } catch (error) {
            actualizarEstadoImagen('❌ Error al procesar la imagen', 'error');
            console.error('Error procesando imagen:', error);
        }
    };
    
    reader.onerror = function() {
        actualizarEstadoImagen('❌ Error al leer el archivo', 'error');
        alert('❌ Error al leer el archivo. Por favor intenta de nuevo.');
    };
    
    reader.readAsDataURL(file);
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

// Función para mostrar la opción de GitHub
function mostrarOpcionGitHub() {
    const panel = document.getElementById('panelGitHub');
    if (panel) {
        panel.style.display = 'block';
        document.getElementById('urlGitHub').focus();
    }
}

// Función para ocultar la opción de GitHub
function ocultarOpcionGitHub() {
    const panel = document.getElementById('panelGitHub');
    if (panel) {
        panel.style.display = 'none';
        document.getElementById('urlGitHub').value = '';
    }
}

// Función para cargar imagen desde GitHub
function cargarImagenGitHub() {
    const urlInput = document.getElementById('urlGitHub');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('❌ Por favor ingresa una URL de GitHub válida');
        return;
    }
    
    // Validar que sea una URL de GitHub con /raw/
    if (!url.includes('github.com') || !url.includes('/raw/')) {
        alert('❌ La URL debe ser de GitHub y contener "/raw/" para acceso directo\n\n✅ Formato correcto:\nhttps://github.com/tu-usuario/email-signature-generator/raw/main/images/perfil.jpg\n\n❌ Formato incorrecto:\nhttps://github.com/tu-usuario/repo/blob/main/imagen.jpg\n\n📖 Consulta SETUP_GITHUB.md para más ayuda');
        return;
    }
    
    actualizarEstadoImagen('⏳ Cargando imagen desde GitHub...', 'info');
    
    // Crear imagen temporal para verificar que carga
    const img = new Image();
    
    img.onload = function() {
        // La imagen cargó correctamente
        currentSignatureData.foto = url;
        
        // Actualizar vista previa
        const imagenPrevia = document.getElementById('imagenPrevia');
        if (imagenPrevia) {
            imagenPrevia.src = url;
        }
        
        actualizarEstadoImagen('✅ Imagen cargada desde GitHub correctamente', 'success');
        actualizarVistaPrevia();
        ocultarOpcionGitHub();
    };
    
    img.onerror = function() {
        actualizarEstadoImagen('❌ No se pudo cargar la imagen desde GitHub. Verifica la URL.', 'error');
        alert('❌ Error al cargar la imagen desde GitHub.\n\nVerifica que:\n• La URL sea correcta\n• El repositorio sea público\n• La imagen exista\n• Uses la URL con "/raw/"');
    };
    
    // Intentar cargar la imagen
    img.src = url;
}

// Función para alternar checkboxes cuando se hace clic en el contenedor
function toggleCheckbox(socialId, event) {
    if (!socialId) {
        console.warn('toggleCheckbox: socialId no proporcionado');
        return;
    }
    
    const checkbox = document.getElementById(socialId);
    if (!checkbox) {
        console.warn(`toggleCheckbox: No se encontró checkbox con ID "${socialId}"`);
        return;
    }
    
    const container = checkbox.closest('.checkbox-item');
    
    try {
        // Cambiar estado del checkbox
        checkbox.checked = !checkbox.checked;
        
        // Disparar evento change manualmente para sincronizar con event listeners
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Actualizar el estado visual del contenedor
        updateCheckboxVisualState(socialId);
        
        // Prevenir propagación para evitar dobles disparos
        if (event) {
            event.stopPropagation();
        }
        
    } catch (error) {
        console.error(`Error en toggleCheckbox para ${socialId}:`, error);
    }
}

// Función para actualizar el estado visual de los botones de redes sociales
function updateCheckboxVisualState(socialId) {
    if (!socialId) {
        console.warn('updateCheckboxVisualState: socialId no proporcionado');
        return;
    }
    
    const checkbox = document.getElementById(socialId);
    if (!checkbox) {
        console.warn(`updateCheckboxVisualState: No se encontró checkbox con ID "${socialId}"`);
        return;
    }
    
    const container = checkbox.closest('.checkbox-item');
    if (!container) {
        console.warn(`updateCheckboxVisualState: No se encontró contenedor para checkbox "${socialId}"`);
        return;
    }
    
    // Actualizar clase visual basado en el estado del checkbox
    if (checkbox.checked) {
        container.classList.add('checked');
    } else {
        container.classList.remove('checked');
    }
}

// Función para inicializar los estados visuales de todos los checkboxes
function initializeCheckboxStates() {
    let erroresInicializacion = 0;
    
    Object.keys(socials).forEach(social => {
        try {
            updateCheckboxVisualState(social);
        } catch (error) {
            console.error(`Error inicializando estado de ${social}:`, error);
            erroresInicializacion++;
        }
    });
    
    if (erroresInicializacion > 0) {
        console.warn(`Se encontraron ${erroresInicializacion} errores durante la inicialización de checkboxes`);
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
            checkbox.addEventListener('change', () => {
                updateCheckboxVisualState(social);
                actualizarVistaPrevia();
            });
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

// Función para validar campos obligatorios
function validarFormulario() {
    const errores = [];
    
    if (!currentSignatureData.nombre.trim()) {
        errores.push('El nombre es obligatorio');
    }
    
    if (!currentSignatureData.titulo.trim()) {
        errores.push('El título/cargo es obligatorio');
    }
    
    if (errores.length > 0) {
        alert('❌ Por favor completa los siguientes campos:\n• ' + errores.join('\n• '));
        return false;
    }
    
    return true;
}

// Función para copiar la firma al portapapeles
function copiarFirma() {
    if (!validarFormulario()) return;
    
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

// Función para copiar la versión simplificada para Gmail
function copiarFirmaSimple() {
    if (!validarFormulario()) return;
    
    const socialesActivos = obtenerSocialesActivos();
    const firmaHTML = generarFirmaSimpleGmail(currentSignatureData, socialesActivos);
    
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
            alert('✅ ¡Firma simple copiada al portapapeles! Esta versión es más compatible con Gmail. Pégala directamente en tu cliente de correo.');
        } else {
            throw new Error('No se pudo copiar');
        }
    } catch (err) {
        // Fallback para navegadores modernos
        navigator.clipboard.writeText(firmaHTML).then(() => {
            alert('✅ ¡Firma simple copiada al portapapeles!');
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
    if (!validarFormulario()) return;
    
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
    
    // Crear nombre de archivo seguro
    let nombreArchivo = currentSignatureData.nombre || 'firma';
    nombreArchivo = nombreArchivo
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remover caracteres especiales
        .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
        .toLowerCase();
    
    a.download = `firma_${nombreArchivo}.html`;
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
        // Resetear foto a la imagen por defecto
        currentSignatureData.foto = 'perfil_foto/IMG_2542.JPEG';
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
        
        // Marcar todos los checkboxes y actualizar estados visuales
        Object.keys(socials).forEach(social => {
            const checkbox = document.getElementById(social);
            if (checkbox) {
                checkbox.checked = true;
                updateCheckboxVisualState(social);
            }
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

// Función de depuración para verificar el estado de los botones
function debugCheckboxStates() {
    console.log('=== ESTADO DE BOTONES DE REDES SOCIALES ===');
    Object.keys(socials).forEach(social => {
        const checkbox = document.getElementById(social);
        const container = checkbox?.closest('.checkbox-item');
        const urlInput = document.getElementById(social + 'Url');
        
        console.log(`${social}:`, {
            existe: !!checkbox,
            checked: checkbox?.checked,
            tieneContainer: !!container,
            claseChecked: container?.classList.contains('checked'),
            url: urlInput?.value,
            visible: checkbox?.offsetParent !== null
        });
    });
    console.log('=====================================');
}

// Función para detectar anomalías en botones de redes sociales
function testearAnomaliasBotones() {
    console.log('🔍 INICIANDO PRUEBAS DE ANOMALÍAS EN BOTONES...');
    
    const anomalias = [];
    const resultados = [];
    
    Object.keys(socials).forEach(socialId => {
        const checkbox = document.getElementById(socialId);
        const container = checkbox?.closest('.checkbox-item');
        const urlInput = document.getElementById(socialId + 'Url');
        
        console.log(`\n📋 Probando: ${socialId}`);
        
        // Prueba 1: Verificar existencia de elementos
        if (!checkbox) {
            anomalias.push(`❌ ${socialId}: Checkbox no encontrado`);
            return;
        }
        if (!container) {
            anomalias.push(`❌ ${socialId}: Container no encontrado`);
            return;
        }
        
        // Prueba 2: Verificar onclick handler
        const onclickHandler = container.getAttribute('onclick');
        if (!onclickHandler || !onclickHandler.includes('toggleCheckbox')) {
            anomalias.push(`❌ ${socialId}: Onclick handler faltante o incorrecto: "${onclickHandler}"`);
        }
        
        // Prueba 3: Verificar clases CSS
        if (!container.classList.contains('checkbox-item')) {
            anomalias.push(`❌ ${socialId}: Clase CSS 'checkbox-item' faltante`);
        }
        
        // Prueba 4: Verificar visibilidad
        if (checkbox.offsetParent === null) {
            anomalias.push(`⚠️ ${socialId}: Elemento no visible`);
        }
        
        // Prueba 5: Simular click y verificar cambio de estado
        const estadoInicial = checkbox.checked;
        console.log(`  Estado inicial: ${estadoInicial}`);
        
        try {
            // Crear evento sintético para evitar problemas
            const evento = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            
            // Simular click usando la función directamente
            toggleCheckbox(socialId, evento);
            
            const estadoIntermedio = checkbox.checked;
            console.log(`  Estado después de toggleCheckbox: ${estadoIntermedio}`);
            
            if (estadoInicial === estadoIntermedio) {
                anomalias.push(`⚠️ ${socialId}: toggleCheckbox no cambió el estado del checkbox`);
            } else {
                console.log(`  ✅ ${socialId}: toggleCheckbox funcionó correctamente`);
            }
            
            // Restaurar estado original
            checkbox.checked = estadoInicial;
            updateCheckboxVisualState(socialId);
            
            resultados.push({
                id: socialId,
                funcionaToggle: estadoInicial !== estadoIntermedio,
                tieneOnclick: !!onclickHandler,
                visible: checkbox.offsetParent !== null
            });
            
        } catch (error) {
            anomalias.push(`❌ ${socialId}: Error al probar funcionalidad - ${error.message}`);
        }
    });
    
    // Mostrar resultados
    console.log('\n🎯 RESULTADOS DE PRUEBAS:');
    if (anomalias.length === 0) {
        console.log('✅ ¡PERFECTO! No se encontraron anomalías. Todos los botones funcionan correctamente.');
    } else {
        console.log(`⚠️ Se encontraron ${anomalias.length} anomalías:`);
        anomalias.forEach(anomalia => console.log('  ' + anomalia));
    }
    
    console.log('\n📊 RESUMEN TÉCNICO:');
    console.log(`- Botones probados: ${Object.keys(socials).length}`);
    console.log(`- Anomalías detectadas: ${anomalias.length}`);
    console.log('- Pruebas realizadas: Existencia, onclick handlers, funcionalidad, CSS, visibilidad');
    
    console.log('\n📋 RESULTADOS DETALLADOS:');
    resultados.forEach(resultado => {
        console.log(`  ${resultado.id}: Toggle=${resultado.funcionaToggle ? '✅' : '❌'}, Onclick=${resultado.tieneOnclick ? '✅' : '❌'}, Visible=${resultado.visible ? '✅' : '❌'}`);
    });
    
    return { anomalias, resultados };
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    agregarEventListeners();
    initializeCheckboxStates(); // Inicializar estados visuales
    actualizarVistaPrevia();
    
    // Agregar funciones de debug al objeto global para pruebas
    window.debugCheckboxStates = debugCheckboxStates;
    window.testearAnomaliasBotones = testearAnomaliasBotones;
    
    console.log('🎨 Generador de Firma de Correo inicializado correctamente');
    console.log('📝 Completa el formulario para generar tu firma personalizada');
    console.log('🔧 Para depurar botones, ejecuta: debugCheckboxStates()');
    console.log('🔍 Para probar anomalías, ejecuta: testearAnomaliasBotones()');
    
    // Ejecutar prueba automática de anomalías tras la inicialización
    setTimeout(() => {
        console.log('\n⏱️ Ejecutando prueba automática de anomalías...');
        testearAnomaliasBotones();
    }, 1000);
});