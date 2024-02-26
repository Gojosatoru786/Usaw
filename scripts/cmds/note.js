module.exports = {
  config: {
    name: 'note',
    version: '1.0',
    author: 'Samir Œ',
    countDown: 0,
    role: 0,
    shortDescription: 'Create a note',
    longDescription: 'Generate a note with the provided text.',
    category: 'utility',
    guide: {
      en: '{pn} [text]',
    },
  },
  onStart: async function ({ message, args }) {
    const noteText = args.join(' ');

    if (!noteText) {
      message.reply('Please provide text for the note.');
      return;
    }

    const noteUrl = `https://api-samir.onrender.com/note?text=${encodeURIComponent(noteText)}`;
    const noteAttachment = await global.utils.getStreamFromURL(noteUrl);

    message.reply({
      body: 'Here is your note:',
      attachment: noteAttachment,
    });
  },
};