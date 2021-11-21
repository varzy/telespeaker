import http from '../utils/http';

export const reqSendPhoto = (formData) =>
  http({
    url: `/sendPhoto`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: (() => {
      formData.append('chat_id', process.env.VUE_APP_CHAT_ID);
      formData.append('parse_mode', 'MarkdownV2');

      return formData;
    })(),
  });
