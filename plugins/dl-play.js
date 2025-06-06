const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `\`\`\`[ 🌴 ] Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did i tell u that i miss you\`\`\``;

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `\`\`\`⊜─⌈ 📻 ◜YouTube Play◞ 📻 ⌋─⊜

    ≡ Título : » ${videoInfo.title}
    ≡ Views : » ${videoInfo.views}
    ≡ Duration : » ${videoInfo.timestamp}
    ≡ Uploaded : » ${videoInfo.ago}
    ≡ URL : » ${videoInfo.url}

# 🌴 Su ${isVideo ? 'Video' : 'Audio'} se enviará cuando eliga una de las siguientes opciones . . .\`\`\``;

  await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: footer,
      buttons: [
        {
          buttonId: `.ytmp3 ${videoInfo.url}`,
          buttonText: {
            displayText: '🎵 Audio',
          },
        },
        {
          buttonId: `.ytmp4 ${videoInfo.url}`,
          buttonText: {
            displayText: '📽️ Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: fkontak });
    m.react('🌱');
};
handler.command = handler.help = ['play', 'playvid', 'play2'];
handler.tags = ['dl'];
export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};