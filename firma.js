let socials = {
  facebook: {
    url: 'https://ed.team/facebook',
    icon: 'C:\\Users\\Reyes\\Documents\\data\\Firma de correo\\icon\\facebook.png'
  } ,
  youtube: {
    url: 'https://ed.team/youtube',
    icon: 'C:\\Users\\Reyes\\Documents\\data\\Firma de correo\\icon\\youtube.png'
  },
  twitter: { 
    url: 'https://ed.team/twitter',
    icon: 'C:\\Users\\Reyes\\Documents\\data\\Firma de correo\\icon\\twitter.png'
  },
  linkedin: {
    url: 'https://ed.team/linkedin',
    icon: 'C:\\Users\\Reyes\\Documents\\data\\Firma de correo\\icon\\linkedin.png'
  },
  github: {
    url: 'https://ed.team/github',
    icon: 'C:\\Users\\Reyes\\Documents\\data\\Firma de correo\\icon\\github.png'
  } 
}

let socialIcons = '';
for(let social in socials) {
  socialIcons += `<a href="${socials[social].url}" style="display:inline-block;margin-right:6px"><img src="${socials[social].icon}" width="20" style="display: block"></a>`
}

document.getElementById('sociales').innerHTML = socialIcons;