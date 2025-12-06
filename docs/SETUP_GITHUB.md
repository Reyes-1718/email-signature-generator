# 🚀 Configuración GitHub - Paso a Paso

## 📝 Paso 1: Crear el repositorio

1. Ve a [github.com](https://github.com) y haz clic en "New repository"
2. Configura así:
   ```
   Repository name: email-signature-generator
   Description: Generador profesional de firmas de correo electrónico
   ✅ Public
   ✅ Add a README file
   ✅ Add .gitignore → Web
   ✅ Choose a license → MIT License
   ```

## 📤 Paso 2: Subir archivos

### Método 1: Interfaz Web (FÁCIL)
1. **Arrastra todos los archivos** del proyecto a la página del repositorio
2. **Escribe mensaje:** "🚀 Proyecto inicial - Generador de firmas"
3. **Commit changes**

### Método 2: Git CLI (AVANZADO)
```bash
# Clonar el repositorio vacío
git clone https://github.com/TU-USUARIO/email-signature-generator.git
cd email-signature-generator

# Copiar archivos del proyecto a esta carpeta
# Luego:
git add .
git commit -m "🚀 Proyecto inicial - Generador de firmas"
git push origin main
```

## 🌐 Paso 3: Activar GitHub Pages

1. Ve a **Settings** de tu repositorio
2. Scroll down hasta **Pages**
3. En **Source** selecciona: **Deploy from a branch**
4. **Branch:** `main` **Folder:** `/ (root)`
5. **Save**

¡Tu generador estará disponible en 5-10 minutos en:
```
https://TU-USUARIO.github.io/email-signature-generator/
```

## 📸 Paso 4: Subir tu foto de perfil

1. Ve a la carpeta **images/** en tu repositorio
2. **Add file** → **Upload files**
3. Sube tu foto (ej: `perfil.jpg`)
4. Tu URL será:
   ```
   https://github.com/TU-USUARIO/email-signature-generator/raw/main/images/perfil.jpg
   ```

## ✅ Paso 5: Probar todo

1. **Abre tu generador** en la URL de GitHub Pages
2. **Completa tus datos**
3. **Usa "🐙 Usar desde GitHub"** con la URL de tu foto
4. **Copia la firma** y pégala en tu cliente de correo

## 🔧 Mantenimiento

- **Actualizar foto:** Solo reemplaza el archivo en `/images/`
- **Personalizar:** Modifica `firma.html` y `firma.js`
- **Backup:** GitHub mantiene todo el historial automáticamente

## 🆘 Solución de problemas

### Mi página no carga:
- Verifica que GitHub Pages esté activado
- Espera 5-10 minutos después de activarlo
- Checa que el repositorio sea público

### Mi imagen no se muestra:
- Verifica que la URL tenga `/raw/main/` en ella
- Asegúrate de que el repositorio sea público
- Prueba la URL directamente en el navegador

### Mi firma se ve mal en el correo:
- Usa "📧 Copiar Optimizada" primero
- Si no funciona, prueba "📱 Copiar Simple"
- En Gmail usa Ctrl+Shift+V para pegar sin formato

---
¡Listo! Tu generador profesional estará funcionando en GitHub 🎉